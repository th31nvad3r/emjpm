import gql from "graphql-tag";

export const INDICATORS = gql`
  query Indicators(
    $code: String
    $currentMonthStart: timestamptz!
    $currentMonthEnd: timestamptz!
  ) {
    departements(where: { code: { _eq: $code } }) {
      code
      nom
    }
    view_indicateur_login(where: { code: { _eq: $code } }) {
      count
      nom
      type
      code
    }
    view_indicateur_inscrit(where: { code: { _eq: $code } }) {
      count
      nom
      type
      code
    }
    mesuresLastMonthCount: mesures_aggregate(
      where: {
        _and: {
          created_at: { _gte: $currentMonthStart, _lte: $currentMonthEnd }
          magistrat_id: { _is_null: false }
          departement: { code: { _eq: $code } }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    mesuresLastMonthCountTotal: mesures_aggregate(
      where: {
        _and: {
          created_at: { _gte: $currentMonthStart, _lte: $currentMonthEnd }
          magistrat_id: { _is_null: false }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const FRANCE_INDICATORS = gql`
  query AllIndicators(
    $currentMonthStart: timestamptz!
    $currentMonthEnd: timestamptz!
  ) {
    serviceLoginCount: view_indicateur_login_aggregate(
      where: { type: { _eq: "service" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    individuelLoginCount: view_indicateur_login_aggregate(
      where: { type: { _eq: "individuel" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    preposeLoginCount: view_indicateur_login_aggregate(
      where: { type: { _eq: "prepose" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    magistratLoginCount: view_indicateur_login_aggregate(
      where: { type: { _eq: "ti" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    serviceInscritCount: view_indicateur_inscrit_aggregate(
      where: { type: { _eq: "service" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    individuelInscritCount: view_indicateur_inscrit_aggregate(
      where: { type: { _eq: "individuel" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    preposeInscritCount: view_indicateur_inscrit_aggregate(
      where: { type: { _eq: "prepose" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    magistratInscritCount: view_indicateur_inscrit_aggregate(
      where: { type: { _eq: "ti" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    mesuresLastMonthCount: mesures_aggregate(
      where: {
        _and: {
          created_at: { _gte: $currentMonthStart, _lte: $currentMonthEnd }
          magistrat_id: { _is_null: false }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
