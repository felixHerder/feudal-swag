import { getDoc, doc, collection, getDocs, query, where, limit, orderBy, startAfter } from "firebase/firestore";
import ShopActionTypes from "./shop.types";
import { db } from "../../firebase/firebase.utils";

const fetchShopItemsStart = () => ({ type: ShopActionTypes.FETCH_ITEMS_START });
const fetchShopItemsFailed = (error = {}) => ({ type: ShopActionTypes.FETCH_ITEMS_FAILED, payload: error });
const fetchShopItemsSuccess = (payload) => ({ type: ShopActionTypes.FETCH_ITEMS_SUCCESS, payload: payload });

const setItemsCache = (items) => ({ type: ShopActionTypes.SET_ITEMS_CACHE, payload: items });
const setSearchParams = (params) => ({ type: ShopActionTypes.SET_SEARCH_PARAMS, payload: params });

export const fetchShopItemsByQuery = (searchParams) => async (dispatch, getState) => {
  try {
    const lastSearchParams = getState().shop.searchParams;
    if (JSON.stringify(searchParams) === JSON.stringify(lastSearchParams) && searchParams.page.toString() === "0") {
      return;
    }
    dispatch(fetchShopItemsStart());
    const itemsRef = collection(db, "items");
    const queryConstraints = [];
    if (searchParams.section !== "all") {
      queryConstraints.push(where("section", "==", searchParams.section));
    }
    queryConstraints.push(orderBy(searchParams.orderBy, searchParams.asc));
    queryConstraints.push(limit(searchParams.limit));
    const q = query(itemsRef, ...queryConstraints);
    const itemDocs = (await getDocs(q)).docs;
    const items = itemDocs.map((doc) => doc.data());

    dispatch(setItemsCache([]));
    dispatch(setSearchParams(searchParams));
    dispatch(fetchShopItemsSuccess(items));
    //clear cache
  } catch (error) {
    console.error("error in fetchShopItemsByQuery", error);
    dispatch(fetchShopItemsFailed(error.message));
  }
};

export const fetchShopItemsByQueryPaginate = (searchParams) => async (dispatch, getState) => {
  try {
    dispatch(fetchShopItemsStart());
    const itemsRef = collection(db, "items");
    const storeItems = getState().shop.itemsArr;
    const { page, limit: pageLimit } = searchParams;
    const { page: lastPage } = { ...getState().shop.searchParams };
    const storeItemsCache = [...getState().shop.itemsCacheArr];
    console.log({ lastPage }, { page });
    const queryConstraints = [];
    let items = [];
    if (page < lastPage) {
      //load last page from cache
      items = storeItemsCache.slice(page * pageLimit, lastPage * pageLimit);
      //store current items in history if not present
      if (storeItemsCache.length <= lastPage * pageLimit) {
        dispatch(setItemsCache([...storeItemsCache, ...storeItems]));
      }
    }
    if (page > lastPage || !lastPage) {
      //try and load next page from cache
      if (storeItemsCache.length > page * pageLimit) {
        items = storeItemsCache.slice((lastPage + 1) * pageLimit, (page + 1) * pageLimit);
      } else {
        //fetch next page from db
        if (searchParams.section !== "all") {
          queryConstraints.push(where("section", "==", searchParams.section));
        }
        queryConstraints.push(orderBy(searchParams.orderBy, searchParams.asc));
        const lastItem = storeItems[storeItems.length - 1];
        const lastItemDoc = await getDoc(doc(itemsRef, lastItem.id));
        queryConstraints.push(startAfter(lastItemDoc));

        queryConstraints.push(limit(searchParams.limit));
        const q = query(itemsRef, ...queryConstraints);
        const itemDocs = (await getDocs(q)).docs;
        items = itemDocs.map((doc) => doc.data());
        //store current items in history if not present
        if (storeItemsCache.length < page * pageLimit) {
          dispatch(setItemsCache([...storeItemsCache, ...storeItems]));
        }
      }
    }
    dispatch(setSearchParams(searchParams));
    dispatch(fetchShopItemsSuccess(items));
    //clear cache on no pagination requested
  } catch (error) {
    console.error("error in fetchShopItemsByQueryPaginate", error);
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
