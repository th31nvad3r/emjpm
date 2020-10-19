import gql from "graphql-tag";

export const REACTIVATE_MESURE = gql`
  mutation reactivateMesure($id: Int!) {
    update_mesures(where: { id: { _eq: $id } }, _set: { status: "en_cours" }) {
      returning {
        id
        cabinet
        civilite
        code_postal
        departement {
          id
          nom
          region {
            id
            nom
          }
        }
        status
        nature_mesure
        champ_mesure
        ville
        lieu_vie
        numero_rg
        numero_dossier
        mandataire_id
        etablissement
        annee_naissance
        date_nomination
      }
    }
  }
`;

export const RECALCULATE_SERVICE_MESURES = gql`
  mutation update_service_mesures($service_id: Int!) {
    recalculateServiceMesuresCount(serviceId: $service_id) {
      success
      updatedRows
    }
  }
`;

export const RECALCULATE_MANDATAIRE_MESURES = gql`
  mutation update_mandataire_mesures($mandataire_id: Int!) {
    recalculateMandataireMesuresCount(mandataireId: $mandataire_id) {
      success
      updatedRows
    }
  }
`;