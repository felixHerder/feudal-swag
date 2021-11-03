import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
const signUpUserStart = (user) => ({ type: UserActionTypes.SIGNUP_USER_START });
const signUpUserSuccess = (user) => ({ type: UserActionTypes.SIGNUP_USER_SUCCESS, payload: user });
const signUpUserFailed = (error) => ({ type: UserActionTypes.SIGNUP_USER_FAILED, payload: error });

export const signUpUser = (email, password, displayName) => async (dispatch) => {
  dispatch(signUpUserStart());
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName });
    dispatch(signUpUserSuccess(auth.currentUser));
  } catch (error) {
    console.error("error signing up user:", error);
    dispatch(signUpUserFailed(error));
  }
};
