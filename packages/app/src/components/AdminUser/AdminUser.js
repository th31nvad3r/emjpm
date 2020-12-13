import { useQuery } from "@apollo/react-hooks";
import { isDirection, isMagistrat, isMandataire, isService } from "@emjpm/core";
import React from "react";
import { Box, Card } from "rebass";

import { AccessToken } from "../AccessToken";
import { AdminUserActivation } from "../AdminUserActivation";
import { AdminDirectionType } from "../AdminUserDirection";
import { AdminMandataireMesures } from "../AdminUserMandataire";
import { AdminUserService } from "../AdminUserService";
import { DirectionEditInformations } from "../DirectionEditInformations";
import { MagistratEditInformations } from "../MagistratEditInformations";
import { MandataireEditInformations } from "../MandataireEditInformations";
import { MesureImportPanel } from "../MesureImport";
import { USER } from "./queries";

const AdminUser = (props) => {
  const { userId } = props;

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
};

export { AdminUser };
