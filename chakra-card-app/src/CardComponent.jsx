// CardComponent.jsx
import { Box, Image, Text, Heading } from "@chakra-ui/react";

const CardComponent = () => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      p={5}
      bg="white"
      _hover={{ boxShadow: "2xl" }}
      textAlign="center"
      mx="auto"
    >
      <Heading size="md" mb={4} color="teal.500">
        Chakra UI Card
      </Heading>
      <Image
        src="https://bit.ly/dan-abramov"
        alt="Card Image"
        borderRadius="full"
        boxSize="150px"
        mx="auto"
        mb={4}
      />
      <Text color="gray.600" fontSize="md">
        This is a beautiful card built with Chakra UI. It's responsive, styled, and clean.
      </Text>
    </Box>
  );
};

export default CardComponent;
