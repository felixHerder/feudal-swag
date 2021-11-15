import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody } from "@chakra-ui/react";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
export default function SigninupModal({ isOpen, onClose,label }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent >
        <ModalCloseButton size="md" />
        <ModalHeader fontSize="md" fontWeight="normal">{label}</ModalHeader>
        <ModalBody px={2} pt={2} pb={4} >
          <Tabs isLazy variant="line" minW="280px">
            <TabList display="flex" justifyContent="space-between" px={4} mx={4}>
              <Tab fontSize="xl">Sign In</Tab>
              <Tab fontSize="xl">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SignIn onClose={onClose} />
              </TabPanel>
              <TabPanel>
                <SignUp onClose={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
