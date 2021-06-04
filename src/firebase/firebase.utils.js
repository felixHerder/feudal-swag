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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user: ', error.message);
    }
  }
  return userRef;
}
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

