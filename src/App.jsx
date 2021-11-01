import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Header from "./components/Header";
import SignInAndSignUpPage from "./pages/SignInUp";
// import CheckoutPage from "./pages/checkout/checkout.component";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          {/* <Route path="/checkout" component={CheckoutPage} /> */}
          <Route path="/signin">{this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />}</Route>
        </Switch>
      </>
    );
  }

  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    //subscribed to Firebase auth
    // this.unsubscribeFromAuth = onAuthStateChanged(getAuth(), async (userAuth) => {
    //   if (userAuth) {
    //     //get and/or create user doc in users collection in Firestore DB
    //     const userRef = await createUserProfileDocument(userAuth);
    //     //subsribe to user doc doc changes and set redux user state
    //     onSnapshot(userRef, (snapShot) => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data(),
    //       });
    //     });
    //   } else {
    //     setCurrentUser(null);
    //   }
    // });
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
