import { createSelector } from "reselect";

const selectCartItems = (state) => state.cart.cartItems || {} ;
const selectShopItems = (state) => state.shop.items || {};

export const selectCartItemsFromShop = createSelector([selectCartItems, selectShopItems], (cartItems, shopItems) =>
  Object.keys(cartItems).map((item) => {
    const [id, sizeId] = item.split("-");
    return { ...shopItems[id], sizeId, count: cartItems[item] };
  })
);

export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) => Object.values(cartItems).reduce((total, item) => total + item, 0));
export const selectCartTotal = createSelector([selectCartItems], (cartItems) => cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0));
