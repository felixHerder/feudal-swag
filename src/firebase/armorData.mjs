import { LoremIpsum } from "lorem-ipsum";
const lorem = new LoremIpsum({ sentencesPerParagraph: { max: 8, min: 4 }, wordsPerSentence: { max: 8, min: 4 } });
const randomPrice = (min, max) => {
  const rand = Math.random();
  return Math.floor(min + (max - min) * rand);
};
const randomSizes = (min, max, num) => {
  const delta = Math.ceil((max - min) / num);
  const arr = [min];
  for (let i = 1; i < num; i++) {
    arr[i] = arr[i - 1] + delta;
  }
  return arr;
};

const armorData = {
  breastplates: ["Savoy", "Hans Prunner", "Helmut", "Dark Elf", "Besancon", "Francesco", "Brunswick", "Maystetter", "Paolo", "Radziwill"].map((item, idx) => ({
    name: item,
    imgurl: `/img/heavy-armor/breastplates/breastplates_${("00" + (idx + 1)).slice(-3)}.jpg`,
    imgurlLarge: `/img/heavy-armor/breastplates/breastplates_large_${("00" + (idx + 1)).slice(-3)}.jpg`,
    price: randomPrice(800, 1600),
    description: lorem.generateParagraphs(1),
    sizes: randomSizes(60, 80, 4),
  })),
  gauntlets: ["Sigman", "Tanenberg", "Manifer", "Helmschmid", "Ulrich", "Grosschedel", "Clifford", "Lamellar", "Churburg"].map((item, idx) => ({
    name: item,
    imgurl: `/img/heavy-armor/gauntlets/gauntlets_${("00" + (idx + 1)).slice(-3)}.jpg`,
    imgurlLarge: `/img/heavy-armor/gauntlets/gauntlets_large_${("00" + (idx + 1)).slice(-3)}.jpg`,
    price: randomPrice(200, 500),
    description: lorem.generateParagraphs(1),
    sizes: randomSizes(20, 32, 5),
  })),
  greaves: ["Valencia", "Cassius", "Wayward", "Rieneck", "Olleg", "Kingsguard", "Sokol", "Assassin", "Schynbalds"].map((item, idx) => ({
    name: item,
    imgurl: `/img/heavy-armor/greaves/greaves_${("00" + (idx + 1)).slice(-3)}.jpg`,
    imgurlLarge: `/img/heavy-armor/greaves/greaves_large_${("00" + (idx + 1)).slice(-3)}.jpg`,
    price: randomPrice(150, 400),
    description: lorem.generateParagraphs(1),
    sizes: randomSizes(40, 56, 5),
  })),
  helmets: ["Stechhelm", "Morion", "Veneziana", "Burgonet", "Cabasset", "Sallet", "Armet", "Rennhut", "Morningstar", "Barbuta", "Bascinet", "Valsgarde"].map(
    (item, idx) => ({
      name: item,
      imgurl: `/img/heavy-armor/helmets/helmets_${("00" + (idx + 1)).slice(-3)}.jpg`,
      imgurlLarge: `/img/heavy-armor/helmets/helmets_large_${("00" + (idx + 1)).slice(-3)}.jpg`,
      price: randomPrice(300, 600),
      description: lorem.generateParagraphs(1),
      sizes: randomSizes(20, 36, 4),
    })
  ),
  sabatons: ["Kigmaker", "Gothic", "Paladin", "Morningstar", "Scudamore", "Cuisse", "Titanium", "Anato"].map((item, idx) => ({
    name: item,
    imgurl: `/img/heavy-armor/sabatons/sabatons_${("00" + (idx + 1)).slice(-3)}.jpg`,
    imgurlLarge: `/img/heavy-armor/sabatons/sabatons_large_${("00" + (idx + 1)).slice(-3)}.jpg`,
    price: randomPrice(300, 600),
    description: lorem.generateParagraphs(1),
    sizes: randomSizes(36, 46, 6),
  })),
};

//Normalize data into key(id)-values maps 
export let sectionsMap = {};
export let itemsMap = {};

const sectionsArr = Object.keys(armorData);
let itemId = 0;
for (const sectionName of sectionsArr) {
  let sectionIds = [];
  for (const item of armorData[sectionName]) {
    itemsMap[itemId] = { ...item, id: itemId, section: sectionName };
    sectionIds.push(itemId.toString());
    itemId++;
  }
  sectionsMap[sectionName] = sectionIds;
}