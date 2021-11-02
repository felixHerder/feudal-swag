import { getDoc, doc } from "firebase/firestore";
import ShopActionTypes from "./shop.types";

import { db } from "../../firebase/firebase.utils";

export const fetchShopDataFailed = (error = {}) => ({ type: ShopActionTypes.FETCH_DATA_FAILED, payload: error });
export const fetchShopDataSuccess = (payload) => ({ type: ShopActionTypes.FETCH_DATA_SUCCESS, payload: payload });
export const fetchShopDataStart = () => ({ type: ShopActionTypes.FETCH_DATA_START});

export const fetchShopData = () => async (dispatch) => {
  dispatch(fetchShopDataStart());
  try {
    const items = (await getDoc(doc(db, "shop", "items"))).data();
    const sections = (await getDoc(doc(db, "shop", "sections"))).data();
    dispatch(fetchShopDataSuccess ({ items, sections }));
  } catch (error) {
    console.error("failed to fetch armor data,error:", error);
    dispatch(fetchShopDataFailed(error));
  }
};
