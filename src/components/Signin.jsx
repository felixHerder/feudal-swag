import React from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { connect } from "react-redux";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Box, Text, Heading, VStack, Button, Center } from "@chakra-ui/react";
import { continueWithGoogle } from "../redux/user/user.actions";

class SignIn extends React.Component {
  state = { email: "", password: "", isLoading: false, error: false };
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true, error: false });
    const { email, password } = this.state;
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (error) {
      this.setState({ error: true });
      console.error("error signing in", error);
    } finally {
      this._isMounted && this.setState({ email: "", password: "", isLoading: false });
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
            <FormControl id="emailSignin" isRequired>
              <FormLabel>Email</FormLabel>
              <Input focusBorderColor="brand.400" type="email" name="email" value={this.state.email} onChange={this.handleChange} />
            </FormControl>
            <FormControl id="passwordSignIn" isRequired>
              <FormLabel>Password</FormLabel>
              <Input focusBorderColor="brand.400" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </FormControl>
          </VStack>
          <Button mt={4} isFullWidth type="submit" isLoading={this.state.isLoading} loadingText="Submitting">
            Sign in
          </Button>
          {this.state.error ? (
            <Text my={2} fontSize="sm" textAlign="center">
              Something is not right, try again
            </Text>
          ) : null}
        </form>
        <Center my={2}>
          <Text>or</Text>
        </Center>
        <Button isFullWidth colorScheme="blue" onClick={this.props.continueWithGoogle}>
          Continue with Google
        </Button>
      </Box>
    );
  }
}

export default connect(null, { continueWithGoogle })(SignIn);
