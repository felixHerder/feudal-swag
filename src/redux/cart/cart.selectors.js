import { createSelector } from "reselect";

const selectCartItems = (state) => state.cart.cartItemIds;
const selectShopItems = (state) => state.shop.items;

export const selectCartItemsFromShop = createSelector(
  [selectCartItems, selectShopItems],
  (cartItemIds, shopItems) =>
    cartItemIds &&
    shopItems &&
    Object.keys(cartItemIds).map((item) => {
      const [id, sizeId] = item.split("-");
      return shopItems[id] && { ...shopItems[id], sizeId, count: cartItemIds[item] };
    })
);

export const selectCartItemsCount = createSelector([selectCartItems], (cartItemIds) =>
  cartItemIds ? Object.values(cartItemIds).reduce((total, item) => total + item, 0) : 0
);
export const selectCartTotal = createSelector([selectCartItemsFromShop], (cartItems) =>
  cartItems ? cartItems.reduce((acc, item) => item ? acc + item.price * item.count : acc, 0) : 0
);
export const selectCartItemIds = createSelector(
  [selectCartItems],
  (cartItemIds) =>
    cartItemIds &&
    Object.keys(cartItemIds).map((item) => {
      const [id] = item.split("-");
      return id;
    })
);
