const express = require("express");
const Seven = require("node-7z");
const fs = require("fs");
const { join } = require("path");
const os = require("os");
const config = require("~/config");
const { OcmiMandataire } = require("~/models");
const { ProcessusStates } = require("~/models");

const router = express.Router();

const {
  readBlob,
  getBlobContainer,
  listBlobsOrderByLastModifiedDesc,
} = require("~/utils/azure");

const logger = require("~/utils/logger");

const ocmiSyncFileEnabled = config.ocmiSyncFileEnabled || false;
const account = config.azureAccountName || null;
const accountKey = config.azureAccountKey || null;

router.post("/sync-file", async (req, res) => {
  if (!ocmiSyncFileEnabled) {
    logger.info(`[OCMI] ocmi sync file is not enabled`);
    return res.json({
      state: "AZURE_ACCOUNT_NAME or AZURE_ACCOUNT_KEY not defined",
    });
  }
  if (!account || !accountKey) {
    logger.info(`[OCMI] AZURE_ACCOUNT_NAME or AZURE_ACCOUNT_KEY not defined`);
    return res.json({
      state: "AZURE_ACCOUNT_NAME or AZURE_ACCOUNT_KEY not defined",
    });
  }

  if (await processIsRunning()) {
    logger.info(`[OCMI] sync file is already running.`);
    return res.json({
      state: "is_already_running",
    });
  }

  const container = getBlobContainer("emjpm-echange");
  const [blob] = await listBlobsOrderByLastModifiedDesc(container);
  const {
    name,
    properties: { contentLength, createdOn, lastModified, contentType },
  } = blob;

  if (await hasBeenProcessed(blob)) {
    logger.info(`[OCMI] ${name} has been already processed`);
    return res.json({
      state: "has_been_already_processed",
    });
  }

  await startImport();
  processBlob(container, blob);

  // success
  return res.json({
    contentLength,
    contentType,
    createdOn,
    lastModified,
    name,
    state: "start",
  });
});

module.exports = router;

async function processBlob(container, { name, properties: { contentLength } }) {
  const tempDir = os.tmpdir();
  const zipFilePath = join(tempDir, name);

  logger.info(`[OCMI] loading file from azure ${name}`);
  const buffer = await readBlob(container, name, contentLength);

  fs.writeFileSync(zipFilePath, buffer);
  logger.info(`[OCMI] unzipping file ${zipFilePath}`);
  const stream = Seven.extract(zipFilePath, tempDir, {
    password: config.ocmiFilePassword,
    recursive: true,
  });
  stream.on("data", async function ({ file }) {
    const unzippedFile = join(tempDir, file);
    logger.info(`[OCMI] file unzipped  ${unzippedFile}`);
    const mesures = JSON.parse(fs.readFileSync(unzippedFile, "utf8"));
    const ocmiMandataires = getOcmiMandataires(mesures);
    const keys = Object.keys(ocmiMandataires);
    const size = keys.length;
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const ocmiMandataire = ocmiMandataires[key];
      logger.info(`[OCMI] processed ocmi mandataire ${index} / ${size}`);
      await createOrUpdateOcmiMandataire(ocmiMandataire);
    }
    logger.info(`[OCMI] sync file finished`);
    await completeImport();
  });
  stream.on("error", function (err) {
    logger.error(err);
  });
}

async function createOrUpdateOcmiMandataire(ocmiMandataire) {
  const { siret, mesures } = ocmiMandataire;
  const entity = await OcmiMandataire.query()
    .findOne({ siret })
    .select("siret");
  ocmiMandataire.mesures = JSON.stringify(mesures);
  if (!entity) {
    await OcmiMandataire.query().insert(ocmiMandataire);
  } else {
    await OcmiMandataire.query().update(ocmiMandataire).where({ siret });
  }
}

function getOcmiMandataires(mesures) {
  const mandataireMap = {};
  for (const mesure of mesures) {
    const { mandataire } = mesure;
    const { siret } = mandataire;

    const value = mandataireMap[siret];
    if (value) {
      value.mesures.push(mesure);
    } else {
      delete mesure["mandataire"];
      mandataire.mesures = [mesure];
      mandataireMap[siret] = mandataire;
    }
  }
  return mandataireMap;
}

async function processIsRunning() {
  const processusState = await ProcessusStates.query().findById(
    "ocmi_sync_file"
  );
  if (!processusState) {
    return false;
  }
  return !processusState.end_date;
}

async function hasBeenProcessed({ properties: { createdOn } }) {
  const processusState = await ProcessusStates.query().findById(
    "ocmi_sync_file"
  );
  if (!processusState) {
    return false;
  }
  return processusState.start_date.getTime() > createdOn.getTime();
}

async function completeImport() {
  await ProcessusStates.query().where({ id: "ocmi_sync_file" }).update({
    end_date: new Date(),
  });
}

async function startImport() {
  let processusState = await ProcessusStates.query().findById("ocmi_sync_file");
  if (!processusState) {
    processusState = await ProcessusStates.query().insertAndFetch({
      id: "ocmi_sync_file",
    });
  }
  await ProcessusStates.query().where({ id: "ocmi_sync_file" }).update({
    end_date: null,
    start_date: new Date(),
  });
}
