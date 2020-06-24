import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { resetIdCounter } from "react-tabs";

import { Enquete } from "../../../../src/components/Enquete";
import { LayoutMandataire } from "../../../../src/components/Layout";
import { withAuthSync } from "../../../../src/util/auth";
import { useUrlQueryValues } from "../../../../src/util/url";

const MandataireEnquetePage = ({ enqueteId }) => {
  const { step, substep } = useUrlQueryValues([
    {
      defaultValue: 0,
      name: "step",
      type: "integer",
    },
    {
      defaultValue: 0,
      name: "substep",
      type: "integer",
    },
  ]);

  const currentStep = { step, substep };

  return (
    <LayoutMandataire hasFooterMargins={false}>
      <BoxWrapper>
        <Enquete id={enqueteId} currentStep={currentStep} />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

MandataireEnquetePage.getInitialProps = async (params) => {
  const { query } = params;
  resetIdCounter();
  return { enqueteId: Number(query.enquete_id) };
};

export default withAuthSync(MandataireEnquetePage);
