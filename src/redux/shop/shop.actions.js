import { getDoc, doc, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import ShopActionTypes from "./shop.types";
import { db } from "../../firebase/firebase.utils";

const fetchShopItemsStart = () => ({ type: ShopActionTypes.FETCH_ITEMS_START });
const fetchShopItemsFailed = (error = {}) => ({ type: ShopActionTypes.FETCH_ITEMS_FAILED, payload: error });
const fetchShopItemsSuccess = (payload) => ({ type: ShopActionTypes.FETCH_ITEMS_SUCCESS, payload: payload });

const setItemsCache = (items) => ({ type: ShopActionTypes.SET_ITEMS_CACHE, payload: items });
const setSearchParams = (params) => ({ type: ShopActionTypes.SET_SEARCH_PARAMS, payload: params });

//searchParams: { limit: 6, section: "all", orderBy: "name", asc: "asc", page: 0, name: "" },
export const fetchShopItems = (searchParams) => async (dispatch, getState) => {
  const lastSearchParams = getState().shop.searchParams;
  if (JSON.stringify(searchParams) === JSON.stringify(lastSearchParams)) {
    return;
  }
  let { page, ...queryParams } = searchParams;
  let { page: lastPage, ...lastQueryParams } = lastSearchParams;
  page = +page;
  lastPage = +lastPage;
  //limit items per page option at 10, firebase where-in query limit
  const pageLimit = Math.min(10, +searchParams.limit);
  let storeItemsCache = getState().shop.itemsCacheArr;
  try {
    //clear cache if any params changes except the page
    if (JSON.stringify(queryParams) !== JSON.stringify(lastQueryParams)) {
      storeItemsCache = [];
    }
    dispatch(fetchShopItemsStart());
    //try and get current page items from cache
    let fetchedItems = storeItemsCache.slice(page * pageLimit, (page + 1) * pageLimit);
    if (fetchedItems.length < 1 || fetchedItems.indexOf(undefined) > -1) {
      const indexMap = (await getDoc(doc(db, "itemsIndex", "indexMap"))).data();
      let filteredArr = Object.values(indexMap);
      //filter by name
      if (searchParams.name !== "") {
        filteredArr = filteredArr.filter((item) => item.name.toLowerCase().includes(searchParams.name.toLowerCase()));
      }
      //filter section
      if (searchParams.section !== "all") {
        filteredArr = filteredArr.filter((item) => item.section === searchParams.section);
      }
      const asc = searchParams.asc === "asc" ? 1 : -1;
      const orderKey = searchParams.orderBy;
      filteredArr.sort((a, b) => (a[orderKey] < b[orderKey] ? -asc : asc));
      const filteredIds = filteredArr.map((item) => item.id);
      if (storeItemsCache.length < page + 1 * pageLimit) {
        storeItemsCache = [...filteredIds.slice(0, page * pageLimit)].fill(undefined);
      }
      const idsToFetch = filteredIds.slice(page * pageLimit, (page + 1) * pageLimit);
      if (idsToFetch.length > 0) {
        const itemsColRef = collection(db, "items");
        const q = query(itemsColRef, where("id", "in", idsToFetch), orderBy(searchParams.orderBy, searchParams.asc));
        const itemDocs = (await getDocs(q)).docs;
        fetchedItems = itemDocs.map((doc) => doc.data());
      }
      storeItemsCache.splice(page * pageLimit, pageLimit, ...fetchedItems);
      dispatch(setItemsCache([...storeItemsCache]));
    }
    dispatch(setSearchParams(searchParams));
    dispatch(fetchShopItemsSuccess(fetchedItems));
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
