import { LoremIpsum }  from "lorem-ipsum";
const lorem = new LoremIpsum({ sentencesPerParagraph: { max: 8, min: 4 }, wordsPerSentence: { max: 8, min: 4 } });
const randomPrice = (min, max) => {
  const rand = Math.random();
  return Math.floor(min + (max - min) * rand);
};

const armorData = {
  breastplates: ["Savoy", "Hans Prunner", "Helmut", "Dark Elf", "Besancon", "Francesco", "Brunswick", "Maystetter"].map((item, idx) => ({
    name: item,
    imgurl: `/img/heavy-armor/breastplates/breastplates_${("00" + (idx + 1)).slice(-3)}.jpg`,
    price: randomPrice(800, 1600),
    description: lorem.generateParagraphs(1),
  })),
  gauntlets: ["Sigman", "Tanenberg", "Manifer", "Helmschmid", "Ulrich", "Grosschedel", "Clifford"].map((item, idx) => ({
    name: item,
    imgurl: `/img/heavy-armor/gauntlets/gauntlets_${("00" + (idx + 1)).slice(-3)}.jpg`,
    price: randomPrice(200, 500),
    description: lorem.generateParagraphs(1),
  })),
  greaves: ["Valencia", "Cassius", "Wayward", "Rieneck", "Olleg", "Kingsguard"].map((item, idx) => ({
    name: item,
    imgurl: `/img/heavy-armor/greaves/greaves_${("00" + (idx + 1)).slice(-3)}.jpg`,
    price: randomPrice(150, 400),
    description: lorem.generateParagraphs(1),
  })),
  helmets: ["Stechhelm", "Morion", "Veneziana", "Burgonet", "Cabasset", "Sallet", "Armet", "Rennhut", "Morningstar", "Barbuta", "Bascinet", "Valsgarde"].map(
    (item, idx) => ({
      name: item,
      imgurl: `/img/heavy-armor/helmets/helmets_${("00" + (idx + 1)).slice(-3)}.jpg`,
      price: randomPrice(300, 600),
      description: lorem.generateParagraphs(1),
    })
  ),
  sabatons: ["Kigmaker", "Gothic", "Paladin", "Morningstar", "Scudamore", "Cuisse"].map((item, idx) => ({
    name: item,
    imgurl: `/img/heavy-armor/sabatons/sabatons_${("00" + (idx + 1)).slice(-3)}.jpg`,
    price: randomPrice(300, 600),
    description: lorem.generateParagraphs(1),
  })),
};

export default armorData;
