import { collection, getDocs, getDoc } from "firebase/firestore";
import ShopActionTypes from "./shop.types";

import { db } from "../../firebase/firebase.utils";

export const fetchData = () => async (dispatch) => {
  dispatch({ type: ShopActionTypes.FETCH_DATA_START });
  try {
    //get all items docs as array
    const itemDocsSnapshot = (await getDocs(collection(db, "items"))).docs;
    //convert doc array to objects
    const items = await itemDocsSnapshot.reduce((acc, item, idx) => ({ ...acc, [idx]: item.data() }), {});
    //get all section item ids as array of arrays
    const sectionDocsSnapshot = (await getDocs(collection(db, "sections"))).docs;
    //concert doc array to objects
    const sections = sectionDocsSnapshot.reduce((acc, section) => ({ ...acc, [section.id]: section.data().items }), {});

    dispatch({ type: ShopActionTypes.FETCH_DATA_SUCCESS, payload: { items, sections } });
  } catch (error) {
    console.error("failed to fetch armor data,error:", error);
    dispatch({ type: ShopActionTypes.FETCH_DATA_FAILED, payload: error });
  }
};
