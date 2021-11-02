import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../redux/directory/directory.selectors";

import { Container, Flex, Box, Button, Heading, Text, Center, useColorModeValue, Image } from "@chakra-ui/react";

const Home = ({ sections }) => {
  const buttonBg = useColorModeValue("blackAlpha.500", "whiteAlpha.500");

  return (
    <Container maxW="container.lg">
      <Box my={[4, 6, 12]} textAlign="center">
        <Heading as="h1" size={"2xl"}>
          Best apparel in the Kinkdom
        </Heading>
        <Text mt={6} fontSize={["lg", "xl", "2xl"]}>
          Rifle through some of our belongings!
        </Text>
      </Box>
      <Flex m={4} wrap="wrap" sx={{ gap: 64 }} justifyContent="center">
        {sections.map(({ title, imageUrl }, idx) => (
          <Box key={idx} boxSize="240px" maxW="360px" flexGrow="1" overflow="hidden" role="group" position="relative" borderRadius="3xl" boxShadow="xl">
            <Image
              h="100%"
              w="100%"
              src={imageUrl}
              objectFit="cover"
              objectPosition="center 100%"
              transition="transform .5s ease"
              transform="scale(1.05)"
              _groupHover={{ transform: "scale(1)" }}
            />
            <Center w="100%" position="absolute" h="100%" top="0">
              <Button as={RouterLink} to={`/shop/${title}`} size="lg" p={8} bg={buttonBg} borderRadius="3xl">
                {title.toUpperCase()}
              </Button>
            </Center>
          </Box>
        ))}
      </Flex>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});
export default connect(mapStateToProps)(Home);
