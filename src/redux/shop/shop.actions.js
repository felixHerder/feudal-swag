import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import ShopActionTypes from "./shop.types";
import { db } from "../../firebase/firebase.utils";

const fetchShopItemsStart = () => ({ type: ShopActionTypes.FETCH_ITEMS_START });
const fetchShopItemsFailed = (error = {}) => ({ type: ShopActionTypes.FETCH_ITEMS_FAILED, payload: error });
const fetchShopItemsSuccess = (payload) => ({ type: ShopActionTypes.FETCH_ITEMS_SUCCESS, payload: payload });

const fetchShopSectionsStart = () => ({ type: ShopActionTypes.FETCH_SECTIONS_START });
const fetchShopSectionsFailed = (error = {}) => ({ type: ShopActionTypes.FETCH_SECTIONS_FAILED, payload: error });
const fetchShopSectionsSuccess = (payload) => ({ type: ShopActionTypes.FETCH_SECTIONS_SUCCESS, payload: payload });

export const fetchShopItemsBySection =
  (section, itemCount = 999, itemSkip = 0) =>
  async (dispatch, getState) => {
    dispatch(fetchShopItemsStart());
    try {
      let sections = getState().shop.sections;
      //fetch sections if null in store
      if (!sections || !Object.keys(sections).length) {
        dispatch(fetchShopSectionsStart());
        sections = {};
        const sectionDocs = (await getDocs(await collection(db, "sections"))).docs;
        sectionDocs.forEach((doc) => {
          sections[doc.id] = doc.data().itemIds;
        });
        dispatch(fetchShopSectionsSuccess(sections));
      }
      const idsToFetch = sections[section];
      let items = { ...getState().shop.items };
      for (let i = itemSkip; i < idsToFetch.length && i < itemCount; i++) {
        const id = idsToFetch[i];
        //fetch items only if  specific item is not found in store
        if (!items[id]) {
          console.log("fetchShopItemsBySection item:", id);
          const itemDoc = (await getDoc(doc(db, "items", id.toString()))).data();
          items[id] = itemDoc;
        }
      }
      dispatch(fetchShopItemsSuccess(items));
    } catch (error) {
      console.error("failed to fetchShopItemsBySection,error:", error);
      dispatch(fetchShopItemsFailed(error));
    }
  };

export const fetchShopItemsByIds = (idsToFetch) => async (dispatch, getState) => {
  try {
    let items = getState().shop.items || {};
    if (idsToFetch) {
      //fetch items only if  specific item is not found in store
      const newItems = {};
      for (const id of idsToFetch) {
        if (!items[id]) {
          if (Object.keys(newItems).length === 1) {
            dispatch(fetchShopItemsStart());
          }
          console.log("fetchShopItemsByIds item", id);
          const itemDoc = (await getDoc(doc(db, "items", id.toString()))).data();
          newItems[id] = itemDoc;
        }
      }
      if (Object.keys(newItems).length) {
        items = { ...items, ...newItems };
      }
    }
    dispatch(fetchShopItemsSuccess(items));
  } catch (error) {
    console.error("failed to fetchShopItemsByIds,error:", error);
    dispatch(fetchShopItemsFailed(error.message));
  }
};

export const fetchShopSections = () => async (dispatch, getState) => {
  try {
    let sections = getState().shop.sections;
    //fetch sections if null in store
    if (!sections || !Object.keys(sections).length) {
      dispatch(fetchShopSectionsStart());
      sections = {};
      const sectionDocs = (await getDocs(await collection(db, "sections"))).docs;
      sectionDocs.forEach((doc) => {
        sections[doc.id] = doc.data().itemIds;
      });
      dispatch(fetchShopSectionsSuccess(sections));
    }
  } catch (error) {
    console.error("failed to fetchShopSections,error:", error);
    dispatch(fetchShopSectionsFailed(error));
  }
};
