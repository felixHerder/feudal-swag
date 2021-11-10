import { createSelector } from "reselect";

const selectId = (_, id) => id;
const selectReviews = (state) => state.reviews.reviewsMap;
export const selectIsReviewLoading = (state) => state.reviews.isFetching;
export const selectReviewById = createSelector([selectReviews, selectId], (reviewsMap, id) => reviewsMap && reviewsMap[id]);
