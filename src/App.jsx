import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Header from "./components/Header";
import BreadCrumbs from "./components/Breadcrumbs";
import SignInAndSignUpPage from "./pages/SignInUp";
// import CheckoutPage from "./pages/checkout/checkout.component";
        //eslint-disable-next-line
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
// import { onSnapshot } from "firebase/firestore";
// import { createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  render() {
    const {currentUser} = this.props;
    return (
      <>
        <Header />
        <BreadCrumbs />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          {/* <Route path="/checkout" component={CheckoutPage} /> */}
          <Route exact path="/signin">
            {!currentUser || currentUser.isAnonymous ? <SignInAndSignUpPage /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </>
    );
  }

  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    const auth = getAuth();

    this.unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        console.log("AuthState User found:", userAuth.uid);
        const { uid, isAnonymous,displayName } = userAuth;
        setCurrentUser({ uid, isAnonymous, displayName });
        //get and/or create user doc in users collection in Firestore DB
        //subsribe to user doc doc changes and set redux user state
      } else {
        console.log("AuthState No user found");

        // signInAnonymously(auth).then(() => console.log("signed in as guest"));
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
}

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(App);
