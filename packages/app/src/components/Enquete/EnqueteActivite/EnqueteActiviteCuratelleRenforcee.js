import React, { useMemo } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { ENQUETE_MANDATAIRE_INDIVIDUEL } from "../EnqueteIndividuel/queries";
import { EnqueteActiviteEtablissementDomicileForm } from "./common";
import { UPDATE_ENQUETE_ACTIVITE_CURATELLE_RENFORCEE } from "./mutations";
import { ENQUETE_CURATELLE_RENFORCEE } from "./queries";

const PREFIX = "curatelle_renforcee";

export const EnqueteActiviteCuratelleRenforcee = props => {
  const {
    goToPrevPage,
    goToNextPage,
    enqueteReponse,
    section,
    step,
    mandataireId,
    enquete: { id: enqueteId }
  } = props;
  const { enquete_reponses_activite_id } = enqueteReponse;
  const [updateEnquete] = useMutation(UPDATE_ENQUETE_ACTIVITE_CURATELLE_RENFORCEE, {
    refetchQueries: [
      {
        query: ENQUETE_MANDATAIRE_INDIVIDUEL,
        variables: { enqueteId, mandataireId }
      },
      {
        query: ENQUETE_CURATELLE_RENFORCEE,
        variables: {
          id: enquete_reponses_activite_id
        }
      }
    ]
  });
  const { data, loading } = useQuery(ENQUETE_CURATELLE_RENFORCEE, {
    variables: {
      id: enquete_reponses_activite_id
    }
  });

  const normalizedData = useMemo(() => {
    const r = data ? data.enquete_reponses_activite_by_pk || {} : {};

    return {
      etablissementDebutAnnee: r[`${PREFIX}_etablissement_debut_annee`],
      etablissementFinAnnee: r[`${PREFIX}_etablissement_fin_annee`],
      domicileDebutAnnee: r[`${PREFIX}_domicile_debut_annee`],
      domicileFinAnnee: r[`${PREFIX}_domicile_fin_annee`],
      etablissementMesuresNouvelles: r[`${PREFIX}_etablissement_mesures_nouvelles`],
      etablissementSortieMesures: r[`${PREFIX}_etablissement_sortie_mesures`],
      domicileMesuresNouvelles: r[`${PREFIX}_domicile_mesures_nouvelles`],
      domicileSortieMesures: r[`${PREFIX}_domicile_sortie_mesures`]
    };
  }, [data]);

  return (
    <Box>
      <EnqueteActiviteEtablissementDomicileForm
        loading={loading}
        data={normalizedData}
        section={section}
        step={step}
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
        title="Curatelle renforcée"
      />
    </Box>
  );
};

export default EnqueteActiviteCuratelleRenforcee;
