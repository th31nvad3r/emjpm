import { EnqueteCreate } from "~/components/EnqueteCreate";
import { LayoutDirection } from "~/components/Layout";
import { BoxWrapper, Card, Heading2 } from "~/ui";

function CreateEnquete() {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <Card p={5}>
          <Heading2 mb={3}>Créer une enquête</Heading2>
          <EnqueteCreate />
        </Card>
      </BoxWrapper>
    </LayoutDirection>
  );
}

export default CreateEnquete;
