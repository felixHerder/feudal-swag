import ReviewsActionTypes from "./reviews.types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";
//actions
const updateReviewsStart = () => ({ type: ReviewsActionTypes.UPDATE_REVIEWS_START });
const updateReviewsSuccess = (review) => ({ type: ReviewsActionTypes.UPDATE_REVIEWS_SUCCESS, payload: review });
const updateReviewsFail = (error) => ({ type: ReviewsActionTypes.UPDATE_REVIEWS_SUCCESS, payload: error });

export const fetchReviewById = (itemId) => async (dispatch, getState) => {
  try {
    const storeReviews = getState().reviews.reviewsMap;
    if (!storeReviews || !storeReviews[itemId]) {
      dispatch(updateReviewsStart());
      const reviewDoc = await getDoc(doc(db, "reviews", itemId.toString()));
      if (reviewDoc.exists()) {
        const review = { [itemId]: reviewDoc.data() };
        console.log(review)
        dispatch(updateReviewsSuccess(review));
      } else {
        dispatch(updateReviewsFail("review Doc does not exist"));
      }
    }
  } catch (error) {
    console.error("error in updateReviewsStart:", error);
    dispatch(updateReviewsFail(error.message));
  }
};
