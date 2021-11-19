import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Header from "./components/Header";
import BreadCrumbs from "./components/Breadcrumbs";
import SignInAndSignUpPage from "./pages/SignInUp";
// import CheckoutPage from "./pages/checkout/checkout.component";
//eslint-disable-next-line
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { fetchUserFailed, fetchUserStart, fetchUserSuccess, setCurrentUser } from "./redux/user/user.actions";
import {} from "./redux/user/user.selectors";
// import Section from "./pages/Section";
import Item from "./pages/Item";
import { setFavsFromUser } from "./redux/favs/favs.actions";
import { setCartFromUser } from "./redux/cart/cart.actions";
import Favs from "./pages/Favs";
import Trunk from "./pages/Trunk";

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
          <Route exact path="/shop/:section/:name">
            <Item />
          </Route>
          <Route exact path="/shop/:section">
            {(history) => <Redirect to={`/shop?section=${history.match.params.section}`} />}
          </Route>
          <Route exact path="/favs">
            <Favs />
          </Route>
          <Route exact path="/trunk">
            <Trunk />
          </Route>
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
  unsubscribeFromUserDoc = null;
  componentDidMount() {
    const { setFavsFromUser, setCartFromUser, fetchUserStart, fetchUserSuccess, fetchUserFailed, setCurrentUser } = this.props;
    const auth = getAuth();
    //subscribe to user auth changes
    fetchUserStart();
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.unsubscribeFromUserDoc && this.unsubscribeFromUserDoc();
        console.log("AuthState User found:", user.uid);
        try {
          const {
            uid,
            email,
            isAnonymous,
            displayName,
            metadata: { createdAt },
          } = user;
          const currentUser = { uid, isAnonymous, displayName, email, createdAt };
          const userDocRef = doc(getFirestore(), "users", uid);
          //subscribe to user doc changes
          this.unsubscribeFromUserDoc = onSnapshot(userDocRef, async (userDoc) => {
            //create user doc if it doesn't exist,riggers the onSnapshot again
            if (!userDoc.exists()) {
              await setDoc(userDocRef, currentUser);
            } else {
              setCurrentUser({ ...userDoc.data() });
              setFavsFromUser();
              setCartFromUser();
            }
          });
          fetchUserSuccess();
        } catch (error) {
          fetchUserFailed(error.message);
        }
      } else {
        console.log("AuthState No user found");
        await signInAnonymously(auth).then(() => console.log("signed in as guest"));
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth && this.unsubscribeFromAuth();
    this.unsubscribeFromUserDoc && this.unsubscribeFromUserDoc();
  }
}

const mapDispatchToProps = {
  setFavsFromUser,
  setCartFromUser,
  setCurrentUser,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailed,
};

export default connect(null, mapDispatchToProps)(App);
