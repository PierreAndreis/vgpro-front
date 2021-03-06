import API from "./../utils/api";


export const fetchProFeed = async () => {
/** This is not a redux action */

  return await API.getProFeed();
}

export const fetchLeaderboard = async (mode, region, filterArgs) => {
  /** This is not a redux action */
  
  return await API.getLead5(mode, region, filterArgs);
}

export const fetchTopHeroes = async (region) => {
  /** This is not a redux action */
  
  return await API.getTopHeroes(region);
}

export const fetchHero = async (heroName, region = "all") => {
  /** This is not a redux action */
  
  return await API.getHero(heroName, region);
}

export const fetchHeroHistory = async (heroName, options = {}) => {
  /** This is not a redux action */
  
  return await API.getHeroHistory(heroName, options);
}


export const lookupPlayer = async (player) => {
  /** This is not a redux action */
  
  return await API.lookupPlayer(player);
}

export const fetchMatchDetails = async (matchId, region) => {
  /** This is not a redux action */
  
  return await API.matchDetails(matchId, region);
}
export const fetchMatchTelemetry = async (matchId, region) => {
  /** This is not a redux action */
  
  return await API.matchTelemetry(matchId, region);
}
