const { EnqueteReponses } = require("~/models");
const { EnqueteReponsesPopulations } = require("~/models");
const { EnqueteReponsesPrestationsSociales } = require("~/models");
const { EnqueteReponsesAgrementsFormations } = require("~/models");
const { EnqueteReponsesInformationsMandataire } = require("~/models");
const { EnqueteReponsesActivite } = require("~/models");
const {
  getEnqueteReponse,
  createEmptyEnqueteReponse,
} = require("../mandataire-individuel/requests");
const HttpError = require("~/utils/error/HttpError");

async function update(enqueteId, { tabs, mandataireId, isUpload = false }) {
  const {
    informationsMandataire,
    agrementsFormations,
    populations,
    prestationsSociales,
    activite,
  } = tabs;

  const enqueteReponse = await initEnqueteReponse({
    enqueteId,
    mandataireId,
  });

  if (isUpload && enqueteReponse.status !== "draft") {
    throw new HttpError(423, "Enquete response has already been submitted.");
  }

  if (isUpload) {
    await EnqueteReponses.query()
      .findById(enqueteReponse.id)
      .patch({ uploaded_on: new Date() });
  }

  await EnqueteReponsesInformationsMandataire.query()
    .findById(enqueteReponse.enquete_reponses_informations_mandataire_id)
    .patch(informationsMandataire);

  await EnqueteReponsesAgrementsFormations.query()
    .findById(enqueteReponse.enquete_reponses_agrements_formations_id)
    .patch(agrementsFormations);

  await EnqueteReponsesPopulations.query()
    .findById(enqueteReponse.enquete_reponses_populations_id)
    .patch(populations);

  await EnqueteReponsesPrestationsSociales.query()
    .findById(enqueteReponse.enquete_reponses_prestations_sociale_id)
    .patch(prestationsSociales);

  await EnqueteReponsesActivite.query()
    .findById(enqueteReponse.enquete_reponses_activite_id)
    .patch(activite);
}

async function initEnqueteReponse({ enqueteId, mandataireId }) {
  let enqueteReponse = await getEnqueteReponse({
    enqueteId,
    mandataireId,
  });

  if (!enqueteReponse) {
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      mandataireId,
    });
    enqueteReponse = insert_enquete_reponses_one;
  }

  return enqueteReponse;
}

const mandataireIndividuelEnqueteRepository = {
  update,
};

module.exports = mandataireIndividuelEnqueteRepository;
