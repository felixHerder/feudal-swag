import FavsActionTypes from "./favs.types";
const initialState = {
  favsItemIds: {},
  favsItemsCache: {},
  isFetching: false,
  error: false,
};

const favsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FavsActionTypes.UPDATE_FAVS_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case FavsActionTypes.UPDATE_FAVS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
      };
    case FavsActionTypes.UPDATE_FAVS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case FavsActionTypes.FETCH_FAVSITEMS_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case FavsActionTypes.FETCH_FAVSITEMS_SUCCESS:
      return {
        ...state,
        favsItemsCache: action.payload,
        isFetching: false,
        error: false,
      };
    case FavsActionTypes.FETCH_FAVSITEMS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case FavsActionTypes.SET_FAVS_IDS:
      return {
        ...state,
        favsItemIds: action.payload,
      };
    case FavsActionTypes.SET_FAVS_ITEMS:
      return {
        ...state,
        favsItemsCache: action.payload,
      };
    default:
      return state;
  }
};

export default favsReducer;
