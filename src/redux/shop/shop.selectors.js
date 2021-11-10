import { createSelector } from "reselect";

const selectId = (state, id) => id;
export const selectItems = (state) => state.shop.itemsArr;
export const selectIsFetchingItems = (state) => state.shop.isFetching;



