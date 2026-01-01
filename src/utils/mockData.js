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

// Pro players with images available in /public/players/
export const PRO_PLAYERS = [
  { name: 'Bayu', region: 'sg', role: 'Carry', team: 'Divine Dragons' },
  { name: 'BestChuckNa', region: 'na', role: 'Carry', team: 'Team Solo Mid' },
  { name: 'Chicken', region: 'eu', role: 'Jungler', team: 'Fnatic' },
  { name: 'DarkPotato', region: 'eu', role: 'Captain', team: 'G2 Esports' },
  { name: 'DeiNomine', region: 'eu', role: 'Jungler', team: 'SK Gaming' },
  { name: 'DNZio', region: 'sa', role: 'Carry', team: 'INTZ' },
  { name: 'FlashX', region: 'na', role: 'Captain', team: 'Cloud9' },
  { name: 'gabevizzle', region: 'na', role: 'Carry', team: 'Tribe Gaming' },
  { name: 'Gaspy', region: 'eu', role: 'Carry', team: 'Rogue' },
  { name: 'God0fSins', region: 'na', role: 'Jungler', team: 'Nova Esports' },
  { name: 'HellsDevil', region: 'eu', role: 'Jungler', team: 'Vitality' },
  { name: 'HFGuy', region: 'na', role: 'Carry', team: 'GankStars' },
  { name: 'Hide', region: 'sg', role: 'Jungler', team: 'ACE Gaming' },
  { name: 'Hundor', region: 'eu', role: 'Captain', team: 'Mousesports' },
  { name: 'iLoveJoseph', region: 'na', role: 'Captain', team: 'Hammers Esports' },
  { name: 'ImtheDoom', region: 'eu', role: 'Carry', team: 'Fnatic' },
  { name: 'justman00', region: 'eu', role: 'Captain', team: 'Team Qlash' },
  { name: 'KeanuNakoa', region: 'na', role: 'Jungler', team: 'Rogue' },
  { name: 'KValafar', region: 'sa', role: 'Captain', team: 'paiN Gaming' },
  { name: 'LoneDelphi', region: 'na', role: 'Carry', team: 'Vision Gaming' },
  { name: 'LostBoyToph', region: 'na', role: 'Captain', team: 'Cloud9' },
  { name: 'MaxGreen', region: 'eu', role: 'Carry', team: 'SK Gaming' },
  { name: 'Mercilles', region: 'eu', role: 'Jungler', team: 'Team Secret' },
  { name: 'Mowglie', region: 'eu', role: 'Jungler', team: 'Fnatic' },
  { name: 'nettetoilette', region: 'eu', role: 'Carry', team: 'G2 Esports' },
  { name: 'Odds', region: 'na', role: 'Captain', team: 'Tribe Gaming' },
  { name: 'Oldskool', region: 'na', role: 'Jungler', team: 'TSM' },
  { name: 'Palmatoro', region: 'sa', role: 'Carry', team: 'LOUD' },
  { name: 'Raph', region: 'eu', role: 'Carry', team: 'Team Qlash' },
  { name: 'Reddix', region: 'eu', role: 'Captain', team: 'Vitality' },
  { name: 'Rikumeza', region: 'sg', role: 'Carry', team: 'Impunity' },
  { name: 'starboi', region: 'na', role: 'Carry', team: 'Nova Esports' },
  { name: 'StartingAllOver', region: 'na', role: 'Jungler', team: 'GankStars' },
  { name: 'TetnoJJ', region: 'eu', role: 'Jungler', team: 'Mousesports' },
  { name: 'Tr1cKy', region: 'eu', role: 'Carry', team: 'Rogue' },
  { name: 'Truth', region: 'na', role: 'Carry', team: 'Cloud9' },
  { name: 'ttigers', region: 'sg', role: 'Jungler', team: 'Impunity' },
  { name: 'Tyruzz', region: 'eu', role: 'Captain', team: 'Team Secret' },
  { name: 'VONC', region: 'na', role: 'Carry', team: 'TSM' },
  { name: 'Xelciar', region: 'eu', role: 'Captain', team: 'G2 Esports' },
  { name: 'XenoTek', region: 'na', role: 'Jungler', team: 'Vision Gaming' },
];

// Teams derived from pro players
export const TEAMS = [...new Set(PRO_PLAYERS.map(p => p.team))];

// Get player image path
export const getPlayerImage = (playerName) => `/players/${playerName}.png`;

// Generate player names (for non-pro players)
export const generatePlayerName = () => {
  const prefixes = ['Dark', 'Shadow', 'Pro', 'Ultra', 'Epic', 'Mega', 'Super', 'Neo', 'Fury', 'Storm'];
  const suffixes = ['Slayer', 'Master', 'King', 'Legend', 'Warrior', 'Knight', 'Hunter', 'Striker', 'Blaze', 'Phoenix'];
  return `${randomFromArray(prefixes)}${randomFromArray(suffixes)}${randomInt(1, 999)}`;
};

// Get a random pro player
export const getRandomProPlayer = () => randomFromArray(PRO_PLAYERS);

// Generate mock pro player stats
export const generateProPlayerStats = (player) => ({
  ...player,
  image: getPlayerImage(player.name),
  elo: randomInt(2400, 2800),
  winRate: randomFloat(55, 75),
  kda: randomFloat(3.5, 8.5),
  gamesPlayed: randomInt(500, 2000),
  mainHeroes: [randomFromArray(HEROES), randomFromArray(HEROES), randomFromArray(HEROES)],
  recentForm: Array.from({ length: 5 }, () => Math.random() > 0.35 ? 'W' : 'L'),
});

// Generate leaderboard with pro players
export const generateProLeaderboard = (count = 20) => {
  const shuffled = [...PRO_PLAYERS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length)).map((player, index) => ({
    rank: index + 1,
    ...generateProPlayerStats(player),
  }));
};

// Generate a list of mock player names (for general use)
export const MOCK_PLAYERS = PRO_PLAYERS.map(p => p.name);
