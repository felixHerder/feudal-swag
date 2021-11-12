import faker from "faker";

const randomInt = (min, max) => {
  const rand = Math.random();
  return Math.floor(min + (max - min + 1) * rand);
};
const randomRating = (min, max) => {
  const rand = Math.random();
  if (rand > 0.4) {
    return 5;
  }
  if (rand > 0.3) {
    return 4;
  }
  if (rand > 0.2) {
    return 3;
  }
  if (rand > 0.1) {
    return 2;
  }
  return 1;
};
const randomSizes = (min, max, num) => {
  const delta = Math.ceil((max - min) / num);
  const arr = [min];
  for (let i = 1; i < num; i++) {
    arr[i] = arr[i - 1] + delta;
  }
  return arr;
};
const genReviews = () => {
  const numReviews = randomInt(5, 25);
  let reviews = {};
  for (let i = 0; i < numReviews; i++) {
    const uuid = faker.datatype.uuid();
    reviews[uuid] = {
      name: faker.name.findName(),
      rating: randomRating(1, 5),
      comment: faker.lorem.paragraph(2),
    };
  }
  return reviews;
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const armorData = {
  breastplates: [
    "Savoy",
    "Hans Prunner",
    "Helmut",
    "Dark Elf",
    "Besancon",
    "Francesco",
    "Brunswick",
    "Maystetter",
    "Paolo",
    "Radziwill",
  ].map((item, idx) => ({
    name: item + " " + capitalize(faker.lorem.word()),
    imgurl: `/img/heavy-armor/breastplates/breastplates_${("00" + (idx + 1)).slice(-3)}.jpg`,
    imgurlLarge: `/img/heavy-armor/breastplates/breastplates_large_${("00" + (idx + 1)).slice(-3)}.jpg`,
    imgurlSmall: `/img/heavy-armor/breastplates/breastplates_small_${("00" + (idx + 1)).slice(-3)}.jpg`,
    price: randomInt(800, 1600),
    description: faker.lorem.paragraph(3),
    reviews: genReviews(),
    sizes: randomSizes(60, 80, 4),
  })),
  gauntlets: ["Sigman", "Tanenberg", "Manifer", "Helmschmid", "Ulrich", "Grosschedel", "Clifford", "Lamellar", "Churburg"].map(
    (item, idx) => ({
      name: item + " " + capitalize(faker.lorem.word()),
      imgurl: `/img/heavy-armor/gauntlets/gauntlets_${("00" + (idx + 1)).slice(-3)}.jpg`,
      imgurlLarge: `/img/heavy-armor/gauntlets/gauntlets_large_${("00" + (idx + 1)).slice(-3)}.jpg`,
      imgurlSmall: `/img/heavy-armor/gauntlets/gauntlets_small_${("00" + (idx + 1)).slice(-3)}.jpg`,
      price: randomInt(200, 500),
      description: faker.lorem.paragraph(3),
      reviews: genReviews(),
      sizes: randomSizes(20, 32, 5),
    })
  ),
  greaves: ["Valencia", "Cassius", "Wayward", "Rieneck", "Olleg", "Kingsguard", "Sokol", "Assassin", "Schynbalds"].map(
    (item, idx) => ({
      name: item + " " + capitalize(faker.lorem.word()),
      imgurl: `/img/heavy-armor/greaves/greaves_${("00" + (idx + 1)).slice(-3)}.jpg`,
      imgurlLarge: `/img/heavy-armor/greaves/greaves_large_${("00" + (idx + 1)).slice(-3)}.jpg`,
      imgurlSmall: `/img/heavy-armor/greaves/greaves_small_${("00" + (idx + 1)).slice(-3)}.jpg`,
      price: randomInt(150, 400),
      description: faker.lorem.paragraph(3),
      reviews: genReviews(),
      sizes: randomSizes(40, 56, 5),
    })
  ),
  helmets: [
    "Stechhelm",
    "Morion",
    "Veneziana",
    "Burgonet",
    "Cabasset",
    "Sallet",
    "Armet",
    "Rennhut",
    "Morningstar",
    "Barbuta",
    "Bascinet",
    "Valsgarde",
  ].map((item, idx) => ({
    name: item + " " + capitalize(faker.lorem.word()),
    imgurl: `/img/heavy-armor/helmets/helmets_${("00" + (idx + 1)).slice(-3)}.jpg`,
    imgurlLarge: `/img/heavy-armor/helmets/helmets_large_${("00" + (idx + 1)).slice(-3)}.jpg`,
    imgurlSmall: `/img/heavy-armor/helmets/helmets_Small_${("00" + (idx + 1)).slice(-3)}.jpg`,
    price: randomInt(300, 600),
    description: faker.lorem.paragraph(3),
    reviews: genReviews(),
    sizes: randomSizes(20, 36, 4),
  })),
  sabatons: ["Kigmaker", "Gothic", "Paladin", "Morningstar", "Scudamore", "Cuisse", "Titanium", "Anato"].map((item, idx) => ({
    name: item + " " + capitalize(faker.lorem.word()),
    imgurl: `/img/heavy-armor/sabatons/sabatons_${("00" + (idx + 1)).slice(-3)}.jpg`,
    imgurlLarge: `/img/heavy-armor/sabatons/sabatons_large_${("00" + (idx + 1)).slice(-3)}.jpg`,
    imgurlSmall: `/img/heavy-armor/sabatons/sabatons_small_${("00" + (idx + 1)).slice(-3)}.jpg`,
    price: randomInt(300, 600),
    description: faker.lorem.paragraph(3),
    reviews: genReviews(),
    sizes: randomSizes(36, 46, 6),
  })),
};

//Normalize data into key(id)-value maps
export let itemsMap = {};
export let reviewsMap = {};
export let indexMap = {};

const sectionsArr = Object.keys(armorData);
let itemId = 0;
for (const sectionName of sectionsArr) {
  for (const item of armorData[sectionName]) {
    item.reviewCount = Object.keys(item.reviews).length;
    const ratingSum = Object.values(item.reviews).reduce((total, review) => total + review.rating, 0);
    item.ratingAvg = ratingSum / item.reviewCount;
    reviewsMap[itemId] = { ...item.reviews };
    delete item.reviews;
    itemsMap[itemId] = { ...item, id: itemId.toString(), section: sectionName };
    indexMap[itemId] = {
      name: item.name,
      price: item.price,
      ratingAvg: item.ratingAvg,
      section: sectionName,
      id: itemId.toString(),
    };
    itemId++;
  }
}
