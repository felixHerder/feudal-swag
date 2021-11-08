import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  EmailAuthProvider,
  linkWithCredential,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";
import { updateCartFromDb } from "../cart/cart.actions";
import { updateFavsFromDb } from "../favs/favs.actions";
import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
const fetchUserStart = () => ({ type: UserActionTypes.FETCH_USER_START });
const fetchUserSuccess = (user) => ({ type: UserActionTypes.FETCH_USER_SUCCESS, payload: user });
const fetchUserFailed = (error) => ({ type: UserActionTypes.FETCH_USER_FAILED, payload: error });

export const updateUserInDb = (currentUser) => async (dispatch) => {
  dispatch(fetchUserStart());
  try {
    const userRef = doc(db, `users/${currentUser.uid}`);
    await setDoc(userRef, currentUser, { merge: true });
    dispatch(updateCartFromDb(currentUser.uid));
    dispatch(updateFavsFromDb(currentUser.uid));    
    dispatch(fetchUserSuccess({ currentUser }));
  } catch (error) {
    console.error("error in updateUser:", error.message);
    dispatch(fetchUserFailed(error.message));
  }
};

export const signUpUser = (email, password, displayName) => async (dispatch, getState) => {
  dispatch(fetchUserStart());
  try {
    const auth = getAuth();
    const cartItemIds = getState().cart.cartItemIds;
    const favsItemIds = getState().cart.favsItemIds;
    if (auth.currentUser && auth.currentUser.isAnonymous) {
      //upgrade guest anonymous acount
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(auth.currentUser, credential);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
    await updateProfile(auth.currentUser, { displayName });
    const {
      isAnonymous,
      uid,
      metadata: { createdAt },
    } = auth.currentUser;
    const currentUser = { email, displayName, isAnonymous, uid, createdAt, cartItemIds, favsItemIds };
    dispatch(updateUserInDb(currentUser));
  } catch (error) {
    console.error("error in signUpUser:", error);
    dispatch(fetchUserFailed(error.message));
  }
};

export const signInUser = (email, password) => async (dispatch, getState) => {
  dispatch(fetchUserStart());
  try {
    const auth = getAuth();
    let currentUser = {};
    if (auth.currentUser && auth.currentUser.isAnonymous) {
      const cartItemIds = getState().cart.cartItemIds;
      const favsItemIds = getState().cart.favsItemIds;
      currentUser = { cartItemIds,favsItemIds };
    }
    await signInWithEmailAndPassword(auth, email, password);
    const {
      displayName,
      isAnonymous,
      uid,
      metadata: { createdAt },
    } = auth.currentUser;
    currentUser = { ...currentUser, isAnonymous, uid, createdAt, email, displayName };
    dispatch(updateUserInDb(currentUser));
  } catch (error) {
    console.error("error in continueWithGoogle:", error);
    dispatch(fetchUserFailed(error.message));
  }
};

export const continueWithGoogle = () => async (dispatch, getState) => {
  dispatch(fetchUserStart());
  try {
    const auth = getAuth();
    let currentUser = {};
    //get cartitems from guest acount
    if (auth.currentUser && auth.currentUser.isAnonymous) {
      const cartItemIds = getState().cart.cartItemIds;
      const favsItemIds = getState().cart.favsItemIds;
      currentUser = { cartItemIds,favsItemIds };
    }
    await signInWithPopup(auth, new GoogleAuthProvider());
    const {
      email,
      displayName,
      isAnonymous,
      uid,
      metadata: { createdAt },
    } = auth.currentUser;
    currentUser = { ...currentUser, isAnonymous, uid, createdAt, email, displayName };
    dispatch(updateUserInDb(currentUser));
  } catch (error) {
    console.error("error in continueWithGoogle:", error);
    dispatch(fetchUserFailed(error.message));
  }
};
