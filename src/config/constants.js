export const LEADERBOARD_TYPES = [
    { value: "ranked", label: "Ranked", selector: "Selector-Ranked" },
    { value: "blitz" , label: "Blitz" , selector: "Selector-Blitz"  },
];

export const HEROES_TYPES = [
  { value: "pickrate", label: "Pick Rate", icon: "/icons/pickrate" },
  { value: "winrate" , label: "Win Rate" , icon: "/icons/winrate"  },
  { value: "banrate" , label: "Ban Rate" , icon: "/icons/banrate"  },
];

export const REGIONS = [
  "all",
  "na",
  "eu",
  "ea",
  "sea",
  "sa",
  "cn"
];

export default {
  LEADERBOARD_TYPES,
  REGIONS,
  HEROES_TYPES
}