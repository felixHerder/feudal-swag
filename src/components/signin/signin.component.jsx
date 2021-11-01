import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, signInWithGoogle } from '../../firebase/firebase.utils';
import './signin.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {email,password} = this.state;

    try {
      await auth.signInWithEmailAndPassword(email,password);
      this.setState({ email: '', password: '' });

    } catch (error) {
      console.log('error logging in', error);
    }
    
  }
  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }
  render() {
    return (
      <div className="sign-in">
        <h2>I allready have an account</h2>
        <span>Sign in with email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput label="email"
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            required />

          <FormInput label="password"
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange} required />
          <div className="buttons">
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn="true" >
              Sign In with Google</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;