import { createSelector } from "reselect";

export const selectId = (state, id) => id;
export const selectItems = (state) => state.shop.items;
export const selectSections = (state) => state.shop.sections;
export const selectItemsBySection = createSelector(
  [selectItems, selectSections, selectId],
  (items, sections, sectionId) => sections && sections[sectionId].map((id) => items && items[id])
);
