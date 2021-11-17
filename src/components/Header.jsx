import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, HStack, Center, Icon, Heading, IconButton, useColorMode, Button, Flex } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { ReactComponent as Logo } from "../assets/banner.svg";
import CartPopover from "./CartPopover";
import { IoStorefrontOutline } from "react-icons/io5";
import DrawerNav from "./NavDrawer";
import UserMenu from "./UserMenu";
import FavIcon from "./FavIcon";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      h="70px"
      maxW="container.xl"
      px={[2, 2, 4]}
      sx={{ userSelect: "none" }}
      display="flex"
      justifyContent="space-between"
    >
      {/* Brand Logo */}
      <Center as={RouterLink} to="/" h="100%" minW={["50px"]}>
        <Icon as={Logo} fill="currentColor" boxSize={8} />
        <Heading as="h1" letterSpacing="tight" size="md" ml={2} display={["none", null, "block"]}>
          Feudal Swag
        </Heading>
      </Center>
      {/* Nav links */}
      <Flex>
        <HStack spacing={[0, null, 4]} fontSize={["xs", "sm", "md"]} display={["none", "none", "flex"]} alignItems="center">
          <Button
            variant="ghost"
            colorScheme="gray"
            as={RouterLink}
            to="/shop"
            px={4}
            rightIcon={<Icon as={IoStorefrontOutline} />}
          >
            SHOP
          </Button>
          {/* User menu options */}
          <UserMenu />
        </HStack>
        <HStack spacing={4}>
          {/* Mobile drawer toggle */}
          <DrawerNav />
          {/* Cart popover toggle button */}
          {/* <CartPopover /> */}
          {/* Favs link */}
          <IconButton
            as={RouterLink}
            to="/favs"
            icon={<FavIcon mt="4px" boxSize={4} />}
            variant="ghost"
            colorScheme="gray"
            px={6}
          />
          {/* Theme toggle button */}
          <IconButton
            size="md"
            colorScheme="gray"
            variant="ghost"
            aria-label="Toggle theme"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Header;
