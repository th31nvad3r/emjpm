import { Heading1, Heading3, Heading5 } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";

import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";
import { enquetePreposePersonnelFormationAutresFormMapper } from "./EnquetePreposePersonnelFormationAutresFormMapper";
import { enquetePreposePersonnelFormationAutresFormSchema as validationSchema } from "./EnquetePreposePersonnelFormationAutresFormSchema";

const dataToForm = enquetePreposePersonnelFormationAutresFormMapper.dataToForm;
export const EnquetePreposePersonnelFormationAutresForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const enqueteForm = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm,
    loading,
  });

  const { submitForm, values, errors, submit } = enqueteForm;

  return (
    <Box>
      <form onSubmit={submitForm}>
        <Heading1 textAlign="center" mb={"80px"}>
          {"Personnel et formation"}
        </Heading1>
        <Heading3>{"Autres informations relative aux préposés"}</Heading3>

        <Box mt={1}>
          <Heading5 mt={1} mb="2">
            Répartition par niveau de formation
          </Heading5>
          <Box>
            {renderNiveauxQualificationBox({
              niveau: "n1",
              label: "Niveau 1",
            })}
          </Box>
          <Box>
            {renderNiveauxQualificationBox({
              niveau: "n2",
              label: "Niveau 2",
            })}
          </Box>
          <Box>
            {renderNiveauxQualificationBox({
              niveau: "n3",
              label: "Niveau 3",
            })}
          </Box>
          <Box>
            {renderNiveauxQualificationBox({
              niveau: "n4",
              label: "Niveau 4",
            })}
          </Box>
          <Box>
            {renderNiveauxQualificationBox({
              niveau: "n5",
              label: "Niveau 5",
            })}
          </Box>
          <Box>
            {renderNiveauxQualificationBox({
              niveau: "n6",
              label: "Niveau 6",
            })}
          </Box>
        </Box>
        <Box mt={1}>
          <Heading5 mt={1} mb="2">
            Répartition par sexe des préposés
          </Heading5>
          <Flex alignItems="start">
            <Box mr={1} flex={1 / 2}>
              <EnqueteFormInputField
                id="nb_preposes_homme"
                label="Hommes au 31/12"
                enqueteContext={enqueteContext}
                enqueteForm={enqueteForm}
              />
            </Box>
            <Box ml={1} flex={1 / 2}>
              <EnqueteFormInputField
                id="nb_preposes_femme"
                label="Femmes au 31/12"
                enqueteContext={enqueteContext}
                enqueteForm={enqueteForm}
              />
            </Box>
          </Flex>
        </Box>
        <Box mt={1}>
          <Heading5 mt={1} mb="2">
            Nombre d&apos;autres personnels (dont secrétaires spécialisés)
          </Heading5>
          <Flex alignItems="start">
            <Box mr={1} flex={1 / 2}>
              <EnqueteFormInputField
                id="nb_autre_personnel"
                label="Nombre d'autres personnels"
                enqueteContext={enqueteContext}
                enqueteForm={enqueteForm}
              />
            </Box>
            <Box ml={1} flex={1 / 2}>
              <EnqueteFormInputField
                id="nb_autre_personnel_etp"
                label="Nombre d'autres personnels en ETP"
                enqueteContext={enqueteContext}
                enqueteForm={enqueteForm}
              />
            </Box>
          </Flex>
        </Box>
        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </form>
    </Box>
  );

  // niveau: 'n1' || 'n2' || 'n3' || 'n4' || 'n5' || 'n6'
  function renderNiveauxQualificationBox({ niveau, label }) {
    return (
      <Fragment>
        <Heading5 mt={1} mb="2">
          {label}
        </Heading5>
        <Flex alignItems="start">
          <Box mr={1} flex={1 / 2}>
            <EnqueteFormInputField
              id={`niveaux_qualification.${niveau}.nb_preposes`}
              value={values.niveaux_qualification[niveau].nb_preposes}
              error={
                errors.niveaux_qualification && errors.formation_preposes_mjpm[niveau]
                  ? errors.formation_preposes_mjpm[niveau].nb_preposes
                  : ""
              }
              label="Nombre de préposés"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
          <Box ml={1} flex={1 / 2}>
            <EnqueteFormInputField
              id={`niveaux_qualification.${niveau}.nb_preposes_etp`}
              value={values.niveaux_qualification[niveau].nb_preposes_etp}
              error={
                errors.niveaux_qualification && errors.nb_preposes_etp[niveau]
                  ? errors.formation_preposes_mjpm[niveau].nb_preposes_etp
                  : ""
              }
              label="Nombre de préposés en ETP"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
        </Flex>
      </Fragment>
    );
  }
};

export default EnquetePreposePersonnelFormationAutresForm;