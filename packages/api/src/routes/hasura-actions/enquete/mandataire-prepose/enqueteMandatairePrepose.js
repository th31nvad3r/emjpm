const {
  getEnqueteReponseMandatairePrepose,
  createEmptyEnqueteReponse,
  submitEnqueteReponse,
} = require("./requests");
const enqueteMandatairePreposeStatus = require("./enqueteMandatairePreposeStatus");
const logger = require("../../../../utils/logger");
const HttpError = require("../../../../utils/error/HttpError");

async function initEnqueteMandatairePrepose({
  // eslint-disable-next-line no-unused-vars
  enqueteContext: { enqueteId, userId, service, mandataire },
}) {
  let enqueteReponse = await getEnqueteReponseMandatairePrepose({
    enqueteId,
    mandataireId: mandataire.id,
  });

  if (!enqueteReponse) {
    logger.warn(
      `EnqueteReponse does not exists for enqueteId ${enqueteId} and mandataireId ${mandataire.id}: create it`
    );
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      mandataireId: mandataire.id,
    });

    enqueteReponse = insert_enquete_reponses_one;
  }
  const status = await enqueteMandatairePreposeStatus(enqueteReponse);
  const ids = {
    id: enqueteReponse.id,
    modalites_exercice_id:
      enqueteReponse.enquete_reponses_modalites_exercice_id,
    populations_id: enqueteReponse.enquete_reponses_populations_id,
    financement_id: enqueteReponse.enquete_reponses_financement_id,
    activite_id: enqueteReponse.enquete_reponses_activite_id,
    personel_formation_id:
      enqueteReponse.enquete_reponses_prepose_personel_formation_id,
    prestations_sociales_id:
      enqueteReponse.enquete_reponses_prepose_prestations_sociales_id,
  };
  return {
    status: enqueteReponse.status,
    user_type: enqueteReponse.user_type,
    enquete_id: enqueteReponse.enquete_id,
    submitted_at: enqueteReponse.submitted_at,
    enquete_reponse_validation_status: status,
    enquete_reponse_ids: ids,
  };
}

async function submitEnqueteMandatairePrepose({
  enqueteContext: { enqueteId, mandataire },
}) {
  const enqueteReponse = await getEnqueteReponseMandatairePrepose({
    enqueteId,
    mandataireId: mandataire.id,
  });

  if (enqueteReponse.status !== "draft") {
    throw new HttpError(423, "Enquete response has already been submitted.");
  }
  const status = await enqueteMandatairePreposeStatus(enqueteReponse);

  if (status.global === "invalid") {
    throw new HttpError(400, "Enquete response is invalid");
  }

  return await submitEnqueteReponse(enqueteReponse.id);
}

module.exports = {
  initEnqueteMandatairePrepose,
  submitEnqueteMandatairePrepose,
};
