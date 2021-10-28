import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {getAuth,createUserWithEmailAndPassword } from 'firebase/auth';

import { createUserProfileDocument } from '../../firebase/firebase.utils';

import './signup.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }
  _isMounted = false;
  onComponentDidMount(){
    this._isMounted = true;
  }
  onComponentWillUnmount(){
    this._isMounted = false;
  } 
  handleSubmit = async event =>{
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if(password !== confirmPassword){
      alert('passwords don\'t match');
      return;
    }
    try {
      const {user} = await createUserWithEmailAndPassword(getAuth(),email,password);
      //create user doc in users collection in Firestore DB
      await createUserProfileDocument(user,{displayName})
      //don't update state if component will unmount
      this._isMounted && this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) { 
      console.log('error creating user', error);
    }
  }

  handleChange = event => {
    const {name,value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignUp;