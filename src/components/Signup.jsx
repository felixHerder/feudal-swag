import React from "react";
import { connect } from "react-redux";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { Box, Text, VStack, Button } from "@chakra-ui/react";
import { signUpUser } from "../redux/user/user.actions";

class SignUp extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  handleSignUp = (event) => {
    event.preventDefault();
    const { displayName, email, password } = this.state;
    this.props.signUpUser(email, password, displayName);

    this._isMounted &&
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
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
    this.setState({ passwordsMatch: true });
    if (name === "password" && this.state.confirmPassword !== "" && value !== this.state.confirmPassword) {
      this.setState({ passwordsMatch: false });
    }
    if (name === "confirmPassword" && value !== this.state.password) {
      this.setState({ passwordsMatch: false });
    }
    this.setState({ [name]: value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error) {
      this.setState({ isLoading: false });
    }
  }
  render() {
    return (
      <Box>
        <form onSubmit={this.handleSignUp}>
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
  error: state.user.error,
  isLoading: state.user.isLoading
});
const mapDispatchToPtops = { signUpUser };
export default connect(mapStateToProps, mapDispatchToPtops)(SignUp);
