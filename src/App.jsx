import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { onSnapshot } from "firebase/firestore";

import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { fetchUserFailed, fetchUserStart, fetchUserSuccess, setCurrentUser } from "./redux/user/user.actions";
import {} from "./redux/user/user.selectors";
import { setFavsFromUser } from "./redux/favs/favs.actions";
import { setCartFromUser } from "./redux/cart/cart.actions";
import LoadingWrapper from "./components/LoadingWrapper";
import Header from "./components/Header";
import BreadCrumbs from "./components/Breadcrumbs";

const SignInAndSignUpPage = lazy(() => import("./pages/SignInUp"));
const Item = lazy(() => import("./pages/Item"));
const Shop = lazy(() => import("./pages/Shop"));
const Favs = lazy(() => import("./pages/Favs"));
const Trunk = lazy(() => import("./pages/Trunk"));
const Home = lazy(() => import("./pages/Home"));

class App extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <>
        <Header />
        <BreadCrumbs />
        <main style={{ minHeight: "90vh" }}>
          <Suspense fallback={<LoadingWrapper isLoading={true} />}>
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
              <Route exact path="/signin">
                {!currentUser || currentUser.isAnonymous ? <SignInAndSignUpPage /> : <Redirect to="/" />}
              </Route>
            </Switch>
          </Suspense>
        </main>
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
