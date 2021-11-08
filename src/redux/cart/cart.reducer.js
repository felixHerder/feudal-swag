import CartActionTypes from "./cart.types.js";

const INITIAL_STATE = {
  hidden: true,
  cartItemIds: null,
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
        cartItemIds: action.payload,
        isFetching: false,
        error: false,
      };
    case CartActionTypes.UPDATE_CART_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
