import { useQuery } from "@apollo/client";
import { isDirection, isMagistrat, isMandataire, isService } from "@emjpm/biz";

import { Box, Card } from "rebass";
import { useParams } from "react-router-dom";

import { AccessToken } from "~/components/AccessToken";
import { AdminUserActivation } from "~/components/AdminUserActivation";
import { AdminDirectionType } from "~/components/AdminUserDirection";
import { AdminMandataireMesures } from "~/components/AdminUserMandataire";
import { AdminUserService } from "~/components/AdminUserService";
import { DirectionEditInformations } from "~/components/DirectionEditInformations";
import { MagistratEditInformations } from "~/components/MagistratEditInformations";
import { MandataireEditInformations } from "~/components/MandataireEditInformations";
import { MesureImportPanel } from "~/components/MesureImport";

import { USER } from "./queries";

function AdminUser() {
  const { user_id: userId } = useParams();

  const { data, loading, error } = useQuery(USER, {
    variables: {
      userId: userId,
    },
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { users_by_pk: user } = data;
  const { type, active } = user;

  return (
    <Box>
      <Box my={1} width="100%">
        <AdminUserActivation userId={userId} />
      </Box>
      {isMandataire({ type }) && (
        <>
          <Box my={1} width="100%">
            <MandataireEditInformations
              userId={userId}
              cancelLink="/admin/users"
              isAdmin
              mt="3"
            />
            {active && (
              <>
                <Card my={1}>
                  <AdminMandataireMesures userId={userId} />
                </Card>
                <Card my={1}>
                  <MesureImportPanel mandataireUserId={userId} />
                </Card>
              </>
            )}
          </Box>
        </>
      )}
      {isMagistrat({ type }) && (
        <Box my={1} width="100%">
          <MagistratEditInformations
            userId={userId}
            cancelLink="/admin/users"
            isAdmin
            mt="3"
          />
        </Box>
      )}
      {isDirection({ type }) && (
        <Box my={1} width="100%">
          <DirectionEditInformations
            userId={userId}
            cancelLink="/admin/users"
            isAdmin
            mt="3"
          />
          <AdminDirectionType userId={userId} />
        </Box>
      )}
      {isService({ type }) && (
        <Box my={1} width="100%">
          <AdminUserService userId={userId} cancelLink="/admin/users" />
        </Box>
      )}

      <Box my={1} width="100%">
        <AccessToken isAdmin userId={userId} />
      </Box>
    </Box>
  );
}

export { AdminUser };
