import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { getAuth } from "firebase/auth";

import { HStack, Icon, VStack, IconButton, Link, Text, Divider } from "@chakra-ui/react";
import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { GiVisoredHelm } from "react-icons/gi";

function NavDrawer({ currentUser }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen((isOpen) => !isOpen);
  const handleSignout = () => {
    getAuth().signOut();
  };

  return (
    <>
      <IconButton variant="ghost" colorScheme="gray" px={2} icon={<HamburgerIcon boxSize={6} />} display={["block", "none"]} onClick={toggleOpen} />

      <Drawer isOpen={isOpen} placement="right" onClose={toggleOpen}>
        <DrawerOverlay />
        <DrawerContent maxWidth="max-content">
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4} mt={10} pr={4} alignItems="flex-start">
              <Link as={RouterLink} to="/shop" onClick={toggleOpen}>
                SHOP
              </Link>
              <Link as={RouterLink} to="/contact" onClick={toggleOpen}>
                SECTIONS
              </Link>
              {currentUser ? (
                <>
                  <Divider />
                  <HStack>
                    <Text>{currentUser.displayName}</Text>
                    <Icon as={GiVisoredHelm} />
                  </HStack>
                  <Divider />
                  <Link as={RouterLink} to="/checkout" onClick={toggleOpen}>
                    Checkout
                  </Link>
                  <Link as={RouterLink} to="/profile" onClick={toggleOpen}>
                    Profile Settings
                  </Link>
                  <Link
                    as={RouterLink}
                    to="/"
                    onClick={() => {
                      toggleOpen();
                      handleSignout();
                    }}
                  >
                    SIGN OUT
                  </Link>
                </>
              ) : null}
              {!currentUser ? (
                <Link as={RouterLink} to="/signin" onClick={toggleOpen}>
                  SIGN IN
                </Link>
              ) : null}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStatetoProps)(NavDrawer);
