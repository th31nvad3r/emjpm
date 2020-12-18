import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutMandataire } from "~/components/Layout";
import { MandataireBoard } from "~/components/MandataireBoard";
import { StatisticMesureNature } from "~/components/StatisticMesureNature";
import { withAuthSync } from "~/util/auth";

const MandataireBoardView = () => {
  return (
    <LayoutMandataire>
      <BoxWrapper mt={6} px="1">
        <Flex>
          <Box width={1 / 3}>
            <MandataireBoard />
          </Box>
          <Box width={2 / 3}>
            <StatisticMesureNature />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutMandataire>
  );
};

const Mandataires = () => {
  return <MandataireBoardView />;
};

export default withAuthSync(Mandataires);