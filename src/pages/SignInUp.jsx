import React from "react";
import { Container, Text } from "@chakra-ui/react";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import SignIn from "../components/Signin";
import SignUp from "../components/Signup";

const SignInAndSignUpPage = () => (
  <Container centerContent maxW="container.lg">
    <Tabs variant="soft-rounded" w="300px">
      <TabList display="flex" justifyContent="space-between" >
        <Tab fontSize="xl">Sign In</Tab>
        <Tab fontSize="xl">Sign Up</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
        <Text mb={4}>Sign in with email and password</Text>
        <SignIn />
        </TabPanel>
        <TabPanel>
        <Text mb={4}>Sign up with your email and password</Text>
        <SignUp />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Container>
);

export default SignInAndSignUpPage;
