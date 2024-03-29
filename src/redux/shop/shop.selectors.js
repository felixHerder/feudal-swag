import { createSelector } from "reselect";

const selectId = (state, id) => id;
export const selectItems = (state) => state.shop.itemsArr;
export const selectSearchResults = (state) => state.shop.searchResults;
export const selectSeachParams = (state) => state.shop.searchParams;
export const selectIsFetchingItems = (state) => state.shop.isFetching;
export const selectItemById = createSelector(
  [selectItems, selectId],
  (itemsArr, id) => itemsArr && itemsArr.find((item) => item.id === id)
);
