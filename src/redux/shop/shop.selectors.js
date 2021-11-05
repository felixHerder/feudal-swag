import { createSelector } from "reselect";

const selectId = (state, id) => id;
export const selectIsFetchingItems = (state) => state.shop.isFetchingItems[0];
export const selectItems = (state) => state.shop.items;
export const selectSections = (state) => state.shop.sections;
export const selectItemIdsBySection = createSelector([selectSections, selectId], (sections, id) => sections && sections[id]);

export const selectItemsBySection = createSelector([selectItems, selectSections, selectId], (items, sections, sectionId) => {
  return sections && sections[sectionId] && sections[sectionId].map((id) => items && items[id]);
});

export const makeSelectItemsBySection = () =>
  createSelector([selectItems, selectSections, selectId], (items, sections, sectionId) => sections && sections[sectionId].map((id) => items && items[id]));
