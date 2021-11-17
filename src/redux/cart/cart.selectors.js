import { createSelector } from "reselect";

const selectId = (_, id) => id;
export const selectIsCartHidden = (state) => state.cart.hidden;
export const selectIsCartLoading = (state) => state.cart.isFetching;

export const selectCartItemIds = (state) => state.cart.cartItemIds;
export const selectCartItemIdsArr = createSelector([selectCartItemIds], (cartItemIds) => Object.keys(cartItemIds));

export const selectCartItems = (state) => state.cart.cartItemsCache;
export const selectCartItemsArr = createSelector([selectCartItems], (cartItems) => cartItems && Object.values(cartItems));

export const selectCartItemsCount = createSelector([selectCartItemIds], (cartItemIds) =>
  cartItemIds ? Object.values(cartItemIds).reduce((total, item) => total + item, 0) : 0
);

export const selectCartTotal = createSelector([selectCartItemsArr], (cartItems) =>
  cartItems ? cartItems.reduce((acc, item) => (item ? acc + item.price * item.count : acc), 0) : 0
);

export const selectIsItemInCart = createSelector([selectCartItemIdsArr, selectId], (cartItemIds, itemId) => {
  const found = cartItemIds && cartItemIds.find((id) => id.slice("-")[0] === itemId);
  
  return found ? true : false;
});

export const makeSelectIsItemInCart = (itemId) =>
  createSelector([selectCartItemIdsArr], (cartItemIds) => {
    const found = cartItemIds && cartItemIds.find((id) => id.split("-")[0] === itemId.toString());
    return found ? true : false;
  });
