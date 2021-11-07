import CartActionTypes from "./cart.types.js";
import { db } from "../../firebase/firebase.utils";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { fetchShopItemsByIds } from "../shop/shop.actions.js";

export const setCartHidden = (hidden) => ({
  type: CartActionTypes.SET_CART_HIDDEN,
  payload: hidden,
});

const updateCartStart = () => ({ type: CartActionTypes.UPDATE_CART_START });
const updateCartSuccess = (cartItems) => ({ type: CartActionTypes.UPDATE_CART_SUCCESS, payload: cartItems });
const updateCartFail = (error) => ({ type: CartActionTypes.UPDATE_CART_SUCCESS, payload: error });

//store cart items as an object with each item having a key generated from itemId and sizeIdId (each items stores a sizes Array)
const getKey = (itemId, sizeId) => {
  return itemId + "-" + sizeId;
};

export const updateCartFromDb = (uid) => async (dispatch) => {
  dispatch(updateCartStart());
  try {
    //get cartItemIds from firestore db
    const userRef = doc(db, `users/${uid}`);
    const userSnapshot = await getDoc(userRef);
    let cartItemIds = [];
    if (userSnapshot.exists()) {
      cartItemIds = userSnapshot.data().cartItemIds || [];
      //update items in shop
      const idsToFetch = Object.keys(cartItemIds).map((id) => id.split("-")[0]);
      if (idsToFetch) {
        dispatch(fetchShopItemsByIds(idsToFetch));
      }
    }
    //update cart in store
    dispatch(updateCartSuccess(cartItemIds));
  } catch (error) {
    console.error("error in updateCart:", error);
    dispatch(updateCartFail(error.message));
  }
};

const updateUserCartItems = async (uid, newItemIds) => {
  const userRef = doc(db, `users/${uid}`);
  await setDoc(userRef, { cartItemIds: newItemIds }, { merge: true });
};

export const addItemToCart =
  ({ itemId, sizeId }) =>
  async (dispatch, getState) => {
    dispatch(updateCartStart());
    try {
      const {
        cart,
        user: { currentUser },
      } = getState();
      //generate new item ids map
      const key = getKey(itemId, sizeId);
      const newItemIds = { ...cart.cartItemIds };
      newItemIds[key] = newItemIds[key] ? newItemIds[key] + 1 : 1;
      //update user doc in firestore db
      if (currentUser) {
        await updateUserCartItems(currentUser.uid, newItemIds);
      }
      //update store
      dispatch(updateCartSuccess(newItemIds));
    } catch (error) {
      console.error("error in addItemToCart:", error);
      dispatch(updateCartFail(error.message));
    }
  };
export const clearItemFromCart =
  ({ itemId, sizeId }) =>
  async (dispatch, getState) => {
    dispatch(updateCartStart());
    try {
      const {
        cart,
        user: { currentUser },
      } = getState();
      //generate new item ids map
      const key = getKey(itemId, sizeId);
      const newItemIds = { ...cart.cartItemIds };
      delete newItemIds[key];
      //update user doc in firestore db
      if (currentUser) {
        await updateUserCartItems(currentUser.uid, newItemIds);
      }
      //update store
      dispatch(updateCartSuccess(newItemIds));
    } catch (error) {
      console.error("error in addItemToCart:", error);
      dispatch(updateCartFail(error.message));
    }
  };
export const removeItemFromCart =
  ({ itemId, sizeId }) =>
  async (dispatch, getState) => {
    dispatch(updateCartStart());
    try {
      const {
        cart,
        user: { currentUser },
      } = getState();
      //generate new item ids map
      const key = getKey(itemId, sizeId);
      const newItemIds = { ...cart.cartItemIds };
      newItemIds[key] = newItemIds[key] ? newItemIds[key] - 1 : 0;
      if (newItemIds[key] === 0) {
        delete newItemIds[key];
      }
      //update user doc in firestore db
      if (currentUser) {
        await updateUserCartItems(currentUser.uid, newItemIds);
      }
      //update store
      dispatch(updateCartSuccess(newItemIds));
    } catch (error) {
      console.error("error in addItemToCart:", error);
      dispatch(updateCartFail(error.message));
    }
  };
