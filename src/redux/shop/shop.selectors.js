import { createSelector } from "reselect";

const selectShop = (state) => state.shop;
export const selectSectionId = (state, sectionId) => sectionId;
export const selectItemId = (state, itemId) => itemId;

export const selectItems = createSelector([selectShop], (shop) => shop.items);
export const selectSections = createSelector([selectShop], (shop) => shop.sections);

export const selectSectionItems = createSelector([selectItems, selectSections, selectSectionId], (items, sections, sectionId) =>
  sections[sectionId].map((id) => items[id])
);
export const selectItemById = createSelector([selectItems, selectItemId], (items, itemId) => items[itemId]);
