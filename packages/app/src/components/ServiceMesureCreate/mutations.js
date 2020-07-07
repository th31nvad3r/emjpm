import gql from "graphql-tag";

export const RECALCULATE_SERVICE_MESURES = gql`
  mutation update_service_mesures($service_id: Int!) {
    recalculateServiceMesuresCount(serviceId: $service_id) {
      success
      updatedRows
    }
  }
`;

export const ADD_MESURE = gql`
  mutation addMesure(
    $date_ouverture: date!
    $department_id: Int
    $type: String!
    $lieu_vie: lieu_vie_type!
    $code_postal: String
    $ville: String
    $civilite: String!
    $annee_naissance: String!
    $numero_dossier: String!
    $numero_rg: String!
    $antenne_id: Int
    $ti_id: Int!
    $latitude: Float
    $longitude: Float
    $pays: String!
    $cabinet: String
  ) {
    insert_mesures(
      objects: {
        department_id: $department_id
        date_ouverture: $date_ouverture
        type: $type
        ti_id: $ti_id
        lieu_vie: $lieu_vie
        code_postal: $code_postal
        ville: $ville
        civilite: $civilite
        annee_naissance: $annee_naissance
        numero_dossier: $numero_dossier
        numero_rg: $numero_rg
        status: "Mesure en cours"
        antenne_id: $antenne_id
        latitude: $latitude
        longitude: $longitude
        pays: $pays
        cabinet: $cabinet
      }
    ) {
      returning {
        antenne_id
        service_id
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
        type
        ville
        latitude
        longitude
        lieu_vie
        numero_rg
        numero_dossier
        etablissement
        annee_naissance
        date_ouverture
        pays
        cabinet
      }
    }
  }
`;
