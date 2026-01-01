import {
  HEROES,
  ITEMS,
  REGIONS,
  ROLES,
  randomFromArray,
  randomInt,
  randomFloat,
  generatePlayerName,
  MOCK_PLAYERS,
} from './mockData';

// Simulate network delay
const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, randomInt(50, ms)));

// ============= MOCK API =============

const MockAPI = {};

// Pro Feed - GET /pro/history/
MockAPI.getProFeed = async () => {
  await delay();
  return Array.from({ length: 20 }, (_, i) => ({
    proInfo: {
      name: MOCK_PLAYERS[i % MOCK_PLAYERS.length],
      team: randomFromArray(['Tribe Gaming', 'Nova Esports', 'ACE Gaming', 'Cloud9', 'Team SoloMid']),
    },
    region: randomFromArray(REGIONS),
    actor: randomFromArray(HEROES),
    role: randomFromArray(ROLES),
    kills: randomInt(0, 15),
    deaths: randomInt(0, 10),
    assists: randomInt(0, 20),
    items: Array.from({ length: 6 }, () => randomFromArray(ITEMS)),
    winner: Math.random() > 0.5,
    createdAt: new Date(Date.now() - randomInt(0, 86400000 * 7)).toISOString(),
  }));
};

// Leaderboard - GET /leaderboard/:mode/:region
MockAPI.getLead5 = async (mode, region, { player, ...filtersArgs }) => {
  await delay();
  const { limit = 10, offset = 0 } = filtersArgs;

  let leaderboard = Array.from({ length: 100 }, (_, i) => ({
    position: i + 1,
    name: MOCK_PLAYERS[i % MOCK_PLAYERS.length],
    region: region === 'all' ? randomFromArray(REGIONS) : region,
    points: Math.max(2800 - (i * 25) + randomInt(-10, 10), 0),
    wins: randomInt(50, 500),
    games: randomInt(100, 800),
    winRate: randomFloat(45, 75),
    kda: randomFloat(2, 8),
    topHeroes: Array.from({ length: 5 }, () => randomFromArray(HEROES)),
  }));

  // Filter by player name if provided
  if (player) {
    // If player is provided as path param, include them at position 0
    leaderboard = [
      {
        position: randomInt(1, 1000),
        name: player,
        region: region === 'all' ? randomFromArray(REGIONS) : region,
        points: Math.max(2500 + randomInt(-20, 20), 0),
        wins: randomInt(50, 500),
        games: randomInt(100, 800),
        winRate: randomFloat(45, 75),
        kda: randomFloat(2, 8),
        topHeroes: Array.from({ length: 5 }, () => randomFromArray(HEROES)),
      },
      ...leaderboard.slice(0, 19),
    ];
  }

  const start = parseInt(offset) || 0;
  const end = start + (parseInt(limit) || 10);
  return leaderboard.slice(start, end);
};

// Top Heroes - GET /heroes/:region
MockAPI.getTopHeroes = async (region = 'all') => {
  await delay();
  const heroes = HEROES.map((name) => ({
    name,
    roles: [randomFromArray(ROLES), randomFromArray(ROLES)].filter((v, i, a) => a.indexOf(v) === i),
    pickRate: randomFloat(1, 15),
    winRate: randomFloat(42, 58),
    banRate: randomFloat(0, 30),
    tier: randomInt(0, 4),
    games: randomInt(1000, 50000),
  }));

  // Sort by tier (descending) then winRate
  heroes.sort((a, b) => b.tier - a.tier || b.winRate - a.winRate);
  return heroes;
};

// Hero Details - GET /heroes/:region/:heroName
MockAPI.getHero = async (heroName, region = 'all') => {
  await delay();

  if (!HEROES.map(h => h.toLowerCase()).includes(heroName.toLowerCase())) {
    return { error: 'Hero not found' };
  }

  const totalHeroes = HEROES.length;
  const statsArray = [
    { name: 'kda', rank: randomInt(1, totalHeroes), stats: randomFloat(2, 6), total: totalHeroes },
    { name: 'killsPerGame', rank: randomInt(1, totalHeroes), stats: randomFloat(4, 10), total: totalHeroes },
    { name: 'deathsPerGame', rank: randomInt(1, totalHeroes), stats: randomFloat(3, 7), total: totalHeroes },
    { name: 'assistsPerGame', rank: randomInt(1, totalHeroes), stats: randomFloat(5, 12), total: totalHeroes },
    { name: 'goldPerMin', rank: randomInt(1, totalHeroes), stats: randomFloat(200, 400), total: totalHeroes },
    { name: 'farmPerGame', rank: randomInt(1, totalHeroes), stats: randomFloat(50, 150), total: totalHeroes },
    { name: 'damagePerGame', rank: randomInt(1, totalHeroes), stats: randomFloat(15000, 40000), total: totalHeroes },
    { name: 'healingPerGame', rank: randomInt(1, totalHeroes), stats: randomFloat(1000, 15000), total: totalHeroes },
  ];

  const buildsArray = Array.from({ length: 10 }, () => ({
    items: Array.from({ length: 4 }, () => randomFromArray(ITEMS)),
    pickRate: randomFloat(5, 40),
    winRate: randomFloat(45, 65),
  }));

  const generateSkillOrder = () => {
    const skills = [];
    for (let i = 0; i < 12; i++) {
      skills.push(randomFromArray(['a', 'b', 'c']));
    }
    return skills.join(',');
  };

  const categories = ['ab', 'ac', 'ba', 'bc', 'ca', 'cb'];
  const categorySkillsArray = categories.map(cat => ({
    key: cat,
    winRate: randomFloat(45, 60),
    pickRate: randomFloat(5, 40),
  }));

  const skillsArray = [];
  categories.forEach(category => {
    const numSkills = randomInt(2, 4);
    for (let i = 0; i < numSkills; i++) {
      skillsArray.push({
        key: generateSkillOrder(),
        category: category,
        pickRate: randomFloat(5, 40),
        winRate: randomFloat(45, 60),
      });
    }
  });

  const playingAgainstArray = HEROES.filter(h => h.toLowerCase() !== heroName.toLowerCase())
    .slice(0, 20)
    .map(h => ({
      key: h,
      winRate: randomFloat(35, 65),
      pickRate: randomFloat(2, 20),
    }));

  const playingWithArray = HEROES.filter(h => h.toLowerCase() !== heroName.toLowerCase())
    .slice(0, 20)
    .map(h => ({
      key: h,
      winRate: randomFloat(45, 65),
      pickRate: randomFloat(2, 20),
    }));

  const durationsArray = [15, 20, 25, 30, 35, 40, 45].map(duration => ({
    key: duration.toString(),
    winRate: randomFloat(40, 60),
    pickRate: randomFloat(5, 25),
  }));

  return {
    name: heroName,
    winRate: randomFloat(45, 55),
    pickRate: randomFloat(3, 15),
    banRate: randomFloat(1, 25),
    roles: [
      { key: 'Carry', pickRate: randomFloat(30, 60), winRate: randomFloat(45, 55) },
      { key: 'Jungler', pickRate: randomFloat(20, 50), winRate: randomFloat(44, 56) },
      { key: 'Captain', pickRate: randomFloat(10, 40), winRate: randomFloat(46, 54) },
    ],
    stats: statsArray,
    builds: buildsArray,
    skills: skillsArray,
    categorySkills: categorySkillsArray,
    playingAgainst: playingAgainstArray,
    playingWith: playingWithArray,
    durations: durationsArray,
    abilities: [
      {
        name: 'Heroic Perk',
        description: 'A unique passive ability that defines the hero.',
        key: 'heroicperk',
      },
      {
        name: 'Ability A',
        description: 'Primary ability with strong damage or utility.',
        key: 'A',
        cooldown: [10, 9, 8, 7, 6],
        energyCost: [50, 55, 60, 65, 70],
      },
      {
        name: 'Ability B',
        description: 'Secondary ability providing mobility or crowd control.',
        key: 'B',
        cooldown: [12, 11, 10, 9, 8],
        energyCost: [60, 70, 80, 90, 100],
      },
      {
        name: 'Ultimate',
        description: 'Powerful ultimate ability that can change the tide of battle.',
        key: 'C',
        cooldown: [80, 70, 60],
        energyCost: [100, 120, 140],
      },
    ],
    counters: {
      strong: Array.from({ length: 5 }, () => ({
        name: randomFromArray(HEROES.filter(h => h !== heroName)),
        winRate: randomFloat(52, 65),
        games: randomInt(100, 2000),
      })),
      weak: Array.from({ length: 5 }, () => ({
        name: randomFromArray(HEROES.filter(h => h !== heroName)),
        winRate: randomFloat(35, 48),
        games: randomInt(100, 2000),
      })),
    },
    synergies: Array.from({ length: 5 }, () => ({
      name: randomFromArray(HEROES.filter(h => h !== heroName)),
      winRate: randomFloat(52, 62),
      games: randomInt(100, 2000),
    })),
  };
};

// Hero History - GET /heroes/:region/:heroName/history
MockAPI.getHeroHistory = async (heroName, options) => {
  await delay();
  const totalHeroes = HEROES.length;
  const patches = ['4.0', '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9', '4.10', '4.11', '4.12', '4.13'];

  return patches.map(patch => ({
    patch,
    winRate: randomFloat(45, 55),
    pickRate: randomFloat(3, 15),
    banRate: randomFloat(1, 25),
    rank: {
      winRate: randomInt(1, totalHeroes),
      pickRate: randomInt(1, totalHeroes),
      banRate: randomInt(1, totalHeroes),
    },
    games: randomInt(500, 5000),
  }));
};

// Player Lookup - GET /player/:playerName/find
MockAPI.lookupPlayer = async (playerName) => {
  await delay();
  return {
    id: `player-${Date.now()}`,
    name: playerName,
    region: randomFromArray(REGIONS),
    found: true,
  };
};

// Player Lookup by UUID - GET /player/:playerId/uuid/find
MockAPI.lookupPlayerId = async (playerId) => {
  await delay();
  return {
    id: playerId,
    name: generatePlayerName(),
    region: randomFromArray(REGIONS),
    found: true,
  };
};

// Player Stats - GET /player/:playerName/stats
MockAPI.fetchPlayerStats = async (playerName, filtersArgs) => {
  await delay(300);

  const heroesPlayed = Array.from({ length: 15 }, () => {
    const games = randomInt(10, 500);
    const wins = randomInt(Math.floor(games * 0.3), Math.floor(games * 0.7));
    const loss = games - wins;
    return {
      name: randomFromArray(HEROES),
      games,
      wins,
      loss,
      avgKills: randomFloat(4, 12),
      avgDeaths: randomFloat(2, 8),
      avgAssists: randomFloat(4, 15),
      kda: randomFloat(1.5, 7),
      winRate: ((wins / games) * 100).toFixed(1),
    };
  });

  const rolesPlayed = ROLES.map(role => ({
    name: role,
    winRate: randomFloat(45, 65),
    kda: randomFloat(2, 6),
    avgKills: randomFloat(4, 12).toFixed(1),
    avgDeaths: randomFloat(2, 8).toFixed(1),
    avgAssists: randomFloat(4, 15).toFixed(1),
    games: randomInt(50, 500),
  }));

  const playedWith = Array.from({ length: 20 }, () => {
    const games = randomInt(4, 100);
    const wins = randomInt(Math.floor(games * 0.3), Math.floor(games * 0.7));
    return {
      name: generatePlayerName(),
      games,
      wins,
    };
  });

  return {
    id: `player-${Date.now()}`,
    name: playerName,
    region: randomFromArray(REGIONS),
    lastCache: new Date().toISOString(),
    rankVst: randomFloat(1800, 2800),
    rank5v5Vst: randomFloat(1800, 2800),
    aka: [playerName, `${playerName}Old`, `${playerName}Smurf`],
    rankedRanking: {
      global: randomInt(1, 10000),
      regional: randomInt(1, 1000),
    },
    ranked5v5Ranking: {
      global: randomInt(1, 10000),
      regional: randomInt(1, 1000),
    },
    gameModesAvailable: ['Ranked 5v5', 'Ranked', 'Casual 5v5', 'Blitz', 'ARAL'],
    seasonsAvailable: ['Winter 2019', 'Autumn 2019', 'Summer 2019', 'Spring 2019', 'Winter 2018'],
    stats: {
      wins: randomInt(100, 1000),
      loss: randomInt(50, 800),
      games: randomInt(200, 1500),
      winRate: randomFloat(45, 65),
      kda: randomFloat(2, 6),
      kp: randomFloat(50, 80),
      avgKills: randomFloat(5, 12),
      avgDeaths: randomFloat(3, 8),
      avgAssists: randomFloat(5, 15),
      avgCS: randomFloat(50, 200),
      totalCS: randomInt(10000, 100000),
      totalKills: randomInt(5000, 50000),
      totalDeaths: randomInt(3000, 30000),
      duration: randomInt(100000, 500000),
      gold: randomFloat(10000, 20000),
      Heroes: heroesPlayed,
      Roles: rolesPlayed,
      PlayedWith: playedWith,
    },
  };
};

// Player Matches - GET /matches/:playerName
MockAPI.fetchPlayerMatches = async (playerName, filtersArgs) => {
  await delay(300);
  const { limit = 10 } = filtersArgs;

  return Array.from({ length: parseInt(limit) }, (_, i) => {
    const isWinner = Math.random() > 0.45;
    const myHero = randomFromArray(HEROES);
    const myRole = randomFromArray(ROLES);

    const generatePlayer = (side, isMe = false) => ({
      id: `player-${Date.now()}-${Math.random()}`,
      name: isMe ? playerName : generatePlayerName(),
      hero: randomFromArray(HEROES),
      role: randomFromArray(ROLES),
      side,
      me: isMe,
      winner: side === 'left/blue' ? isWinner : !isWinner,
      kills: randomInt(0, 15),
      deaths: randomInt(0, 12),
      assists: randomInt(0, 20),
      kda: randomFloat(1, 10),
      gold: randomInt(8000, 25000),
      goldShare: randomFloat(15, 35),
      cs: randomInt(30, 250),
      csMin: randomFloat(3, 10),
      items: Array.from({ length: 6 }, () => randomFromArray(ITEMS)),
      mvp: Math.random() > 0.9,
      rankvst: randomFloat(1500, 2800),
      rank5v5vst: randomFloat(1500, 2800),
      blitzvst: randomFloat(1500, 2800),
    });

    const mySide = Math.random() > 0.5 ? 'left/blue' : 'right/red';
    const otherSide = mySide === 'left/blue' ? 'right/red' : 'left/blue';
    const teamSize = Math.random() > 0.5 ? 5 : 3;

    const players = [
      generatePlayer(mySide, true),
      ...Array.from({ length: teamSize - 1 }, () => generatePlayer(mySide)),
      ...Array.from({ length: teamSize }, () => generatePlayer(otherSide)),
    ];

    players[0].hero = myHero;
    players[0].role = myRole;

    return {
      id: `match-${Date.now()}-${i}`,
      shardId: randomFromArray(REGIONS),
      gameMode: teamSize === 5 ? randomFromArray(['Ranked 5v5', 'Casual 5v5']) : randomFromArray(['Ranked', 'Blitz', 'ARAL']),
      minutes: `${randomInt(15, 40)}:${randomInt(10, 59).toString().padStart(2, '0')}`,
      ended: new Date(Date.now() - randomInt(0, 86400000 * 14)).toISOString(),
      players,
      rosters: [
        {
          side: 'left/blue',
          winner: isWinner,
          kills: randomInt(10, 40),
          heroKills: randomInt(10, 40),
          gold: randomInt(30000, 80000),
          turretsDestroyed: randomInt(0, 6),
          turretKills: randomInt(0, 6),
          krakenCaptures: randomInt(0, 2),
        },
        {
          side: 'right/red',
          winner: !isWinner,
          kills: randomInt(10, 40),
          heroKills: randomInt(10, 40),
          gold: randomInt(30000, 80000),
          turretsDestroyed: randomInt(0, 6),
          turretKills: randomInt(0, 6),
          krakenCaptures: randomInt(0, 2),
        },
      ],
    };
  });
};

// Match Details - GET /matches/:matchId/:region/details
MockAPI.matchDetails = async (matchId, region) => {
  await delay();

  const teamSize = Math.random() > 0.5 ? 5 : 3;
  const isWinner = Math.random() > 0.5;

  const generatePlayer = (side, idx) => ({
    id: `player-${Date.now()}-${idx}`,
    name: generatePlayerName(),
    hero: randomFromArray(HEROES),
    role: randomFromArray(ROLES),
    side,
    winner: side === 'left/blue' ? isWinner : !isWinner,
    kills: randomInt(0, 15),
    deaths: randomInt(0, 12),
    assists: randomInt(0, 20),
    kda: randomFloat(1, 10),
    gold: randomInt(8000, 25000),
    goldShare: randomFloat(15, 35),
    cs: randomInt(30, 250),
    csMin: randomFloat(3, 10),
    items: Array.from({ length: 6 }, () => randomFromArray(ITEMS)),
    mvp: false,
    damageDealt: randomInt(10000, 80000),
    damageTaken: randomInt(10000, 60000),
    healingDone: randomInt(0, 20000),
    turretsDestroyed: randomInt(0, 5),
  });

  const players = [
    ...Array.from({ length: teamSize }, (_, i) => generatePlayer('left/blue', i)),
    ...Array.from({ length: teamSize }, (_, i) => generatePlayer('right/red', i + teamSize)),
  ];

  const mvpIdx = randomInt(0, players.length - 1);
  players[mvpIdx].mvp = true;

  return {
    id: matchId,
    shardId: region,
    gameMode: teamSize === 5 ? 'Ranked 5v5' : 'Ranked',
    minutes: `${randomInt(15, 40)}:${randomInt(10, 59).toString().padStart(2, '0')}`,
    ended: new Date(Date.now() - randomInt(0, 86400000 * 7)).toISOString(),
    players,
    bans: {
      left: Array.from({ length: Math.min(teamSize, 3) }, () => randomFromArray(HEROES)),
      right: Array.from({ length: Math.min(teamSize, 3) }, () => randomFromArray(HEROES)),
    },
  };
};

// Match Telemetry - GET /matches/:matchId/:region/telemetry
MockAPI.matchTelemetry = async (matchId, region) => {
  await delay();

  const generateHeroFacts = (heroName) => {
    const heroLower = heroName.toLowerCase();
    return {
      skill: Array.from({ length: 12 }, () =>
        randomFromArray([`${heroLower}_a`, `${heroLower}_b`, `${heroLower}_c`])
      ),
      items: Array.from({ length: randomInt(8, 15) }, () => ({
        Item: randomFromArray(ITEMS),
        Time: `${randomInt(0, 30)}:${randomInt(10, 59).toString().padStart(2, '0')}`,
      })),
      dealt: randomInt(10000, 80000),
      taken: randomInt(10000, 60000),
      healed: randomInt(0, 20000),
      damageShare: randomFloat(10, 40),
      takenShare: randomFloat(10, 40),
      healingShare: randomFloat(0, 30),
    };
  };

  const blueFacts = {};
  const redFacts = {};

  HEROES.forEach(hero => {
    blueFacts[hero] = generateHeroFacts(hero);
    redFacts[hero] = generateHeroFacts(hero);
  });

  return {
    id: matchId,
    facts: {
      blue: blueFacts,
      red: redFacts,
    },
    draft: [
      { Type: 'HeroBan', Team: '1', Hero: randomFromArray(HEROES) },
      { Type: 'HeroBan', Team: '1', Hero: randomFromArray(HEROES) },
      { Type: 'HeroBan', Team: '2', Hero: randomFromArray(HEROES) },
      { Type: 'HeroBan', Team: '2', Hero: randomFromArray(HEROES) },
    ],
    events: Array.from({ length: 50 }, (_, i) => ({
      time: i * 30,
      type: randomFromArray(['KillActor', 'BuyItem', 'SellItem', 'DestroyTurret', 'KillMinion']),
      actor: generatePlayerName(),
      target: randomFromArray([...HEROES, 'Turret', 'Minion']),
      position: { x: randomFloat(0, 100), y: randomFloat(0, 100) },
    })),
  };
};

export default MockAPI;
