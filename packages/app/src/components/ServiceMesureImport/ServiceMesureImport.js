import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3, Text } from "@socialgouv/emjpm-ui-core";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";
import { FileExcel } from "styled-icons/fa-regular/FileExcel";
import { FilePdf } from "styled-icons/fa-regular/FilePdf";

import {
  MANDATAIRE_MESURE_IMPORT_MANUAL,
  MANDATAIRE_MESURE_IMPORT_TEMPLATE
} from "../../constants/import";
import { MesureImportService } from "../MesureImport";
import { DocumentLink } from "../MesureImport/DocumentLink";
import { SERVICE_ANTENNES } from "./queries";

const ServiceMesureImport = props => {
  const { serviceId } = props;
  const { data, loading, error } = useQuery(SERVICE_ANTENNES, {
    variables: { service_id: serviceId }
  });

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return "Error...";
  }

  const { antennes } = data;

  return (
    <Fragment>
      <Card mb="5">
        <Flex flexDirection="column">
          <Box mb={2}>
            <Heading3 mb="2">{`Format du fichier d'import`}</Heading3>
            <Text mb="1" lineHeight="2">
              {`Pour simplifier la première mise à jour de toutes vos mesures en cours, vous pouvez importer vos mesures avec un fichier csv ou excel. Ce fichier doit être conforme au modèle décrit dans la note explicative ci-dessous.`}
            </Text>
            <Text mb="1" lineHeight="2">
              {`Rapprochez-vous de votre éditeur de logiciel pour vous assurer qu'un export est compatible avec ce format.`}
            </Text>
            <Flex flexDirection="row" justifyContent="center" mt={2} mb={2}>
              <DocumentLink document={MANDATAIRE_MESURE_IMPORT_MANUAL}>
                <FilePdf size="86" width="100%" color="#FF0000" />
                <Box textAlign="center" mt={2} color="#0067EA">
                  Télécharger la note explicative (.pdf)
                </Box>
              </DocumentLink>
              <DocumentLink document={MANDATAIRE_MESURE_IMPORT_TEMPLATE}>
                <FileExcel size="86" width="100%" color="#008000" />
                <Box textAlign="center" mt={2} color="#0067EA">
                  Télécharger le modèle Excel
                </Box>
              </DocumentLink>
            </Flex>
            <Text mb="1" lineHeight="2">
              {`Nous vous conseillons de réaliser l’import de vos mesures qu’une seule fois au début de votre utilisation de e-MJPM. Une fois le tableau importé une première fois, vous serez prêt.e à utiliser parfaitement e-MJPM. Vous pourrez alors faire toutes les modifications, les mises à jours et les ajouts vous même.`}
            </Text>
          </Box>
          <Box mt={2}>
            <Heading3 mb="2">{`Importez vos mesures`}</Heading3>
            <Text mb="1" lineHeight="2">
              {`Utilisez le cadre ci-dessous pour nous transmettre votre tableau csv ou excel de mesures. Si vous rencontrez des difficultés, vous pouvez nous envoyer un mail avec votre tableau en pièce-jointe à contact@emjpm.beta.gouv.fr. Nous le vérifierons, le mettrons en page et nous vous le renverrons pour que vous puissiez l’importer.`}
            </Text>
            <MesureImportService serviceId={serviceId} serviceAntennes={antennes} />
          </Box>
        </Flex>
      </Card>
    </Fragment>
  );
};

export { ServiceMesureImport };