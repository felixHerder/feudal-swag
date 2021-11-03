import CartActionTypes from './cart.types.js';

export const setCartHidden = (hidden) => ({
  type: CartActionTypes.SET_CART_HIDDEN,
  payload:hidden
});

export const addCartItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const clearItemFromCart = item =>({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});

export const removeItem = item =>({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});
