import { Box, Flex, Text } from "rebass";

import { Button, Heading3 } from "~/ui";

export function DynamicTableHeader(props) {
  const {
    title,
    buttonEnable,
    selectedItemsCount,
    buttonText,
    isLoading,
    onClick,
  } = props;

  return (
    <Flex my={3} justifyContent="space-between" alignItems="center">
      <Box>
        <Heading3 mb={3}>{title}</Heading3>
      </Box>
      {buttonEnable && (
        <Flex justifyContent="center" alignItems="center">
          <Text mr={20}>{selectedItemsCount} éléments sélectionnés</Text>
          <Button isLoading={isLoading} onClick={onClick}>
            {buttonText}
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default DynamicTableHeader;
