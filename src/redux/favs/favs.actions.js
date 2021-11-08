import FavsActionTypes from "./favs.types";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";
import { fetchShopItemsByIds } from "../shop/shop.actions";
//actions
const updateFavsStart = () => ({ type: FavsActionTypes.UPDATE_FAVS_START });
const updateFavsSuccess = (favItemIds) => ({ type: FavsActionTypes.UPDATE_FAVS_SUCCESS, payload: favItemIds });
const updateFavsFail = (error) => ({ type: FavsActionTypes.UPDATE_FAVS_SUCCESS, payload: error });

const updateUserFavsItems = async (uid, newFavsIds) => {
  const userRef = doc(db, `users/${uid}`);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    await setDoc(userRef, { ...userData, favsItemIds: newFavsIds }, { merge: false });
  }
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
    }
    dispatch(updateFavsSuccess(newFavsIds));
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
    }
    dispatch(updateFavsSuccess(newFavsIds));
  } catch (error) {
    console.error("error in addItemToFavs", error);
    dispatch(updateFavsFail(error.message));
  }
};

export const updateFavsFromDb = (uid) => async (dispatch) => {
  dispatch(updateFavsStart());
  try {
    //get favsItemIds from firestore db
    const userRef = doc(db, `users/${uid}`);
    const userSnapshot = await getDoc(userRef);
    let favsItemIds = [];
    if (userSnapshot.exists()) {
      favsItemIds = userSnapshot.data().favsItemIds || [];
      //update items in shop
      const idsToFetch = Object.keys(favsItemIds);
      if (idsToFetch) {
        dispatch(fetchShopItemsByIds(idsToFetch));
      }
    }
    //update cart in store
    dispatch(updateFavsSuccess(favsItemIds));
  } catch (error) {
    console.error("error in updateFavsFromDb:", error);
    dispatch(updateFavsFail(error.message));
  }
};
