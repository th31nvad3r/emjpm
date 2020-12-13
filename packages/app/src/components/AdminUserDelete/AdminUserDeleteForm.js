import { useMutation } from "@apollo/react-hooks";
import { Button, Heading3, Heading5 } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { adminUserDeleteSchema } from "../../lib/validationSchemas";
// import { USERS } from "../AdminUsers/queries";
import { DELETE_USER } from "./mutations";
import { AdminUserDeleteRemoveStyle } from "./style";

export const AdminUserDeleteForm = (props) => {
  const { userId } = props;

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: async () => {
      Router.push(`/admin/users`);
    },
  });

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (_, { setSubmitting }) => {
      await deleteUser({
        variables: {
          userId: userId,
        },
      });
      setSubmitting(false);
    },
    validationSchema: adminUserDeleteSchema,
  });

  return (
    <Flex sx={AdminUserDeleteRemoveStyle}>
      <Box bg="cardSecondary" p="5" width={[1, 3 / 5]}>
        <Heading5 mb="1">{"Supprimer l'utilisateur"}</Heading5>
        <Text mb="2" lineHeight="1.5">
          {`Vous êtes sur le point de supprimer définitivement un utilisateur du système eMJPM. Toute suppression est irréversible.`}
        </Text>
        <Text lineHeight="1.5">{`Si vous souhaitez supprimer cet utilisateur, cliquez sur "Supprimer l'utilisateur".`}</Text>
        <Text lineHeight="1.5">{`Dans le cas contraire, cliquez sur "Annuler".`}</Text>
      </Box>
      <Box p="5" width={[1, 2 / 5]}>
        <Box mb="3">
          <Heading3>{"Supprimer l'utilisateur"}</Heading3>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                type="button"
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push(
                    "/admin/users/[user_id]",
                    `/admin/users/${userId}`,
                    { shallow: true }
                  );
                }}
              >
                Annuler
              </Button>
            </Box>
            <Box>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
              >
                {"Supprimer l'utilisateur"}
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};