import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import "./signin.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }
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
      <div className="sign-in">
        <h2>I allready have an account</h2>
        <span>Sign in with email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput label="email" name="email" type="email" value={this.state.email} handleChange={this.handleChange} required />

          <FormInput label="password" name="password" type="password" value={this.state.password} handleChange={this.handleChange} required />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
          </div>
        </form>
        <CustomButton onClick={this.signInWithGoogle} isGoogleSignIn="true">
          Sign In with Google
        </CustomButton>
      </div>
    );
  }
}

export default SignIn;
