import { collection, getDoc, doc, runTransaction } from "firebase/firestore";
import ShopActionTypes from "./shop.types";

import { db } from "../../firebase/firebase.utils";

export const fetchData = () => async (dispatch) => {
  dispatch({ type: ShopActionTypes.FETCH_DATA_START });
  try {
    const items = (await getDoc(doc(db, "shop", "items"))).data();
    const sections = (await getDoc(doc(db, "shop", "sections"))).data();
    dispatch({ type: ShopActionTypes.FETCH_DATA_SUCCESS, payload: { items, sections } });
  } catch (error) {
    console.error("failed to fetch armor data,error:", error);
    dispatch({ type: ShopActionTypes.FETCH_DATA_FAILED, payload: error });
  }
};
