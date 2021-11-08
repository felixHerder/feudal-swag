import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Container, Flex, Box, Heading, Text, Center, Icon, Image } from "@chakra-ui/react";
import { GiGauntlet, GiGreaves, GiMetalBoot, GiDwarfHelmet, GiBreastplate } from "react-icons/gi";
import useThemeColors from "../theme/useThemeColors";

const sectionIcons = [GiGauntlet, GiGreaves, GiMetalBoot, GiDwarfHelmet, GiBreastplate];
const sections = [
  {
    title: "gauntlets",
    imageUrl: "/img/heavy-armor/gauntlets/gauntlets_large_001.jpg",
  },
  {
    title: "greaves",
    imageUrl: "/img/heavy-armor/greaves/greaves_large_003.jpg",
  },
  {
    title: "sabatons",
    imageUrl: "/img/heavy-armor/sabatons/sabatons_large_006.jpg",
  },
  {
    title: "helmets",
    imageUrl: "/img/heavy-armor/helmets/helmets_large_002.jpg",
  },
  {
    title: "breastplates",
    imageUrl: "/img/heavy-armor/breastplates/breastplates_large_001.jpg",
  },
];

const Home = () => {
  const { cardBg, textPrice } = useThemeColors();

  return (
    <Container maxW="container.xl">
      <Box mt={[4, 6, 12]} textAlign="center">
        <Heading as="h1" size={"2xl"}>
          Best apparel in the Kingdom
        </Heading>
        <Text pt={6} pb={8} fontSize={["lg", "xl", "2xl"]}>
          Rifle through some of our belongings!
        </Text>
      </Box>
      <Flex mb={12} wrap="wrap" sx={{ gap: 16 }} justifyContent="center">
        {sections.map(({ title, imageUrl }, idx) => (
          <Box
            as={RouterLink}
            to={`/shop/${title}`}
            tabIndex={0}
            key={idx}
            w="160px"
            maxW="420px"
            flexGrow="1"
            overflow="hidden"
            role="group"
            borderRadius="md"
            boxShadow="none"
            _active={{ boxShadow: "outline" }}
            _focus={{ boxShadow: "outline" }}
            _focusVisible={{ boxShadow: "outline" }}
          >
            <Box h="clamp(100px,40vw,500px)" overflow="hidden">
              <Image
                w="100%"
                h="100%"
                src={imageUrl}
                objectFit="cover"
                objectPosition="center"
                transition="transform .5s ease"
                transform="scale(1.05)"
                _groupHover={{ transform: "scale(1)" }}
                _groupActive={{ transform: "scale(1)" }}
              />
            </Box>
            <Center bg={cardBg} py={4} _groupHover={{ color: textPrice }} _groupActive={{ color: textPrice }}>
              <Icon mr={2} as={sectionIcons[idx]} />
              <Heading size="sm" fontFamily="body">
                {title.toUpperCase()}
              </Heading>
            </Center>
          </Box>
        ))}
      </Flex>
    </Container>
  );
};

export default Home;
