import { writeBatch, deleteDoc, doc, getDocs, getDoc, getFirestore, setDoc, addDoc, collection } from "firebase/firestore";
import armorData from "./armorData.mjs";
import { db } from "./firebase.utils.mjs";
// const {db,firebaseApp} = fb;

async function populateDb() {
  try {
    //begin batch transaction
    const batch = writeBatch(db);

    //clear collections of documents
    const shopColRef = await collection(db, "shop");
    const shopDocsSnap = await getDocs(shopColRef);
    for (const shopDoc of shopDocsSnap.docs) {
      await deleteDoc(shopDoc.ref);
    }

    //populate db
    const sectionsArr = Object.keys(armorData);
    let itemId = 0;
    let sectionsMap = {};
    let itemsMap = {};
    for (const sectionName of sectionsArr) {
      let sectionIds = [];
      for (const item of armorData[sectionName]) {
        itemsMap[itemId] = {...item,id:itemId,section:sectionName};
        sectionIds.push(itemId);
        itemId++;
      }
      sectionsMap[sectionName] = sectionIds;
    }
    await setDoc(doc(db, "shop", "items"), itemsMap);
    await setDoc(doc(db, "shop", "sections"), sectionsMap);

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
