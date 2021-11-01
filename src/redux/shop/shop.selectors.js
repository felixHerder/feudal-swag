import {createSelector} from 'reselect'

const selectShop = state => state.shop;

export const selectShopItems = createSelector(
  [selectShop],
  shop => shop.items
)
export const selectShopSections = createSelector(
  [selectShop],
  shop => shop.sections
)

// export const selectCollectionsForPreview = createSelector(
//   [selectShopCollections],
//   collections => collections ? Object.values(collections) : []
// )

// export const selectCollection = collectionUrlParam =>
//  createSelector(
//   [selectShopCollections],
//   collections => collections ? collections[collectionUrlParam] : null
// );

