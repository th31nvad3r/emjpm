import gql from "graphql-tag";

export const CLOSE_MESURE = gql`
  mutation closeMesure($id: Int!, $cause_sortie: cause_sortie_type!, $date_fin_mesure: date!) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: { date_fin_mesure: $date_fin_mesure, cause_sortie: $cause_sortie, status: "eteinte" }
    ) {
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
        mandataire_id
        numero_rg
        numero_dossier
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