import CartActionTypes from "./cart.types.js";

const INITIAL_STATE = {
  hidden: true,
  cartItemIds: [],
  isFetching: false,
  error: false,
};
const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.SET_CART_HIDDEN:
      return {
        ...state,
        hidden: action.payload,
      };
    case CartActionTypes.UPDATE_CART_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case CartActionTypes.UPDATE_CART_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
      };
    case CartActionTypes.UPDATE_CART_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case CartActionTypes.SET_CART:
      return {
        ...state,
        cartItemIds: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
