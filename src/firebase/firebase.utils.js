<<<<<<< HEAD
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyBLPgaHwz-3JjWu5vxFpLyJAN6UiTFt6BE",
  authDomain: "feudal-db.firebaseapp.com",
  projectId: "feudal-db",
  storageBucket: "feudal-db.appspot.com",
  messagingSenderId: "712921318622",
  appId: "1:712921318622:web:7850ef8bcc21fa1dfcae4f",
  measurementId: "G-ZN7SDNH4BX"
=======
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { store } from "../redux/store";
import { setCurrentUser } from "../redux/user/user.actions";

const firebaseConfig = {
  apiKey: "AIzaSyBpGcrRiUqw1eJezaBOmyoUEuaYY92SyJU",
  authDomain: "feudalswag.firebaseapp.com",
  projectId: "feudalswag",
  storageBucket: "feudalswag.appspot.com",
  messagingSenderId: "252489365389",
  appId: "1:252489365389:web:e23ccd1948abca43d96fc4",
  measurementId: "G-QG6VPVK7LC",
>>>>>>> major-refactor
};
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();

export const signOutUser = () => {
  store.dispatch(setCurrentUser(null));
  signOut(getAuth());
};
