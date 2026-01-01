// ============= MOCK DATA =============

export const HEROES = [
  'Adagio', 'Alpha', 'Ardan', 'Baptiste', 'Baron', 'Blackfeather', 'Catherine',
  'Celeste', 'Flicker', 'Fortress', 'Glaive', 'Grace', 'Grumpjaw',
  'Gwen', 'Idris', 'Joule', 'Kestrel', 'Koshka',
  'Krul', 'Lance', 'Lyra',
  'Ozo', 'Petal', 'Phinn', 'Reim', 'Reza', 'Ringo', 'Rona', 'Samuel',
  'SAW', 'Skaarf', 'Skye', 'Taka', 'Vox'
];

export const ITEMS = [
  'Sorrowblade', 'Tyrant\'s Monocle', 'Tornado Trigger', 'Breaking Point',
  'Serpent Mask', 'Shatterglass', 'Frostburn',
  'Clockwork', 'Broken Myth', 'Aftershock', 'Journey Boots', 'Halcyon Chargers',
  'War Treads', 'Fountain of Renewal', 'Crucible', 'Atlas Pauldron',
  'Metal Jacket', 'Aegis', 'Slumbering Husk',
  'Nullwave Gauntlet', 'Tension Bow',
  'Bonesaw', 'Poisoned Shiv', 'Eve of Harvest', 'Stormcrown',
  'Alternating Current', 'Barbed Needle', 'Blazing Salvo', 'Book of Eulogies',
  'Chronograph', 'Coat of Plates', 'Contraption', 'Crystal Bit', 'Crystal Infusion',
  'Dragonblood Contract', 'Dragonheart', 'Echo', 'Eclipse Prism', 'Energy Battery',
  'Flare', 'Flare Gun', 'Halcyon Potion', 'Heavy Prism', 'Heavy Steel',
  'Hourglass', 'Ironguard Contract', 'Kinetic Shield', 'Level Juice', 'Lifespring',
  'Light Armor', 'Light Shield', 'Lucky Strike', 'Minion Candy', 'Minions Foot',
  'Oakheart', 'Piercing Shard', 'Piercing Spear', 'Pot of Gold', 'Protector Contract',
  'Reflex Block', 'Scout Trap', 'Shiversteel', 'Six Sins', 'Sprint Boots',
  'Stormguard Banner', 'Swift Shooter', 'Travel Boots', 'Void Battery', 'Weapon Blade',
  'Weapon Infusion'
];

export const REGIONS = ['na', 'eu', 'sg', 'cn', 'sa'];
export const GAME_MODES = ['Ranked 5v5', 'Ranked', 'Blitz', 'Casual 5v5', 'ARAL'];
export const ROLES = ['Carry', 'Captain', 'Jungler'];

// Helper functions
export const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const randomFloat = (min, max, decimals = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

// Generate player names
export const generatePlayerName = () => {
  const prefixes = ['Dark', 'Shadow', 'Pro', 'Ultra', 'Epic', 'Mega', 'Super', 'Neo', 'Fury', 'Storm'];
  const suffixes = ['Slayer', 'Master', 'King', 'Legend', 'Warrior', 'Knight', 'Hunter', 'Striker', 'Blaze', 'Phoenix'];
  return `${randomFromArray(prefixes)}${randomFromArray(suffixes)}${randomInt(1, 999)}`;
};

// Generate a list of mock player names
export const MOCK_PLAYERS = Array.from({ length: 100 }, () => generatePlayerName());
