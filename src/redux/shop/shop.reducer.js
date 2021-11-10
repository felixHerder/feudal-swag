import ShopActionTypes from "./shop.types";
// import {itemsMap,sectionsMap} from "../../firebase/mockDb.js"
const INITIAL_STATE = {
  itemsArr: null,
  itemsCacheArr: null,
  isFetching: false,
  error: false,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_ITEMS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        itemsArr: action.payload,
        isFetching: false,
        error: false,
      };
    case ShopActionTypes.FETCH_ITEMS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
      case ShopActionTypes.SET_ITEMS_CACHE:
        return {
          ...state,
          itemsCacheArr: action.payload,
        };
    default:
      return state;
  }
};

export default shopReducer;
