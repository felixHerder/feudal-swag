import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { getAuth } from "firebase/auth";

import { Container, HStack, Center, Icon,Heading, IconButton, Link, useColorMode, Text, Button, Box, Divider, Portal } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { SunIcon, MoonIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { GiVisoredHelm } from "react-icons/gi";
import { ReactComponent as Logo } from "../assets/banner.svg";
import CartPopover from "./CartPopover";
import DrawerNav from "./NavDrawer";

const Header = ({ currentUser }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleSignout = () => {
    getAuth().signOut();
  };
  return (
    <Container h="70px" maxW="container.xl" px={[1, 2, 4]} sx={{ userSelect: "none" }} display="flex" justifyContent="space-between">
      {/* Brand Logo */}
      <Center as={RouterLink} to="/" h="100%" minW="70px">
        <Icon as={Logo} fill="currentColor" boxSize={8} />
        <Heading as="h1" letterSpacing="tight" size="md" ml={2} display={["none", null, "block"]}>
          Feudal Swag
        </Heading>
      </Center>
      {/* Nav links */}
      <HStack spacing={[2, null, 4]}>
        <HStack spacing={[4, 4, 8]} fontSize={["xs", "sm", "md"]} display={["none", "flex"]} alignItems="center">
          <Link as={RouterLink} to="/shop">
            SHOP
          </Link>
          <Link as={RouterLink} to="/contact">
            CONTACT
          </Link>
          {!currentUser ? (
            <Link as={RouterLink} to="/signin">
              SIGN IN
            </Link>
          ) : null}
          {/* User menu options */}
          {currentUser ? (
            <Menu isLazy>
              <MenuButton as={Button} px={2} variant="ghost" leftIcon={<Icon as={GiVisoredHelm} />} rightIcon={<ChevronDownIcon />}>
                {currentUser.displayName}
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem>
                    <Link as={RouterLink} to="/checkout">
                      Checkout
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={RouterLink} to="/profile">
                      Profile Settings
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={RouterLink} to="/" onClick={handleSignout}>
                      SIGN OUT
                    </Link>
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          ) : null}
        </HStack>
        <HStack spacing={[1,2,4]}>
          {/* Mobile drawer toggle */}
          <DrawerNav/>
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
