import React from "react";
import { connect } from "react-redux";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Box, Text, VStack, Button, Center } from "@chakra-ui/react";
import { continueWithGoogle, signInUser } from "../redux/user/user.actions";
class SignIn extends React.Component {
  state = { email: "", password: "", googleActive: false };
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleSignIn = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.signInUser(email, password);
    this._isMounted && this.setState({ email: "", password: "" });
  };
  handleContinueWithGoogle = () => {
    this.setState({ googleActive: true });
    this.props.continueWithGoogle();
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  componentDidUpdate(prevProps, prevState) {
    //close modal on user change
    if (prevProps.isLoading === true && this.props.isLoading === false && !this.props.error) {
      if (this.props.onClose) {
        this.setState({ googleActive: false });
        this.props.onClose();
      }
    }
  }
  render() {
    return (
      <Box>
        <form onSubmit={this.handleSignIn}>
          <VStack spacing={2} sx={{ "& label": { fontSize: "sm", mb: 1 } }}>
            <FormControl id="emailSignin" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                focusBorderColor="brand.400"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl id="passwordSignIn" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                focusBorderColor="brand.400"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormControl>
          </VStack>
          <Button mt={4} isFullWidth type="submit" isLoading={this.props.isLoading && !this.state.googleActive} loadingText="Submitting">
            Sign in
          </Button>
          {this.props.error ? (
            <Text my={2} fontSize="sm" textAlign="center">
              Something is not right, try again
            </Text>
          ) : null}
        </form>
        <Center my={2}>
          <Text>or</Text>
        </Center>
        <Button isFullWidth colorScheme="blue" isLoading={this.props.isLoading && this.state.googleActive} onClick={this.handleContinueWithGoogle}>
          Continue with Google
        </Button>
      </Box>
    );
  }
}

export default connect(
  (state) => ({
    error: state.user.error,
    isLoading: state.user.isLoading,
  }),
  { continueWithGoogle, signInUser }
)(SignIn);
