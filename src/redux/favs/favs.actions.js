import FavsActionTypes from "./favs.types";
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";
//actions
const updateFavsStart = () => ({ type: FavsActionTypes.UPDATE_FAVS_START });
const updateFavsSuccess = () => ({ type: FavsActionTypes.UPDATE_FAVS_SUCCESS });
const updateFavsFail = (error) => ({ type: FavsActionTypes.UPDATE_FAVS_SUCCESS, payload: error });
const fetchFavsItemsStart = () => ({ type: FavsActionTypes.FETCH_FAVSITEMS_START });
const fetchFavsItemsSuccess = (favItemIds) => ({ type: FavsActionTypes.FETCH_FAVSITEMS_SUCCESS, payload: favItemIds });
const fetchFavsItemsFail = (error) => ({ type: FavsActionTypes.FETCH_FAVSITEMS_SUCCESS, payload: error });
const setFavsIds = (favItemIds) => ({ type: FavsActionTypes.SET_FAVS_IDS, payload: favItemIds });
// const setFavsItems = (favsItems) => ({ type: FavsActionTypes.SET_FAVS_ITEMS, payload: favsItems });

const updateUserFavsItems = async (uid, newFavsIds) => {
  const userRef = doc(db, `users/${uid}`);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    await setDoc(userRef, { ...userData, favsItemIds: newFavsIds }, { merge: false });
  } else {
    throw new Error("no userDoc found");
  }
};

export const setFavsFromUser = () => (dispatch, getState) => {
  dispatch(setFavsIds(getState().user.currentUser.favsItemIds || {}));
};

//thunks
export const addItemToFavs = (itemId) => async (dispatch, getState) => {
  dispatch(updateFavsStart());
  try {
    const { favs, user } = getState();
    const newFavsIds = { ...favs.favsItemIds };
    newFavsIds[itemId] = true;
    if (user.currentUser) {
      await updateUserFavsItems(user.currentUser.uid, newFavsIds);
      dispatch(updateFavsSuccess());
    } else {
      throw new Error("no user signed in");
    }
  } catch (error) {
    console.error("error in addItemToFavs", error);
    dispatch(updateFavsFail(error.message));
  }
};

export const removeItemFromFavs = (itemId) => async (dispatch, getState) => {
  dispatch(updateFavsStart());
  try {
    const { favs, user } = getState();
    const newFavsIds = { ...favs.favsItemIds };
    delete newFavsIds[itemId];
    if (user.currentUser) {
      await updateUserFavsItems(user.currentUser.uid, newFavsIds);
      dispatch(updateFavsSuccess());
    } else {
      throw new Error("no user signed in");
    }
  } catch (error) {
    console.error("error in removeItemFromFavs", error);
    dispatch(updateFavsFail(error.message));
  }
};

export const fetchFavsItems = () => async (dispatch, getState) => {
  dispatch(fetchFavsItemsStart());
  try {
    const favsItemsCache = { ...getState().favs.favsItemsCache };
    const favsItemsCacheArr = Object.keys(favsItemsCache);
    const favsItemIdsArr = Object.keys(getState().favs.favsItemIds);
    //fetch only items not present in cache
    const favsItemIdsArrFiltered = favsItemIdsArr.filter((id) => favsItemsCacheArr.indexOf(id) === -1);
    //delete items from cache that are not present in user favs
    favsItemsCacheArr.forEach((id) => favsItemIdsArr.indexOf(id) === -1 && delete favsItemsCache[id]);
    const itemsColRef = collection(db, "items");
    const favsItems = {};
    for (let i = 0; i < favsItemIdsArrFiltered.length; i += 10) {
      const idsToFetch = favsItemIdsArrFiltered.slice(i, i + 10);
      const q = query(itemsColRef, where("id", "in", idsToFetch));
      const itemDocs = (await getDocs(q)).docs;
      itemDocs.forEach((doc) => (favsItems[doc.id] = doc.data()));
    }
    dispatch(fetchFavsItemsSuccess({ ...favsItemsCache, ...favsItems }));
  } catch (error) {
    console.error("error in fetchFavsItems", error);
    dispatch(fetchFavsItemsFail(error.message));
  }
};
