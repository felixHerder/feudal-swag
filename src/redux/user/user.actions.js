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
import { UserActionTypes } from "./user.types";

export const setCurrentUser = (currentUser) => ({ type: UserActionTypes.SET_CURRENT_USER, payload: currentUser });
export const setUserState = (user) => ({ type: UserActionTypes.SET_USER_STATE, payload: user });
export const fetchUserStart = () => ({ type: UserActionTypes.FETCH_USER_START });
export const fetchUserSuccess = (user) => ({ type: UserActionTypes.FETCH_USER_SUCCESS, payload: user });
export const fetchUserFailed = (error) => ({ type: UserActionTypes.FETCH_USER_FAILED, payload: error });
export const updateUserStart = () => ({ type: UserActionTypes.UPDATE_USER_START });
export const updateUserSuccess = (user) => ({ type: UserActionTypes.UPDATE_USER_SUCCESS, payload: user });
export const updateUserFailed = (error) => ({ type: UserActionTypes.UPDATE_USER_FAILED, payload: error });

const updateUserInDb = async (currentUser) => {
  const userRef = doc(db, `users/${currentUser.uid}`);
  //delete empty objects, they clear out old values on setDoc merge
  const { cartItemIds, favsItemIds } = currentUser;
  if (cartItemIds && Object.keys(cartItemIds).length === 0) {
    delete currentUser.cartItemIds;
  }
  if (favsItemIds && Object.keys(favsItemIds).length === 0) {
    delete currentUser.favsItemIds;
  }
  await setDoc(userRef, currentUser, { merge: true });
};

export const signUpUser = (email, password, displayName) => async (dispatch, getState) => {
  dispatch(updateUserStart());
  try {
    const auth = getAuth();
    const cartItemIds = { ...getState().cart.cartItemIds };
    const favsItemIds = { ...getState().favs.favsItemIds };
    if (auth.currentUser && auth.currentUser.isAnonymous) {
      //upgrade guest anonymous acount
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(auth.currentUser, credential);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
    await updateProfile(auth.currentUser, { displayName });
    const currentUser = { displayName, cartItemIds, favsItemIds };
    await updateUserInDb(currentUser);
    dispatch(updateUserSuccess());
  } catch (error) {
    console.error("error in signUpUser:", error);
    dispatch(updateUserFailed(error.message));
  }
};

export const signInUser = (email, password) => async (dispatch, getState) => {
  dispatch(updateUserStart());
  try {
    const auth = getAuth();
    let currentUser = {};
    //save data from guest acount
    if (auth.currentUser && auth.currentUser.isAnonymous) {
      const cartItemIds = { ...getState().cart.cartItemIds };
      const favsItemIds = { ...getState().favs.favsItemIds };
      currentUser = { cartItemIds, favsItemIds };
    }
    await signInWithEmailAndPassword(auth, email, password);
    if (Object.keys(currentUser).length > 0) {
      await updateUserInDb(currentUser);
    }
    dispatch(updateUserSuccess());
  } catch (error) {
    console.error("error in signInUser:", error);
    dispatch(updateUserFailed(error.message));
  }
};

export const continueWithGoogle = () => async (dispatch, getState) => {
  try {
    const auth = getAuth();
    let currentUser = {};
    //save data from guest acount
    if (auth.currentUser && auth.currentUser.isAnonymous) {
      const cartItemIds = { ...getState().cart.cartItemIds };
      const favsItemIds = { ...getState().favs.favsItemIds };
      currentUser = { cartItemIds, favsItemIds };
    }
    await signInWithPopup(auth, new GoogleAuthProvider());
    dispatch(updateUserStart());
    if (Object.keys(currentUser).length > 0) {
      await updateUserInDb(currentUser);
    }
    dispatch(updateUserSuccess());
  } catch (error) {
    console.error("error in continueWithGoogle:", error);
    dispatch(updateUserFailed(error.message));
  }
};
