import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";


import HomePage from "./pages/homepage/homepage.component";
// import ShopPage from "./pages/shop/shop.component";
import Header from "./components/Header";
import SignInAndSignUpPage from "./pages/signin-and-signup/signin-and-signup.component";
// import CheckoutPage from "./pages/checkout/checkout.component";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
// import {selectCollectionsForPreview} from './redux/shop/shop.selectors';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/">
            {/* <HomePage /> */}
          </Route>
          {/* <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" component={CheckoutPage} /> */}
          <Route path="/signin">{this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />}</Route>
        </Switch>
      </>
    );
  }

  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    //subscribed to Firebase auth
    this.unsubscribeFromAuth = onAuthStateChanged(getAuth(), async (userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        //get and/or create user doc in users collection in Firestore DB
        const userRef = await createUserProfileDocument(userAuth);
        //subsribe to user doc doc changes and set redux user state
        onSnapshot(userRef, (snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
}

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(App);
