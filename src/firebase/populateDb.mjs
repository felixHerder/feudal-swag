import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getDocs, setDoc, collection, getFirestore } from "firebase/firestore";
import { itemsMap, reviewsMap, indexMap } from "./armorData.mjs";

const firebaseConfig = {
  apiKey: "AIzaSyBpGcrRiUqw1eJezaBOmyoUEuaYY92SyJU",
  authDomain: "feudalswag.firebaseapp.com",
  projectId: "feudalswag",
  storageBucket: "feudalswag.appspot.com",
  messagingSenderId: "252489365389",
  appId: "1:252489365389:web:e23ccd1948abca43d96fc4",
  measurementId: "G-QG6VPVK7LC",
};
initializeApp(firebaseConfig);
const db = getFirestore();
async function populateDb() {
  try {
    //populate db
    for (const ikey of Object.keys(itemsMap)) {
      await setDoc(doc(db, "items", ikey), itemsMap[ikey]);
    }

    for (const itemId of Object.keys(reviewsMap)) {
      const reviews = reviewsMap[itemId];
      const colRef = collection(db, "reviews", itemId, "reviews");
      for (const reviewId of Object.keys(reviews)) {
        await setDoc(doc(colRef, reviewId), reviews[reviewId]);
      }
    }

    await setDoc(doc(db, "itemsIndex", "indexMap"), indexMap);

    console.log("batch done");
  } catch (error) {
    console.error("batch failed with error:", error);
  }

  return 0;
}
populateDb().then(() => process.exit());
