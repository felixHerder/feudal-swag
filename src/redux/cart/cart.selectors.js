import {createSelector} from 'reselect'

const selectCart = state => state.cart;

const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((acc,item)=>acc +item.quantity,0)

);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((acc,item)=>
  acc + (item.quantity * item.price),0)
);