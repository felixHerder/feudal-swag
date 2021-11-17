import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { RiLogoutBoxRLine, RiLoginBoxLine } from "react-icons/ri";
import { BsHeart, BsPerson } from "react-icons/bs";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ReactComponent as TrunkIcon } from "../assets/trunk.svg";
import { Icon, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Portal, useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody } from "@chakra-ui/react";
import { signOutUser } from "../firebase/firebase.utils";
import SignIn from "./SignIn";
import SigninupModal from "./SigninupModal";
import LoadingWrapper from "./LoadingWrapper";

function UserMenu({ currentUser, isUserLoading }) {
  const switchUserModal = useDisclosure();
  const signInUpModal = useDisclosure();
  return (
    <LoadingWrapper isLoading={isUserLoading} size={6}>
      {currentUser ? (
        <Menu isLazy>
          <MenuButton as={Button} pl={4} pr={2} variant="ghost" rightIcon={<ChevronDownIcon />}>
            {currentUser.isAnonymous ? `Guest (${currentUser.uid.slice(0, 3).toLowerCase()})` : currentUser.displayName}
          </MenuButton>
          <Portal>
            <MenuList minW="auto">
              <MenuItem as={RouterLink} to="/trunk" icon={<Icon boxSize={5} fill="currentcolor" as={TrunkIcon} />}>
                Trunk
              </MenuItem>
              <MenuItem as={RouterLink} to="/favs" icon={<Icon boxSize={5} as={BsHeart} />}>
                Favourites
              </MenuItem>
              <MenuItem as={RouterLink} to="/user" icon={<Icon boxSize={5} as={BsPerson} />}>
                User Settings
              </MenuItem>
              <MenuDivider />
              {!currentUser.isAnonymous ? (
                <>
                  <MenuItem onClick={switchUserModal.onOpen} icon={<Icon boxSize={5} as={BsPerson} />}>
                    Switch User
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/" onClick={signOutUser} icon={<Icon boxSize={5} as={RiLogoutBoxRLine} />}>
                    Sign Out
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={signInUpModal.onOpen} icon={<Icon boxSize={5} as={RiLoginBoxLine} />}>
                  Sign In / Sign Up
                </MenuItem>
              )}
            </MenuList>
          </Portal>
        </Menu>
      ) : null}
      {/* Switch User Modal */}
      <Modal isOpen={switchUserModal.isOpen} onClose={switchUserModal.onClose} isCentered>
        <ModalOverlay />
        <ModalContent width="auto">
          <ModalCloseButton />
          <ModalHeader>Switch User</ModalHeader>
          <ModalBody py={6}>
            <SignIn onClose={switchUserModal.onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Signin/up modal */}
      <SigninupModal isOpen={signInUpModal.isOpen} onClose={signInUpModal.onClose} label="Save your cart and favourite items" />
      {/* fallback in case no user is loaded */}
      {!currentUser ? (
        <Button variant="ghost" colorScheme="gray" as={RouterLink} to="/signin">
          SIGN IN
        </Button>
      ) : null}
    </LoadingWrapper>
  );
}

const mapStatetoProps = (state) => ({
  currentUser: state.user.currentUser,
  isUserLoading: state.user.isLoading,
});

export default connect(mapStatetoProps)(UserMenu);
