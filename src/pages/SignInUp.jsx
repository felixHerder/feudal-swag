import React from "react";
import { Container,SimpleGrid,Center } from "@chakra-ui/react";
import SignIn from "../components/Signin";
import SignUp from "../components/Signup";

const SignInAndSignUpPage = () => (
  <Container centerContent maxW="container.lg">
        <SimpleGrid mt={[2,4,8,16]} spacingX={32} spacingY={12} columns={[1, null, 2]}>
          <SignIn />
          <SignUp />
        </SimpleGrid>
  </Container>
);

export default SignInAndSignUpPage;
