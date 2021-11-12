import { getDoc, doc, collection, getDocs, query, where, limit, orderBy, startAfter } from "firebase/firestore";
import ShopActionTypes from "./shop.types";
import { db } from "../../firebase/firebase.utils";

const fetchShopItemsStart = () => ({ type: ShopActionTypes.FETCH_ITEMS_START });
const fetchShopItemsFailed = (error = {}) => ({ type: ShopActionTypes.FETCH_ITEMS_FAILED, payload: error });
const fetchShopItemsSuccess = (payload) => ({ type: ShopActionTypes.FETCH_ITEMS_SUCCESS, payload: payload });

const setItemsCache = (items) => ({ type: ShopActionTypes.SET_ITEMS_CACHE, payload: items });
const setSearchParams = (params) => ({ type: ShopActionTypes.SET_SEARCH_PARAMS, payload: params });

//expected searchParams: { limit: 6, section: "all", orderBy: "name", asc: "asc", page: 3 },
export const fetchShopItemsByQueryPaginate = (searchParams) => async (dispatch, getState) => {
  try {
    dispatch(fetchShopItemsStart());
    let { page, ...queryParams } = searchParams;
    page = +page;
    let { page: lastPage, ...lastQueryParams } = getState().shop.searchParams;
    lastPage = +lastPage;
    //limit items per page option at 12
    const pageLimit = Math.min(12, +searchParams.limit);
    const storeItems = getState().shop.itemsArr;
    let storeItemsCache = getState().shop.itemsCacheArr;
    //clear cache if query params change
    if (JSON.stringify(queryParams) !== JSON.stringify(lastQueryParams)) {
      storeItemsCache = [];
    }
    //try and get current page items from cache
    let fetchedItems = storeItemsCache.slice(page * pageLimit, (page + 1) * pageLimit);
    if (fetchedItems.length < 1 || fetchedItems.indexOf(undefined) > -1) {
      const itemsColRef = collection(db, "items");
      const queryConstraints = [];
      searchParams.section !== "all" && queryConstraints.push(where("section", "==", searchParams.section));
      queryConstraints.push(orderBy(searchParams.orderBy, searchParams.asc));
      if (page > 0) {
        let lastItemDoc;
        //try and get last item in last page from cache
        const lastItem = storeItemsCache[(page * pageLimit)-1];
        console.log({lastItem})
        if (lastItem) {
          lastItemDoc = await getDoc(doc(itemsColRef, lastItem.id));
        } else {
          //no last page in cache, query firebase for all items untill last document of last page
          const forwardQuery = query(itemsColRef, ...queryConstraints, limit(pageLimit * page));
          const forwardDocs = (await getDocs(forwardQuery)).docs;
          lastItemDoc = forwardDocs[forwardDocs.length - 1];
          //fill cache with all items until requested page
          storeItemsCache = forwardDocs.map(doc=>doc.data()) 
        }
        queryConstraints.push(startAfter(lastItemDoc));
      }
      queryConstraints.push(limit(searchParams.limit));
      const q = query(itemsColRef, ...queryConstraints);
      const itemDocs = (await getDocs(q)).docs;
      fetchedItems = itemDocs.map((doc) => doc.data());      
      //add current page items to cache
      dispatch(setItemsCache([...storeItemsCache,...fetchedItems]));
    }
    dispatch(setSearchParams(searchParams));
    dispatch(fetchShopItemsSuccess(fetchedItems));
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
