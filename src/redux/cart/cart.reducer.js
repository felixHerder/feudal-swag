import CartActionTypes from "./cart.types.js";

const INITIAL_STATE = {
  hidden: true,
  cartItemIds: {},
  cartItemsCache: {},
  isFetching: false,
  error: false,
};
const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case CartActionTypes.FETCH_CARTITEMS_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case CartActionTypes.FETCH_CARTITEMS_SUCCESS:
      return {
        ...state,
        cartItemsCache: action.payload,
        isFetching: false,
        error: false,
      };
    case CartActionTypes.FETCH_CARTITEMS_FAIL:
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
    case CartActionTypes.SET_CART_HIDDEN:
      return {
        ...state,
        hidden: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
