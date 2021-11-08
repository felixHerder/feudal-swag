import { createSelector } from "reselect";

const selectId = (state, id) => id;
export const selectIsFetchingItems = (state) => state.shop.isFetchingItems[0];
export const selectIsFetchingSections = (state) => state.shop.isFetchingSections;
export const selectItems = (state) => state.shop.items;
export const selectSections = (state) => state.shop.sections;

export const selectItemIdsBySection = createSelector(
  [selectSections, selectId],
  (sections, id) => sections && sections[id]
);

export const makeSelectItemIdsBySection = (id) =>
  createSelector([selectSections], (sections) => sections && sections[id]);

export const selectItemById = createSelector([selectItems, selectId], (items, id) => items && items[id]);

export const selectItemsBySection = createSelector(
  [selectItems, selectSections, selectId],
  (items, sections, sectionId) => {
    return sections && sections[sectionId] && sections[sectionId].map((id) => items && items[id]);
  }
);

export const selectItemsByIds = createSelector(
  [selectItems, (_, ids) => ids],
  (items, ids) => ids && ids.map((id) => items && items[id])
);

export const makeSelectItemsBySection = (sectionId) =>
  createSelector([selectItems, selectSections], (items, sections) => {
    return sections && sections[sectionId] && sections[sectionId].map((id) => items && items[id]);
  });

export const selectFirstNItemsBySection = createSelector(
  [selectItems, selectSections, (_, n) => n],
  (shoptItems, shopSections, n = 3) =>
    shopSections &&
    Object.keys(shopSections).map((key) => ({
      section: key,
      items: shopSections[key].slice(0, n).map((id) => shoptItems && shoptItems[id]),
    }))
);
