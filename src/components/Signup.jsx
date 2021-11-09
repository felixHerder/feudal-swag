import React from "react";
import { connect } from "react-redux";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { Box, Text, VStack, Button } from "@chakra-ui/react";
import { signUpUser, setUserState } from "../redux/user/user.actions";

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
    console.log('mounted')
    this._isMounted = true;
    //reset error state
    this.props.setUserState({ error: false });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleSignUp = (event) => {
    event.preventDefault();
    const { displayName, email, password } = this.state;
    this.props.signUpUser(email, password, displayName);
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
    //check submiting is done with no error
    if (prevProps.isLoading === true && this.props.isLoading === false && !this.props.error) {
      //cleat state on no error
      this._isMounted && this.setState({ displayName: "", email: "", password: "", confirmPassword: "" });
      //close modal on user change
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }
  render() {
    return (
      <Box>
        <form onSubmit={this.handleSignUp}>
          <VStack spacing={2} sx={{ "& label": { fontSize: "sm", mb: 1 } }}>
            <FormControl isRequired id="displayName">
              <FormLabel>Name</FormLabel>
              <Input
                focusBorderColor="brand.400"
                type="displayName"
                name="displayName"
                value={this.state.displayName}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl isRequired id="emailSignup">
              <FormLabel>Email</FormLabel>
              <Input
                focusBorderColor="brand.400"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl isRequired id="password" isInvalid={this.state.passwordInvalid}>
              <FormLabel>Password</FormLabel>
              <Input
                focusBorderColor="brand.400"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <FormErrorMessage>min 6 characters</FormErrorMessage>
            </FormControl>
            <FormControl isRequired id="confirmPassword" isInvalid={!this.state.passwordsMatch}>
              <FormLabel>Confirm password</FormLabel>
              <Input
                focusBorderColor="brand.400"
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
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
  isLoading: state.user.isLoading,
});
const mapDispatchToPtops = { signUpUser, setUserState };
export default connect(mapStateToProps, mapDispatchToPtops)(SignUp);
