const INITIAL_STATE = {
  sections: [
    {
      title: "gauntlets",
      imageUrl: "/img/heavy-armor/gauntlets/gauntlets_001.jpg",
    },
    {
      title: "greaves",
      imageUrl: "/img/heavy-armor/greaves/greaves_002.jpg",
    },
    {
      title: "sabatons",
      imageUrl: "/img/heavy-armor/sabatons/sabatons_006.jpg",
    },
    {
      title: "helmets",
      imageUrl: "/img/heavy-armor/helmets/helmets_002.jpg",
    },
    {
      title: "breastplates",
      imageUrl: "/img/heavy-armor/breastplates/breastplates_001.jpg",
    },
  ],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  return state;
};
export default directoryReducer;
