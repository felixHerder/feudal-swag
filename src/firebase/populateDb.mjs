import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getDocs, setDoc, collection, getFirestore } from "firebase/firestore";
import { sectionsMap, itemsMap } from "./armorData.mjs";

const firebaseConfig = {
  apiKey: "AIzaSyBpGcrRiUqw1eJezaBOmyoUEuaYY92SyJU",
  authDomain: "feudalswag.firebaseapp.com",
  projectId: "feudalswag",
  storageBucket: "feudalswag.appspot.com",
  messagingSenderId: "252489365389",
  appId: "1:252489365389:web:e23ccd1948abca43d96fc4",
  measurementId: "G-QG6VPVK7LC",
};
const firebaseApp = initializeApp(firebaseConfig);
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
    const sectionColRef = await collection(db, "sections");
    const sectionDocsSnap = await getDocs(sectionColRef);
    for (const sectionDoc of sectionDocsSnap.docs) {
      await deleteDoc(sectionDoc.ref);
    }

    //populate db
    for(const skey of Object.keys(sectionsMap)){
      await setDoc(doc(db, "sections", skey), {itemIds:sectionsMap[skey]});
    }
    for (const ikey of Object.keys(itemsMap)){
      await setDoc(doc(db, "items", ikey), itemsMap[ikey]);
    }

    console.log("batch done");
  } catch (error) {
    console.error("batch failed with error:", error);
  }

  return 0;
}
populateDb().then(() => process.exit());


