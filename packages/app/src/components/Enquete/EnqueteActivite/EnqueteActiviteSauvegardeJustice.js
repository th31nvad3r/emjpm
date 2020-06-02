import React, { useMemo } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { EnqueteActiviteMesuresForm } from "./common";
import { UPDATE_ENQUETE_SAUVEGARDE_JUSTICE } from "./mutations";
import { ENQUETE_SAUVEGARDE_JUSTICE } from "./queries";

const PREFIX = "sauvegarde_justice";

export const EnqueteActiviteSauvegardeJustice = props => {
  const { goToPrevPage, goToNextPage, enqueteReponse } = props;
  const { enquete_reponses_activite_id } = enqueteReponse;
  const [updateEnquete] = useMutation(UPDATE_ENQUETE_SAUVEGARDE_JUSTICE, {
    refetchQueries: [
      {
        query: ENQUETE_SAUVEGARDE_JUSTICE,
        variables: {
          id: enquete_reponses_activite_id
        }
      }
    ]
  });
  const { data, loading } = useQuery(ENQUETE_SAUVEGARDE_JUSTICE, {
    variables: {
      id: enquete_reponses_activite_id
    }
  });

  const normalizedData = useMemo(() => {
    const r = data ? data.enquete_reponses_activite_by_pk || {} : {};

    return {
      debutAnnee: r[`${PREFIX}_debut_annee`],
      finAnnee: r[`${PREFIX}_fin_annee`],
      mesuresNouvelles: r[`${PREFIX}_mesures_nouvelles`],
      sortieMesures: r[`${PREFIX}_sortie_mesures`]
    };
  }, [data]);

  return (
    <Box>
      <EnqueteActiviteMesuresForm
        loading={loading}
        data={normalizedData}
        handleSubmit={async values => {
          await updateEnquete({
            variables: {
              id: enquete_reponses_activite_id,
              ...values
            }
          });
          await goToNextPage();
        }}
        goToPrevPage={goToPrevPage}
        title="Sauvegarde de justice"
      />
    </Box>
  );
};

export default EnqueteActiviteSauvegardeJustice;
