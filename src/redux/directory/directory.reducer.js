const INITIAL_STATE = {
  sections: [
    {
      title: "gauntlets",
      imageUrl: "/img/heavy-armor/gauntlets/gauntlets_large_001.jpg",
    },
    {
      title: "greaves",
      imageUrl: "/img/heavy-armor/greaves/greaves_large_003.jpg",
    },
    {
      title: "sabatons",
      imageUrl: "/img/heavy-armor/sabatons/sabatons_large_006.jpg",
    },
    {
      title: "helmets",
      imageUrl: "/img/heavy-armor/helmets/helmets_large_002.jpg",
    },
    {
      title: "breastplates",
      imageUrl: "/img/heavy-armor/breastplates/breastplates_large_001.jpg",
    },
  ],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  return state;
};
export default directoryReducer;
