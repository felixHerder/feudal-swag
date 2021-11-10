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
import { updateUserInDb } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
// import Section from "./pages/Section";
// import Item from "./pages/Item";
// import Favs from "./pages/Favs";
class App extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <>
        <Header />
        <BreadCrumbs />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/shop">
            <Shop />
          </Route>
          {/* <Route exact path="/shop/:sectionId">
            <Section />
          </Route> */}
          {/* <Route exact path="/shop/:sectionId/:itemId">
            <Item />
          </Route> */}
          {/* <Route exact path="/favs">
            <Favs />
          </Route> */}

          {/* <Route path="/checkout" component={CheckoutPage} /> */}
          <Route exact path="/signin">
            {!currentUser || currentUser.isAnonymous ? <SignInAndSignUpPage /> : <Redirect to="/" />}
            {/* <SignInAndSignUpPage />  */}
          </Route>
        </Switch>
      </>
    );
  }

  unsubscribeFromAuth = null;
  componentDidMount() {
    const { updateUserInDb } = this.props;
    const auth = getAuth();

    this.unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("AuthState User found:", user.uid);
        const {
          uid,
          email,
          isAnonymous,
          displayName,
          metadata: { createdAt },
        } = user;
        const currentUser = { uid, isAnonymous, displayName, email, createdAt };
        updateUserInDb(currentUser);
      } else {
        console.log("AuthState No user found");
        signInAnonymously(auth).then(() => console.log("signed in as guest"));
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

const mapDispatchToProps = {
  updateUserInDb,
};

export default connect(mapStatetoProps, mapDispatchToProps)(App);
