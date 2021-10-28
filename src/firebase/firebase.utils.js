import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpGcrRiUqw1eJezaBOmyoUEuaYY92SyJU",
  authDomain: "feudalswag.firebaseapp.com",
  projectId: "feudalswag",
  storageBucket: "feudalswag.appspot.com",
  messagingSenderId: "252489365389",
  appId: "1:252489365389:web:e23ccd1948abca43d96fc4",
  measurementId: "G-QG6VPVK7LC",
};
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user: ", error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // const collectionRef = firestore.collection(collectionKey);

  // const batch = firestore.batch();
  // objectsToAdd.forEach((obj) => {
  //   const newDocRef = collectionRef.doc();
  //   batch.set(newDocRef, obj);
  // });

  // return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};
