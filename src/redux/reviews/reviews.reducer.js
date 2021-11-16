import ReviewsActionTypes from "./reviews.types";
const initialState = {
  reviewsArr: [],
  fetchParams: { itemId: 0, countToLoad: 6, sort: "date", by: "desc" },
  didUserReview: false,
  isFetching: false,
  isFetchingMore: false,
  isSubmiting: false,
  error: false,
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ReviewsActionTypes.FETCH_REVIEWS_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case ReviewsActionTypes.FETCH_MORE_REVIEWS_START:
      return {
        ...state,
        isFetchingMore: true,
        error: false,
      };
    case ReviewsActionTypes.FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        reviewsArr: action.payload,
        isFetching: false,
        isFetchingMore: false,
        error: false,
      };
    case ReviewsActionTypes.FETCH_REVIEWS_FAIL:
      return {
        ...state,
        isFetching: false,
        isFetchingMore: false,
        error: action.payload,
      };
    case ReviewsActionTypes.SUBMIT_REVIEW_START:
      return {
        ...state,
        isSubmiting: true,
        error: false,
      };
    case ReviewsActionTypes.SUBMIT_REVIEW_SUCCESS:
      return {
        ...state,
        isSubmiting: false,
        error: false,
      };
    case ReviewsActionTypes.SUBMIT_REVIEW_FAIL:
      return {
        ...state,
        isSubmiting: false,
        error: action.payload,
      };
    case ReviewsActionTypes.CLEAR_REVIEWS:
      return {
        ...state,
        reviewsArr: [],
      };
    case ReviewsActionTypes.DID_USER_REVIEW:
      return {
        ...state,
        didUserReview: action.payload,
      };
    case ReviewsActionTypes.SET_FETCH_PARAMS:
      return {
        ...state,
        fetchParams: action.payload,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
