import { createSelector } from "reselect";

const selectId = (_, id) => id;
export const selectReviews = (state) => state.reviews.reviewsArr;
export const selectUserReviewd = (state) => state.reviews.didUserReview;
export const selectAreReviewsFetching = (state) => state.reviews.isFetching;
export const selectIsReviewSubmiting = (state) => state.reviews.isSubmiting;
