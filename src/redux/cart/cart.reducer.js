import CartActionTypes from "./cart.types.js";

const INITIAL_STATE = {
  hidden: true,
  cartItemIds: null,
};
//store cart items as an object with each item being a prop generated from id and size and count as value
const getKey = (id, size) => {
  return id + "-" + size;
};
const addItem = ({ id, size }, state) => {
  const key = getKey(id, size);
  const newItems = { ...state.cartItemIds };
  newItems[key] = newItems[key] ? newItems[key] + 1 : 1;
  return newItems;
};
const clearItem = ({ id, size }, state) => {
  const key = getKey(id, size);
  const newItems = { ...state.cartItemIds };
  console.log('clearing item',{key},newItems)
  delete newItems[key];
  console.log(newItems);
  return newItems;
};
const removeItem = ({ id, size }, state) => {
  const key = getKey(id, size);
  const newItems = { ...state.cartItemIds };
  newItems[key] = newItems[key] ? newItems[key] - 1 : 0;
  if (newItems[key] === 0) {
    delete newItems[key];
  }
  return newItems;
};
const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.SET_CART_HIDDEN:
      return {
        ...state,
        hidden: action.payload,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItemIds: addItem(action.payload, state),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      console.log('cart reducer clear item')
      return {
        ...state,
        cartItemIds: clearItem(action.payload, state),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItemIds: removeItem(action.payload, state),
      };
    default:
      return state;
  }
};

export default cartReducer;
