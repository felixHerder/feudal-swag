import ReviewsActionTypes from "./reviews.types";
import { doc, getDoc, getDocs, query, limit, collection, startAfter, orderBy, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";
import { clearStoreItems } from "../shop/shop.actions";
//actions
const fetchReviewsStart = () => ({ type: ReviewsActionTypes.FETCH_REVIEWS_START });
const fetchMoreReviewsStart = () => ({ type: ReviewsActionTypes.FETCH_MORE_REVIEWS_START });
const fetchReviewsSuccess = (reviews) => ({ type: ReviewsActionTypes.FETCH_REVIEWS_SUCCESS, payload: reviews });
const fetchReviewsFail = (error) => ({ type: ReviewsActionTypes.FETCH_REVIEWS_FAIL, payload: error });
const setUserReviewed = (payload) => ({ type: ReviewsActionTypes.DID_USER_REVIEW, payload });
const setFetchParams = (payload) => ({ type: ReviewsActionTypes.SET_FETCH_PARAMS, payload });
const submitReviewStart = () => ({ type: ReviewsActionTypes.SUBMIT_REVIEW_START });
const submitReviewSuccess = () => ({ type: ReviewsActionTypes.SUBMIT_REVIEW_SUCCESS });
const submitReviewFail = (error) => ({ type: ReviewsActionTypes.SUBMIT_REVIEW_FAIL, payload: error });
export const clearStoreReviews = () => ({ type: ReviewsActionTypes.CLEAR_REVIEWS });

export const fetchReviewsById = (fetchParams) => async (dispatch, getState) => {
  const newFetchParams = { ...getState().reviews.fetchParams, ...fetchParams };
  const { itemId, countToLoad, sort, by } = newFetchParams;
  try {
    dispatch(fetchReviewsStart());
    const reviewsRef = collection(db, "reviews", itemId, "reviews");
    const queryConstraints = [];
    queryConstraints.push(orderBy(sort, by));
    queryConstraints.push(limit(countToLoad));
    const q = query(reviewsRef, ...queryConstraints);
    const reviewDocs = (await getDocs(q)).docs;
    const fetchedReviews = reviewDocs.map((r) => r.data());
    dispatch(setFetchParams(newFetchParams));
    dispatch(fetchReviewsSuccess(fetchedReviews));
  } catch (error) {
    console.error("error in fetchReviewsById:", error);
    dispatch(fetchReviewsFail(error.message));
  }
};
export const fetchMoreReviewsById = (fetchParams) => async (dispatch, getState) => {
  const newFetchParams = { ...getState().reviews.fetchParams, ...fetchParams };
  const { itemId, countToLoad, sort, by } = newFetchParams;
  try {
    dispatch(fetchMoreReviewsStart());
    let storeReviews = getState().reviews.reviewsArr;
    const reviewsRef = collection(db, "reviews", itemId, "reviews");
    const queryConstraints = [];
    queryConstraints.push(orderBy(sort, by));
    if (storeReviews.length > 0) {
      const lastReview = storeReviews[storeReviews.length - 1];
      const reviewRef = doc(db, "reviews", itemId, "reviews", lastReview.id);
      const reviewDoc = await getDoc(reviewRef);
      if (reviewDoc.exists()) {
        queryConstraints.push(startAfter(reviewDoc));
      } else {
        throw new Error("last doc in store reviews doesn't exist in firestore");
      }
    } else {
      throw new Error("empty store reviews");
    }
    queryConstraints.push(limit(countToLoad - storeReviews.length));
    const q = query(reviewsRef, ...queryConstraints);
    const reviewDocs = (await getDocs(q)).docs;
    const fetchedReviews = reviewDocs.map((r) => r.data());
    dispatch(setFetchParams(newFetchParams));
    dispatch(fetchReviewsSuccess([...storeReviews, ...fetchedReviews]));
  } catch (error) {
    console.error("error in fetchMoreReviewsById:", error);
    dispatch(fetchReviewsFail(error.message));
  }
};

export const fetchUserReviewed = (itemId, userId) => async (dispatch) => {
  try {
    const reviewsColRef = collection(db, "reviews", itemId, "reviews");
    const reviewDoc = await getDoc(doc(reviewsColRef, userId));
    if (reviewDoc.exists()) {
      dispatch(setUserReviewed(true));
    } else {
      dispatch(setUserReviewed(false));
    }
  } catch (error) {
    console.error("error in fetchUserReviewed:", error.message);
  }
};

export const submitReview = (itemId, rating, comment, userId, userName) => async (dispatch, getState) => {
  try {
    dispatch(submitReviewStart());
    const reviewsColRef = collection(db, "reviews", itemId, "reviews");
    const reviewDoc = await getDoc(doc(reviewsColRef, userId));
    if (reviewDoc.exists()) {
      throw new Error("user allready reviewd item: " + itemId);
    }
    await setDoc(doc(reviewsColRef, userId), { rating, comment, id: userId, name: userName, date: new Date() });
    dispatch(fetchReviewsById({ itemId }));
    dispatch(setUserReviewed(true));
    dispatch(submitReviewSuccess());
    await updateItemRating(itemId);
    dispatch(clearStoreItems());
  } catch (error) {
    console.error("error in submitReview:", error.message);
    dispatch(submitReviewFail(error.message));
  }
};

export const deleteReview = (itemId, userId) => async (dispatch, getState) => {
  try {
    dispatch(submitReviewStart());
    const reviewsColRef = collection(db, "reviews", itemId, "reviews");
    const reviewDoc = await getDoc(doc(reviewsColRef, userId));
    if (!reviewDoc.exists()) {
      dispatch(submitReviewFail("review does not exist for user:", userId));
      return;
    }
    await deleteDoc(doc(reviewsColRef, userId));
    dispatch(fetchReviewsById({ itemId }));
    dispatch(setUserReviewed(false));
    dispatch(submitReviewSuccess());
    await updateItemRating(itemId);
    dispatch(clearStoreItems());
  } catch (error) {
    console.error("error in deleteReview:", error.message);
    dispatch(submitReviewFail(error.message));
  }
};

const updateItemRating = async (itemId) => {
  try {
    //recalc item avg rating
    const reviewsColRef = collection(db, "reviews", itemId, "reviews");
    const newReviewDocs = (await getDocs(reviewsColRef)).docs;
    const newRatingSum = newReviewDocs.reduce((sum, doc) => sum + doc.data().rating, 0);
    const newReviewCount = newReviewDocs.length;
    const newRatingAvg = newRatingSum / newReviewCount;
    const itemRef = doc(db, "items", itemId);
    await setDoc(itemRef, { ratingAvg: newRatingAvg, reviewCount: newReviewCount }, { merge: true });
  } catch (error) {
    console.error("error in updateItemRating:", error.message);
  }
};
