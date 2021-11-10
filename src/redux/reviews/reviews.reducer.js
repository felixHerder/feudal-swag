import ReviewsActionTypes from "./reviews.types";
const initialState = {
  reviewsMap: null,
  isFetching: false,
  error: false,
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ReviewsActionTypes.UPDATE_REVIEWS_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case ReviewsActionTypes.UPDATE_REVIEWS_SUCCESS:
      return {
        ...state,
        reviewsMap: { ...state.reviewsMap, ...action.payload },
        isFetching: false,
        error: false,
      };
    case ReviewsActionTypes.UPDATE_REVIEWS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
