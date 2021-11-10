import { getDoc, doc, collection, getDocs, query, where, limit, orderBy, startAfter } from "firebase/firestore";
import ShopActionTypes from "./shop.types";
import { db } from "../../firebase/firebase.utils";

const fetchShopItemsStart = () => ({ type: ShopActionTypes.FETCH_ITEMS_START });
const fetchShopItemsFailed = (error = {}) => ({ type: ShopActionTypes.FETCH_ITEMS_FAILED, payload: error });
const fetchShopItemsSuccess = (payload) => ({ type: ShopActionTypes.FETCH_ITEMS_SUCCESS, payload: payload });

const setItemsCache = (items) => ({ type: ShopActionTypes.SET_ITEMS_CACHE, payload: items });

export const fetchShopItemsByQuery = (searchParams) => async (dispatch, getState) => {
  console.log("fetchShopItemsByQuery called", searchParams);
  try {
    dispatch(fetchShopItemsStart());
    const itemsRef = collection(db, "items");
    const queryConstraints = [];
    let items = [];
    if (searchParams.page === "prev") {
      const storeItemsCache = [...getState().shop.itemsCacheArr];
      items = storeItemsCache.slice(-searchParams.limit);
      dispatch(setItemsCache(storeItemsCache.slice(0, -searchParams.limit)));
    } else {
      if (searchParams.section !== "all") {
        queryConstraints.push(where("section", "==", searchParams.section));
      }
      queryConstraints.push(orderBy(searchParams.orderBy, searchParams.asc));
      if (searchParams.page === "next") {
        const storeItems = getState().shop.itemsArr;
        const storeItemsCache = [...getState().shop.itemsCacheArr];
        dispatch(setItemsCache([...storeItemsCache, ...storeItems]));
        const lastItem = storeItems[storeItems.length - 1];
        const lastItemDoc = await getDoc(doc(itemsRef, lastItem.id));
        queryConstraints.push(startAfter(lastItemDoc));
      }
      queryConstraints.push(limit(searchParams.limit));
      const q = query(itemsRef, ...queryConstraints);
      const itemDocs = (await getDocs(q)).docs;
      items = itemDocs.map((doc) => doc.data());
    }
    dispatch(fetchShopItemsSuccess(items));
    //clear cache on no pagination requested
    if (!searchParams.page) {
      dispatch(setItemsCache([]));
    }
  } catch (error) {
    console.error("error in fetchShopItemsByQuery", error);
    dispatch(fetchShopItemsFailed(error.message));
  }
};

export const fetchShopItemsByIds = (idsToFetch) => async (dispatch, getState) => {
  try {
    let items = getState().shop.items || {};
    const newItems = {};
    if (idsToFetch) {
      //fetch items only if  specific item is not found in store
      for (const id of idsToFetch) {
        if (!items[id]) {
          if (Object.keys(newItems).length === 1) {
            dispatch(fetchShopItemsStart());
          }
          const itemDoc = await getDoc(doc(db, "items", id.toString()));
          newItems[id] = itemDoc.data();
        }
      }
      if (Object.keys(newItems).length) {
        dispatch(fetchShopItemsSuccess(newItems));
      }
    }
  } catch (error) {
    console.error("failed to fetchShopItemsByIds,error:", error);
    dispatch(fetchShopItemsFailed(error.message));
  }
};
