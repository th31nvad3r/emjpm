import { MESURE_PROTECTION } from "@emjpm/biz";
import { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { DEFAULT_MESURE_NATURE } from "~/constants/mesures";
import { Card, Input, Select } from "~/ui";

import { FiltersContext } from "./context";
import { TextStyle } from "./style";

function MagistratFilters() {
  const {
    natureMesure,
    changeNatureMesure,
    searchText,
    changeSearchText,
  } = useContext(FiltersContext);

  return (
    <Card mt="3">
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={TextStyle}>AFFINER LES RÉSULTATS</Text>
            <Box width="200px" mr={1}>
              <Select
                instanceId={"nature-mesure-filter"}
                size="small"
                options={[DEFAULT_MESURE_NATURE].concat(
                  MESURE_PROTECTION.NATURE_MESURE.options
                )}
                placeholder={"Nature de la mesure"}
                value={natureMesure}
                onChange={(option) => changeNatureMesure(option)}
              />
            </Box>
            <Box width="200px" mr={1}>
              <Input
                value={searchText}
                spellCheck="false"
                autoComplete="false"
                onChange={(event) => changeSearchText(event.target.value)}
                name="search"
                size="small"
                placeholder="Numéro RG"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
export { MagistratFilters };
