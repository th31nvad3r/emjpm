const preposeEnqueteExcelParser = require("./preposeEnqueteExcelParser");
const logger = require("../../../../utils/logger");
const preposeEnqueteRepository = require("./preposeEnqueteRepository");

async function importEnqueteFile({
  file: { content },
  // eslint-disable-next-line no-unused-vars
  enqueteContext: { enqueteId, userId, service },
}) {
  const start = Date.now();
  logger.info(`[IMPORT ENQUETE] START ${enqueteId}`);

  // parse
  const tabs = await preposeEnqueteExcelParser.parse({
    content,
  });

  // save data to database
  await preposeEnqueteRepository.update(enqueteId, {
    tabs,
    serviceId: service.id,
    isUpload: true,
  });

  const durationInSeconds = Math.ceil((Date.now() - start) / 1000);
  logger.info(`[IMPORT ENQUETE] SUCCESS (duration: ${durationInSeconds}s)`);
  return { errors: [] };
}

module.exports = {
  importEnqueteFile,
};
