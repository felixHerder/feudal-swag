import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getDocs, setDoc, collection, getFirestore } from "firebase/firestore";
import { itemsMap,reviewsMap,indexMap } from "./armorData.mjs";

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
    //TO DO  batch transaction

    //clear collections of documents
    const itemColRef = await collection(db, "items");
    const itemDocsSnap = await getDocs(itemColRef);
    for (const itemDoc of itemDocsSnap.docs) {
      await deleteDoc(itemDoc.ref);
    }
    const itemIndexColRef = await collection(db, "itemsIndex");
    const itemIndexDocsSnap = await getDocs(itemIndexColRef);
    for (const itemIndexDoc of itemIndexDocsSnap.docs) {
      await deleteDoc(itemIndexDoc.ref);
    }
    const reviewsColRef = await collection(db, "reviews");
    const reviewsDocsSnap = await getDocs(reviewsColRef);
    for (const reviewsDoc of reviewsDocsSnap.docs) {
      await deleteDoc(reviewsDoc.ref);
    }

    //populate db
    for (const ikey of Object.keys(itemsMap)){
      await setDoc(doc(db, "items", ikey), itemsMap[ikey]);
    }

    for (const rkey of Object.keys(reviewsMap)){
      await setDoc(doc(db, "reviews", rkey), reviewsMap[rkey]);
    }

    await setDoc(doc(db, "itemsIndex",'indexMap'),indexMap);

    console.log("batch done");
  } catch (error) {
    console.error("batch failed with error:", error);
  }

  return 0;
}
populateDb().then(() => process.exit());


