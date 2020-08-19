const { format } = require("date-fns");

function sanitizeMesureProperties(mesure) {
  return {
    id: mesure.id,
    code_postal: mesure.code_postal,
    ville: mesure.ville,
    created_at: format(mesure.created_at, "yyyy-MM-dd"),
    annee_naissance: mesure.annee_naissance,
    date_nomination: format(mesure.date_nomination, "yyyy-MM-dd"),
    date_fin_mesure: format(mesure.date_fin_mesure, "yyyy-MM-dd"),
    numero_dossier: mesure.numero_dossier,
    numero_rg: mesure.numero_rg,
    antenne_id: mesure.antenne_id,
    latitude: mesure.latitude,
    longitude: mesure.longitude,
    pays: mesure.pays,
    lieu_vie: mesure.lieu_vie,
    type_etablissement: mesure.type_etablissement,
    civilite: mesure.civilite,
    cause_sortie: mesure.cause_sortie,
    date_premier_mesure: format(mesure.date_premier_mesure, "yyyy-MM-dd"),
    date_protection_en_cours: format(
      mesure.date_protection_en_cours,
      "yyyy-MM-dd"
    ),
    resultat_revision: mesure.resultat_revision,
    etats: mesure.etats
      ? mesure.etats.map((etat) => {
          return {
            id: etat.id,
            date_changement_etat: format(
              etat.date_changement_etat,
              "yyyy-MM-dd"
            ),
            nature_mesure: etat.nature_mesure,
            champ_mesure: etat.champ_protection,
            lieu_vie: etat.lieu_vie,
            code_postal: etat.code_postal,
            ville: etat.ville,
            pays: etat.pays,
            type_etablissement: etat.type_etablissement,
            etablissement_siret: etat.etablissement_siret,
          };
        })
      : [],
    ressources: mesure.ressources
      ? mesure.ressources.map((ressource) => {
          return {
            id: ressource.id,
            annee: ressource.annee,
            niveau_ressource: ressource.niveau_ressource,
            prestations_sociales: ressource.prestations_sociales,
          };
        })
      : [],
  };
}

module.exports = { sanitizeMesureProperties };
