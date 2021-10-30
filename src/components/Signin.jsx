import React from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInAnonymously } from "firebase/auth";

import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Form } from "@chakra-ui/react";
import { Box, Text, Heading, VStack, Button, Center, Stack, Container, SimpleGrid } from "@chakra-ui/react";

class SignIn extends React.Component {
  state = { email: "", password: "" };
  signInWithGoogle = async () => {
    try {
      await signInWithPopup(getAuth(), new GoogleAuthProvider());
    } catch (error) {
      console.log("error signing in with google", error);
    }
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log("error signing in", error);
    }
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <Box>
        <Heading size="md" mb={1}>
          I have an account
        </Heading>
        <Text mb={4}>Sign in with email and password</Text>
        <form onSubmit={this.handleSubmit}>
          <VStack spacing={2} sx={{ "& label": { fontSize: "sm", mb: 1 } }}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </FormControl>
          </VStack>
          <Button mt={4} isFullWidth type="submit">
            Sign in
          </Button>
        </form>
        <Center my={2}>
          <Text>or</Text>
        </Center>
        <Button isFullWidth colorScheme="blue" onClick={this.signInWithGoogle}>
          Continue with Google
        </Button>
      </Box>
    );
  }
}

export default SignIn;
