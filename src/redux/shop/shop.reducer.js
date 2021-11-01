import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  items: null,
  sections: null,
  isFetching: true,
  error: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_DATA_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...action.payload,
        isFetching: false,
        error: null,
      };
    case ShopActionTypes.FETCH_DATA_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.paylod,
      };
    default:
      return state;
  }
};

export default shopReducer;
