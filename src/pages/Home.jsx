import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../redux/directory/directory.selectors";

import { Container, Flex, Box, Button, Heading, Text, Center, useColorModeValue } from "@chakra-ui/react";

const Homepage = ({ sections }) => {
  const titleBg = useColorModeValue("white", "gray.800");
  const titleBgHover = useColorModeValue("brand.100", "brand.800");
  return (
    <Container maxW="container.xl">
      <Box my={[4, 6, 12]} textAlign="center">
        <Heading as="h1" size={"2xl"}>
          Best apparel in the Kinkdom
        </Heading>
        <Text mt={2} fontSize={["lg","xl","2xl"]}>
          Rifle through some of our belongings!
        </Text>
      </Box>
      <Flex mt={4} wrap="wrap" sx={{ gap: 16 }}>
        {sections.map(({ id, title, imageUrl }) => (
          <Box key={id} boxSize="260px" flexGrow="1" position="relative" overflow="hidden" role="group" borderRadius="lg">
            <Box
              className="img"
              transition="transform 0.2s ease"
              _groupHover={{ transform: "scale(1.05)" }}
              h="100%"
              sx={{
                bg: `url(${imageUrl}) no-repeat center center`,
                backgroundSize: "cover",
              }}
            />
            <Center w="100%" position="absolute" h="100%" top="0" flexDirection="column">
              <Heading
                as={RouterLink}
                to={`/shop/${title}`}
                className="title"
                px={4}
                py={2}
                _groupHover={{ transform: "scale(1.2)" }}
                textAlign="center"
                letterSpacing="tighter"
                size="md"
                bg={titleBg}
                transition="all .2s ease"
                _hover={{ bg: titleBgHover }}
                _focus={{ boxShadow: "outline" }}
                borderRadius="md"
              >
                {title.toUpperCase()}
              </Heading>
            </Center>
            <Button>Shop now</Button>
          </Box>
        ))}
      </Flex>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});
export default connect(mapStateToProps)(Homepage);
