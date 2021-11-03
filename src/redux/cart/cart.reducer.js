import CartActionTypes from "./cart.types.js";

const INITIAL_STATE = {
  hidden: true,
  cartItems: {},
};
//store cart items as an object with each item being a prop generated from id and size and count as value
const getKey = (id, size) => {
  return id + "-" + size;
};
const addItem = ({ id, size }, state) => {
  const key = getKey(id, size);
  const newItems = { ...state.cartItems };
  newItems[key] = newItems[key] ? newItems[key] + 1 : 1;
  return newItems;
};
const clearItem = ({ id, size }, state) => {
  const key = getKey(id, size);
  const newItems = { ...state.cartItems };
  delete newItems[key];
  return newItems;
};
const removeItem = ({ id, size }, state) => {
  const key = getKey(id, size);
  const newItems = { ...state.cartItems };
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
        cartItems: addItem(action.payload, state),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: clearItem(action.payload, state),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItem(action.payload, state),
      };
    default:
      return state;
  }
};

export default cartReducer;
