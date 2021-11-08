import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  HStack,
  Center,
  Icon,
  Heading,
  IconButton,
  useColorMode,
  Button,
  Portal,
  Flex,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { SunIcon, MoonIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ReactComponent as Logo } from "../assets/banner.svg";
import CartPopover from "./CartPopover";
import DrawerNav from "./NavDrawer";
import UserMenu from "./UserMenu";
import { sectionsData } from "../pages/Home";

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
        <HStack
          spacing={[0, null, 4]}
          fontSize={["xs", "sm", "md"]}
          display={["none", "none", "inline-flex"]}
          alignItems="center"
        >
          <Button variant="ghost" colorScheme="gray" as={RouterLink} to="/shop" px={6}>
            SHOP
          </Button>
          {/* Sections Menu */}
          <Menu isLazy>
            <MenuButton as={Button} pl={6} variant="ghost" colorScheme="gray" rightIcon={<ChevronDownIcon />}>
              SECTIONS
            </MenuButton>
            <Portal>
              <MenuList minW="auto">
                {sectionsData.map(({ title, icon }, idx) => (
                  <MenuItem
                    key={idx}
                    py={4}
                    px={8}
                    as={RouterLink}
                    to={`/shop/${title}`}
                    icon={<Icon boxSize={5} as={icon} />}
                  >
                    {title.toUpperCase()}
                  </MenuItem>
                ))}
              </MenuList>
            </Portal>
          </Menu>
          {/* User menu options */}
          <UserMenu />
        </HStack>
        <HStack spacing={4}>
          {/* Mobile drawer toggle */}
          <DrawerNav />
          {/* Cart popover toggle button */}
          <CartPopover />
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
