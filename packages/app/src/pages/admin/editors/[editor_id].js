import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminEditorEdit } from "~/components/AdminEditors/AdminEditorEdit";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const Editor = (props) => {
  const { editorId } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper>
        <Link href="/admin/editors">
          <StyledLink my={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <AdminEditorEdit editorId={editorId} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

Editor.getInitialProps = async ({ query }) => {
  return { editorId: query.editor_id };
};

export default withAuthSync(Editor);
