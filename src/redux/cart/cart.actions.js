import CartActionTypes from './cart.types.js';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addCartItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const removeCartItem = item =>({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
})

export const incrementItemQuant = item =>({
  type: CartActionTypes.INCREMENT_QUANTITY,
  payload: item
})

export const decrementItemQuant = item =>({
  type: CartActionTypes.DECREMENT_QUANTITY,
  payload: item
})