import ShopActionTypes from "./shop.types";
// import {itemsMap,sectionsMap} from "../../firebase/mockDb.js"
const INITIAL_STATE = {
  items: null,
  sections: null,
  isFetchingItems: [],
  isFetchingSections: false,
  error: false,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_ITEMS_START:
      return {
        ...state,
        isFetchingItems: [...state.isFetchingItems,true],
      };
    case ShopActionTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: {...state.items,...action.payload},
        isFetchingItems: [...state.isFetchingItems.slice(0,-1)],
        error: false,
      };
    case ShopActionTypes.FETCH_ITEMS_FAILED:
      return {
        ...state,
        isFetchingItems: false,
        error: action.payload,
      };
    case ShopActionTypes.FETCH_SECTIONS_START:
      return {
        ...state,
        isFetchingSections: true,
      };
    case ShopActionTypes.FETCH_SECTIONS_SUCCESS:
      return {
        ...state,
        sections:action.payload,
        isFetchingSections: false,
        error: false,
      };
    case ShopActionTypes.FETCH_SECTIONS_FAILED:
      return {
        ...state,
        isFetchingSections: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
