import { useApolloClient } from "@apollo/react-hooks";
import { Button, Card, Heading1, Heading4, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import { GENDER_OPTIONS } from "../../constants/user";
import { signupSchema } from "../../lib/validationSchemas";
import { isEmailExists } from "../../query-service/EmailQueryService";
import { FormGroupInput, FormGroupSelect } from "../AppForm";
import { SignupContext } from "./context";
import { grayBox } from "./style";

const TYPE_OPTIONS = [
  {
    label: "Mandataire individuel",
    value: "individuel",
  },
  {
    label: "Mandataire préposé d'établissement",
    value: "prepose",
  },
  {
    label: "Service mandataire",
    value: "service",
  },
  {
    label: "Tribunal d'instance",
    value: "ti",
  },
  {
    label: "Agent de l'état",
    value: "direction",
  },
];

export const SignupForm = () => {
  const { user, setUser, validateStepOne } = useContext(SignupContext);

  const client = useApolloClient();

  const formik = useFormik({
    initialValues: {
      confirmPassword: user ? user.confirmPassword : "",
      email: user ? user.email : "",
      genre: "",
      nom: user ? user.nom : "",
      password: user ? user.password : "",
      prenom: user ? user.prenom : "",
      type: user ? user.type : "",
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const exists = await isEmailExists(client, values.email);
      if (exists) {
        setErrors({
          email: "Cet email existe déjà",
        });
      } else {
        setUser({
          confirmPassword: values.confirmPassword,
          email: values.email,
          genre: values.genre,
          nom: values.nom,
          password: values.password,
          prenom: values.prenom,
          type: values.type,
        });
        validateStepOne(true);
      }

      setSubmitting(false);
    },
    validationSchema: signupSchema,
  });

  return (
    <Fragment>
      <Heading1 px="1">{`Création de compte`}</Heading1>
      <form onSubmit={formik.handleSubmit}>
        <Flex>
          <Box width={[1, 2 / 5]} sx={grayBox}>
            <Heading4>{`Information professionelle`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Quel type d'utilisateur êtes-vous ?`}
            </Text>
          </Box>
          <Card width={[1, 3 / 5]}>
            <FormGroupSelect
              id="type"
              formik={formik}
              placeholder="Vous êtes..."
              value={formik.values.type}
              options={TYPE_OPTIONS}
              validationSchema={signupSchema}
            />
          </Card>
        </Flex>
        <Flex>
          <Box width={[1, 2 / 5]} sx={grayBox}>
            <Heading4>{`Information personnelle`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Ces informations permettent de vous identifier.`}
            </Text>
          </Box>
          <Card width={[1, 3 / 5]}>
            <FormGroupSelect
              id="genre"
              formik={formik}
              placeholder="Civilité"
              value={formik.values.genre}
              options={GENDER_OPTIONS}
              validationSchema={signupSchema}
            />
            <FormGroupInput
              placeholder="Prénom"
              id="prenom"
              formik={formik}
              validationSchema={signupSchema}
            />
            <FormGroupInput
              placeholder="Nom"
              id="nom"
              formik={formik}
              validationSchema={signupSchema}
            />
          </Card>
        </Flex>
        <Flex>
          <Box width={[1, 2 / 5]} sx={grayBox}>
            <Heading4>{`Identifiants de connexion`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Ces informations permettront de vous connecter à votre compte. L'adresse email
                renseignée sera votre identifiant.`}
            </Text>
          </Box>
          <Card width={[1, 3 / 5]}>
            <FormGroupInput
              placeholder="Email"
              id="email"
              formik={formik}
              validationSchema={signupSchema}
            />
            <FormGroupInput
              placeholder="Mot de passe"
              type="password"
              id="password"
              formik={formik}
              validationSchema={signupSchema}
            />
            <FormGroupInput
              placeholder="Confirmation du mot de passe"
              type="password"
              id="confirmPassword"
              formik={formik}
              validationSchema={signupSchema}
            />
          </Card>
        </Flex>
        <Flex justifyContent="flex-end" p={1}>
          <Box>
            <Link href="/">
              <Button mr="2" variant="outline">
                Annuler
              </Button>
            </Link>
          </Box>
          <Box>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              isLoading={formik.isSubmitting}
            >
              Suivant
            </Button>
          </Box>
        </Flex>
      </form>
    </Fragment>
  );
};
