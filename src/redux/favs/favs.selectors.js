import { createSelector } from "reselect";

const selectId = (state, id) => id;
export const selectAreFavsLoading = (state) => state.favs.isFetching;
export const selectFavsItemIds = (state) => state.favs.favsItemIds;
export const selectFavsItemIdsArr = createSelector([selectFavsItemIds], (favsItemIds) => favsItemIds && Object.keys(favsItemIds));
export const selectFavsItems = (state) => state.favs.favsItemsCache;
export const selectFavsItemsArr = createSelector([selectFavsItems], (favitems) => favitems && Object.values(favitems));

export const selectIsItemFav = createSelector([selectFavsItemIds, selectId], (favsItemIds, itemId) => {
  return favsItemIds && (favsItemIds[itemId] || false);
});

export const makeSelectIsItemFav = (itemId) =>
  createSelector([selectFavsItemIds], (favsItemIds) => {
    return favsItemIds && (favsItemIds[itemId] || false);
  });
