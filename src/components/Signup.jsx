import React from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createUserProfileDocument } from "../firebase/firebase.utils";

import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Form, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { Box, Text, Heading, VStack, Button, Center, Stack, Container, SimpleGrid } from "@chakra-ui/react";

class SignUp extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  _isMounted = false;
  onComponentDidMount() {
    this._isMounted = true;
  }
  onComponentWillUnmount() {
    this._isMounted = false;
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);
      //create user doc in users collection in Firestore DB
      await createUserProfileDocument(user, { displayName });
      //don't update state if component will unmount
      this._isMounted &&
        this.setState({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
    } catch (error) {
      console.log("error creating user", error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Box>
        <Heading size="md" mb={1}>
          Don't have an account
        </Heading>
        <Text mb={4}>Sign up with your email and password</Text>
        <form onSubmit={this.handleSubmit}>
          <VStack spacing={2} sx={{ "& label": { fontSize: "sm", mb: 1 } }}>
            <FormControl id="displayName">
              <FormLabel>Name</FormLabel>
              <Input type="displayName" name="displayName" value={this.state.displayName} onChange={this.handleChange} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Confirm password</FormLabel>
              <Input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
            </FormControl>
          </VStack>
          <Button mt={4} isFullWidth type="submit">
            Sign up
          </Button>
        </form>
      </Box>
    );
  }
}

export default SignUp;
