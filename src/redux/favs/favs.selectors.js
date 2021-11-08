import { createSelector } from "reselect";

const selectId = (state, id) => id;
const selectShopItems = (state) => state.shop.items;
export const selectFavsItemIds = (state) => state.favs.favsItemIds;
export const selectAreFavsLoading = (state) => state.favs.isFetching;
export const selectFavsItemIdsArr = createSelector(
  [selectFavsItemIds],
  (favsItemIds) => favsItemIds && Object.keys(favsItemIds)
);
export const selectFavsItems = createSelector(
  [selectShopItems, selectFavsItemIdsArr],
  (shopItemsMap, favsItemsIdsArr) => favsItemsIdsArr && favsItemsIdsArr.map((favItemId) => shopItemsMap[favItemId])
);

export const selectIsItemFav = createSelector([selectFavsItemIds, selectId], (favsItemIds, itemId) => {
  return favsItemIds && (favsItemIds[itemId] || false);
});

export const makeSelectIsItemFav = (itemId) => createSelector([selectFavsItemIds], (favsItemIds) => {
  return favsItemIds && (favsItemIds[itemId] || false);
});;
