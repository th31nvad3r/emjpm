import { directionFormatter } from "@emjpm/biz";
import { Building } from "@styled-icons/fa-regular/Building";
import { MailOutline } from "@styled-icons/material/MailOutline";
import { PersonOutline } from "@styled-icons/material/PersonOutline";
import { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { LinkButton } from "~/components/Commons";
import { UserContext } from "~/components/UserContext";
import { Card, Heading3, Heading5 } from "~/ui";

import { boxStyle, flexStyle, iconTextStyle } from "./style";

function DirectionInformations(props) {
  const { email, nom, prenom, directions } = useContext(UserContext);
  return (
    <Box {...props}>
      <Card p="5">
        <Heading3>
          {nom ? nom : ""} {prenom ? prenom : ""}
        </Heading3>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            <Heading5>Vos informations</Heading5>
            <Flex mt="2">
              <Building size="16" />
              <Text sx={iconTextStyle}>
                {directionFormatter.formatAdministrationInfo(directions[0])}
              </Text>
            </Flex>
            <Flex mt="2">
              <MailOutline size="16" />
              <Text sx={iconTextStyle}>{email}</Text>
            </Flex>
            <Flex mt="2">
              <PersonOutline size="20" />
              <Text sx={iconTextStyle}>
                {`${prenom ? prenom : ""} ${nom ? nom : ""} `}{" "}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex mt="5">
          <Box>
            <LinkButton to="/direction/edit-informations">
              Modifier vos informations
            </LinkButton>
          </Box>
        </Flex>
        <Flex mt="1">
          <LinkButton to="/direction/edit-password">
            Modifier votre mot de passe
          </LinkButton>
        </Flex>
      </Card>
    </Box>
  );
}

export { DirectionInformations };
