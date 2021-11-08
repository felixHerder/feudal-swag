import FavsActionTypes from "./favs.types";
const initialState = {
  favsItemIds: null,
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
        favsItemIds: action.payload,
        isFetching: false,
        error: false,
      };
    case FavsActionTypes.UPDATE_FAVS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default favsReducer;
