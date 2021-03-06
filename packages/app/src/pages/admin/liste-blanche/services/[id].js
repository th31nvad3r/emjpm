import { useHistory, useParams } from "react-router-dom";
import { Link as StyledLink } from "rebass";

import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheServiceUpdate } from "~/components/ListeBlanche";
import { BoxWrapper } from "~/ui";

function ListeBlancheDetailPage() {
  const { id } = useParams();
  const history = useHistory();

  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link to="/admin/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>

        <ListeBlancheServiceUpdate
          serviceId={id}
          onSuccess={async () => {
            await history.push("/admin/liste-blanche");
            window.scrollTo(0, 0);
          }}
          handleCancel={async () => {
            await history.push("/admin/liste-blanche");
            window.scrollTo(0, 0);
          }}
        />
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default ListeBlancheDetailPage;
