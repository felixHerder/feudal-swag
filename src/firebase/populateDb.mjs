import { writeBatch, deleteDoc, doc, getDocs, getDoc, getFirestore, setDoc, addDoc, collection } from "firebase/firestore";
import armorData from "./armorData.mjs";
import { db } from "./firebase.utils.mjs";
// const {db,firebaseApp} = fb;

async function populateDb() {
  try {
    //begin batch transaction
    const batch = writeBatch(db);

    //clear collections of documents
    const itemsColRef = await collection(db, "items");
    const itemsDocsSnap = await getDocs(itemsColRef);
    for (const itemDoc of itemsDocsSnap.docs) {
      await deleteDoc(itemDoc.ref);
    }
    const sectionsColRef = await collection(db, "sections");
    const sectionsDocsSnap = await getDocs(sectionsColRef);
    for (const sectionDoc of sectionsDocsSnap.docs) {
      await deleteDoc(sectionDoc.ref);
    }

    //populate db
    const sectionsArr = Object.keys(armorData);
    let itemId = 0;
    for (const sectionName of sectionsArr) {
      let sectionIds = [];
      for (const item of armorData[sectionName]) {
        const itemRef = await doc(db, "items", itemId.toString());
        await setDoc(itemRef, { id: itemId, sectionName, ...item });
        sectionIds.push(itemId);
        itemId++;
      }
      await setDoc(doc(db, "sections", sectionName), { items: sectionIds });
    }

    await batch.commit();
    console.log("batch done");
  } catch (error) {
    console.error("batch failed with error:", error);
  }

  return 0;
}
populateDb().then(() => process.exit());

// const sections = Object.keys(armorData);
// let itemsCol = [];
// let sectionsCol = {};
// let itemId = 0;
// console.log(sections);
// sections.forEach((section) => {
//   sectionsCol[section] = [];
//   armorData[section].forEach((item) => {
//     itemsCol.push({ id: itemId,section, ...item });
//     sectionsCol[section].push(itemId);
//     itemId++
//   });
// });
// console.log(sectionsCol);
// console.log(itemsCol);
