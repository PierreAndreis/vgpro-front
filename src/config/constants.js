export const LEADERBOARD_TYPES = [
    { value: "ranked", label: "Ranked",  icon: "/icons/ranked"},
    { value: "blitz" , label: "Blitz" ,  icon: "/icons/blitz" },
    { value: "ranked5v5" , label: "Ranked 5v5" ,  icon: "/icons/ranked" },
];

export const HEROES_TYPES = [
  { value: "pickRate", label: "Pick Rate", icon: "/icons/pickrate" },
  { value: "winRate" , label: "Win Rate" , icon: "/icons/winrate"  },
  { value: "banRate" , label: "Ban Rate" , icon: "/icons/banrate"  },
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