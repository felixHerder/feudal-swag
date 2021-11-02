import armorData from "./armorData.js";
const sectionsArr = Object.keys(armorData);
let itemId = 0;
export let sectionsMap = {};
export let itemsMap = {};
for (const sectionName of sectionsArr) {
  let sectionIds = [];
  for (const item of armorData[sectionName]) {
    itemsMap[itemId] = {...item,id:itemId,section:sectionName};
    sectionIds.push(itemId);
    itemId++;
  }
  sectionsMap[sectionName] = sectionIds;
}

