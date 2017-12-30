import API from "./../utils/api";


export const fetchProFeed = async () => {
/** This is not a redux action */

  return await API.getProFeed();
}

export const fetchLead5 = async () => {
  /** This is not a redux action */
  
  return await API.getLead5();
}

export const fetchTopHeroes = async (type, region) => {
  /** This is not a redux action */
  
  return await API.getTopHeroes(type, region);
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

export const fetchLeaderboards = async (region) => {
  return await API.getLeaders(region);
}
