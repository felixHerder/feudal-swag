import { getDoc, doc, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import ShopActionTypes from "./shop.types";
import { db } from "../../firebase/firebase.utils";

const fetchShopItemsStart = () => ({ type: ShopActionTypes.FETCH_ITEMS_START });
const fetchShopItemsFailed = (error = {}) => ({ type: ShopActionTypes.FETCH_ITEMS_FAILED, payload: error });
const fetchShopItemsSuccess = (payload) => ({ type: ShopActionTypes.FETCH_ITEMS_SUCCESS, payload: payload });

const setItemsCache = (items) => ({ type: ShopActionTypes.SET_ITEMS_CACHE, payload: items });
const setSearchParams = (params) => ({ type: ShopActionTypes.SET_SEARCH_PARAMS, payload: params });
const setSearchResults = (results) => ({ type: ShopActionTypes.SET_SEARCH_RESULTS, payload: results });
const setIndexMap = (indexMap) => ({ type: ShopActionTypes.SET_INDEX_MAP, payload: indexMap });
export const clearStoreItems = () => ({ type: ShopActionTypes.CLEAR_ITEMS });

//searchParams: { limit: 6, section: "all", orderBy: "name", asc: "asc", page: 0, name: "" },
export const fetchShopItems = (searchParams) => async (dispatch, getState) => {
  const lastSearchParams = getState().shop.searchParams;
  let storeItemsCache = getState().shop.itemsCacheArr;
  if (JSON.stringify(searchParams) === JSON.stringify(lastSearchParams) && storeItemsCache.length > 0) {
    return;
  }
  let { page, ...queryParams } = searchParams;
  let { page: lastPage, ...lastQueryParams } = lastSearchParams;
  page = +page;
  lastPage = +lastPage;
  const pageLimit = +searchParams.limit;
  try {
    //clear cache if any params change except the page
    if (JSON.stringify(queryParams) !== JSON.stringify(lastQueryParams)) {
      storeItemsCache = [];
    }
    dispatch(fetchShopItemsStart());
    //try and get current page items from cache
    let fetchedItems = storeItemsCache.slice(page * pageLimit, (page + 1) * pageLimit);
    if (fetchedItems.length <= 0 || fetchedItems.indexOf(undefined) > -1) {
      fetchedItems = [];
      //cache indexMap in shop store
      let indexMap = getState().shop.indexMap;
      if (Object.keys(indexMap).length <= 0) {
        indexMap = (await getDoc(doc(db, "itemsIndex", "indexMap"))).data();
        dispatch(setIndexMap(indexMap));
      }
      let filteredArr = Object.values(indexMap);
      //filter by name
      if (searchParams.name !== "") {
        filteredArr = filteredArr.filter((item) => item.name.toLowerCase().includes(searchParams.name.toLowerCase()));
      }
      //filter section
      if (searchParams.section !== "all") {
        filteredArr = filteredArr.filter((item) => item.section === searchParams.section);
      }
      //filter by price range min
      if (searchParams.priceMin && searchParams.priceMin !== "undefined") {
        filteredArr = filteredArr.filter((item) => item.price >= +searchParams.priceMin);
      }
      //filter by price range
      if (searchParams.priceMax && searchParams.priceMax !== "undefined") {
        filteredArr = filteredArr.filter((item) => item.price <= +searchParams.priceMax);
      }
      if (searchParams.ratingMin) {
        filteredArr = filteredArr.filter((item) => item.ratingAvg >= +searchParams.ratingMin);
      }
      //sort order
      const asc = searchParams.asc === "asc" ? 1 : -1;
      const orderKey = searchParams.orderBy;
      filteredArr.sort((a, b) => (a[orderKey] < b[orderKey] ? -asc : asc));
      const filteredIds = filteredArr.map((item) => item.id);
      dispatch(setSearchResults(filteredIds.length));
      //fill cache with undefined in case shop was mounted with page > 0
      if (storeItemsCache.length < page * pageLimit) {
        storeItemsCache = [...filteredIds.slice(0, page * pageLimit)].fill(undefined);
      }
      //do multiple fetches for pageLimit > 10
      for (let i = 0; i < pageLimit; i = i + 10) {
        const fetchLimit = Math.min(pageLimit - i, 10);
        const idsToFetch = filteredIds.slice(page * pageLimit + i, page * pageLimit + i + fetchLimit);
        if (idsToFetch.length > 0) {
          const itemsColRef = collection(db, "items");
          const q = query(itemsColRef, where("id", "in", idsToFetch), orderBy(searchParams.orderBy, searchParams.asc));
          const itemDocs = (await getDocs(q)).docs;
          fetchedItems = fetchedItems.concat(itemDocs.map((doc) => doc.data()));
        }
      }
      storeItemsCache.splice(page * pageLimit, pageLimit, ...fetchedItems);
      dispatch(setItemsCache([...storeItemsCache]));
    }
    dispatch(setSearchParams(searchParams));
    dispatch(fetchShopItemsSuccess(fetchedItems));
  } catch (error) {
    console.error("error in fetchShopItems", error);
    dispatch(fetchShopItemsFailed(error.message));
  }
};

export const fetchShopItemById = (itemId) => async (dispatch, getState) => {
  try {
    dispatch(fetchShopItemsStart());
    const itemRef = doc(db, "items", itemId);
    const itemDoc = await getDoc(itemRef);
    if (itemDoc.exists()) {
      const item = itemDoc.data();
      dispatch(fetchShopItemsSuccess([item]));
    } else {
      dispatch(fetchShopItemsFailed("no item found for id:", itemId));
    }
  } catch (error) {
    console.error("failed to fetchShopItemById,error:", error);
    dispatch(fetchShopItemsFailed(error.message));
  }
};
