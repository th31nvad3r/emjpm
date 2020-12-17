import { BoxWrapper } from "@emjpm/ui";
import React from "react";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutServices } from "~/components/Layout";
import { MesureCreate } from "~/components/MesureCreate";
import { withAuthSync } from "~/util/auth";

const AddMesures = () => {
  return (
    <LayoutServices hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <HeadingTitle mx="1">{"Création d'une mesure"}</HeadingTitle>
        <MesureCreate />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddMesures);
