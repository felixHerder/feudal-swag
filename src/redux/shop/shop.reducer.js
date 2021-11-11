import ShopActionTypes from "./shop.types";
// import {itemsMap,sectionsMap} from "../../firebase/mockDb.js"
const INITIAL_STATE = {
  itemsArr: [],
  itemsCacheArr: [],
  searchParams: { limit: 6, section: "all", orderBy: "name", asc: "asc", page: -1 },
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
    case ShopActionTypes.SET_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
