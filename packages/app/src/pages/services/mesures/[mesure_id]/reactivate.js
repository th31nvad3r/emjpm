import { Flex } from "rebass";

import { LayoutServices } from "~/components/Layout";
import { MesureProvider } from "~/components/MesureContext";
import { MesureReactivate } from "~/components/MesureReactivate";
import { ServiceMesureSidebar } from "~/components/ServiceMesureSidebar";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

function ReactivateMesurePage() {
  const { mesure_id: mesureId } = useParams();
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutServices>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <ServiceMesureSidebar mesureId={mesureId} />
            <MesureReactivate />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </MesureProvider>
  );
}

export default ReactivateMesurePage;
