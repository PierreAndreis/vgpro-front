export const LEADERBOARD_TYPES = [
    { value: "ranked", label: "Ranked", selector: "Selector-Ranked" },
    { value: "blitz" , label: "Blitz" , selector: "Selector-Blitz"  },
];

export const HEROES_TYPES = [
  { value: "pickrate", label: "Pick Rate", selector: "Selector-PickRate" },
  { value: "winrate" , label: "Win Rate" , selector: "Selector-WinRate"  },
  { value: "banrate" , label: "Ban Rate" , selector: "Selector-BanRate"  },
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