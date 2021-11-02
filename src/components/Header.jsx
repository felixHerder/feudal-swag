import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { getAuth } from "firebase/auth";

import { Container, HStack, Center, Icon, Heading, IconButton, useColorMode, Button, Portal } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react";
import { SunIcon, MoonIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { GiVisoredHelm } from "react-icons/gi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { ReactComponent as Logo } from "../assets/banner.svg";
import CartPopover from "./CartPopover";
import DrawerNav from "./NavDrawer";
import {GiGauntlet,GiGreaves,GiMetalBoot,GiDwarfHelmet,GiBreastplate} from 'react-icons/gi'

const sectionIcons = [GiGauntlet,GiGreaves,GiMetalBoot,GiDwarfHelmet,GiBreastplate];

const Header = ({ currentUser }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleSignout = () => {
    getAuth().signOut();
  };
  return (
    <Container h="70px" maxW="container.xl" px={[1, 2, 4]} sx={{ userSelect: "none" }} display="flex" justifyContent="space-between">
      {/* Brand Logo */}
      <Center as={RouterLink} to="/" h="100%" minW={["50px"]}>
        <Icon as={Logo} fill="currentColor" boxSize={8} />
        <Heading as="h1" letterSpacing="tight" size="md" ml={2} display={["none", null, "block"]}>
          Feudal Swag
        </Heading>
      </Center>
      {/* Nav links */}
      <HStack spacing={[0, null, 4]}>
        <HStack spacing={[0, null, 4]} fontSize={["xs", "sm", "md"]} display={["none", "flex"]} alignItems="center">
          <Button variant="ghost" colorScheme="gray" as={RouterLink} to="/shop">
            SHOP
          </Button>
          {/* Sections Menu */}
          <Menu isLazy >
            <MenuButton as={Button} pl={6} variant="ghost" colorScheme="gray" rightIcon={<ChevronDownIcon />}>
              SECTIONS
            </MenuButton>
            <Portal>
              <MenuList minW="auto">
                {["gauntlets", "greaves","sabatons","helmets","breastplates"].map((section,idx) => (
                  <MenuItem px={8} py={4} as={RouterLink} to={`/shop/${section}`} icon={<Icon boxSize={5} as={sectionIcons[idx]}/>}>
                    {section.toUpperCase()}
                  </MenuItem>
                ))}
              </MenuList>
            </Portal>
          </Menu>
          {!currentUser ? (
            <Button variant="ghost" colorScheme="gray" as={RouterLink} to="/signin">
              SIGN IN
            </Button>
          ) : null}
          {/* User menu options */}
          {currentUser ? (
            <Menu isLazy>
              <MenuButton as={Button} px={2} variant="ghost" leftIcon={<Icon as={GiVisoredHelm} />} rightIcon={<ChevronDownIcon />}>
                {currentUser.displayName}
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuGroup title={`Signed in as ${currentUser.displayName}`}>
                    <MenuItem as={RouterLink} to="/checkout">
                      Cart
                    </MenuItem>
                    <MenuItem as={RouterLink} to="/profile">
                      Profile Settings
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem as={RouterLink} to="/" onClick={handleSignout} icon={<Icon boxSize={5} as={RiLogoutBoxRLine} />}>
                      Sign Out
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Portal>
            </Menu>
          ) : null}
        </HStack>
        <HStack spacing={[1, null, 4]}>
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
      </HStack>
    </Container>
  );
};

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStatetoProps)(Header);
