import React from "react";
import { connect } from "react-redux";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { Box, Text, Heading, VStack, Button } from "@chakra-ui/react";
import { signUpUser } from "../redux/user/user.actions";

class SignUp extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isLoading: false,
    passwordInvalid: false,
    passwordsMatch: true,
  };
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true, error: false });
    const { displayName, email, password } = this.state;

    this.props.signUpUser(email, password, displayName);

    this._isMounted &&
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isLoading: false,
      });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    //validate password length
    if (name === "password" && value.length < 6) {
      this.setState({ passwordInvalid: true });
    } else {
      this.setState({ passwordInvalid: false });
    }
    //validate passwords match
    if (name === "confirmPassword" && value !== this.state.password) {
      this.setState({ passwordsMatch: false });
    } else {
      this.setState({ passwordsMatch: true });
    }
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
            <FormControl isRequired id="displayName">
              <FormLabel>Name</FormLabel>
              <Input focusBorderColor="brand.400" type="displayName" name="displayName" value={this.state.displayName} onChange={this.handleChange} />
            </FormControl>
            <FormControl isRequired id="emailSignup">
              <FormLabel>Email</FormLabel>
              <Input focusBorderColor="brand.400" type="email" name="email" value={this.state.email} onChange={this.handleChange} />
            </FormControl>
            <FormControl isRequired id="password" isInvalid={this.state.passwordInvalid}>
              <FormLabel>Password</FormLabel>
              <Input focusBorderColor="brand.400" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
              <FormErrorMessage>min 6 characters</FormErrorMessage>
            </FormControl>
            <FormControl isRequired id="confirmPassword" isInvalid={!this.state.passwordsMatch}>
              <FormLabel>Confirm password</FormLabel>
              <Input focusBorderColor="brand.400" type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
              <FormErrorMessage>passwords must match</FormErrorMessage>
            </FormControl>
          </VStack>
          <Button mt={4} isFullWidth type="submit" isLoading={this.props.isLoading} loadingText="Submitting">
            Sign up
          </Button>
          {this.props.error ? (
            <Text fontSize="sm" my={2} textAlign="center">
              Something went wrong, try again
            </Text>
          ) : null}
        </form>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
});
const mapDispatchToPtops = {signUpUser}
export default connect(mapStateToProps, mapDispatchToPtops)(SignUp);
