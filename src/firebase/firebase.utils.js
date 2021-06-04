import firebase from 'firebase/app';
import 'firebase/firestore/';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBLPgaHwz-3JjWu5vxFpLyJAN6UiTFt6BE",
  authDomain: "feudal-db.firebaseapp.com",
  projectId: "feudal-db",
  storageBucket: "feudal-db.appspot.com",
  messagingSenderId: "712921318622",
  appId: "1:712921318622:web:7850ef8bcc21fa1dfcae4f",
  measurementId: "G-ZN7SDNH4BX"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

