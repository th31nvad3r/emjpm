import { Flex } from "rebass";

import { LayoutServices } from "~/components/Layout";
import { MesureAccept } from "~/components/MesureAccept";
import { MesureProvider } from "~/components/MesureContext";
import { ServiceMesureSidebar } from "~/components/ServiceMesureSidebar";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

function AcceptMesurePage() {
  const { mesure_id: mesureId } = useParams();
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutServices>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <ServiceMesureSidebar mesureId={mesureId} />
            <MesureAccept />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </MesureProvider>
  );
}

export default AcceptMesurePage;
