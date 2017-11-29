import API from "./../utils/api";


export const fetchProFeed = async () => {
/** This is not a redux action */

  return await API.getProFeed();
}

export const fetchLead5 = async () => {
  /** This is not a redux action */
  
  return await API.getLead5();
}

export const lookupPlayer = async (player) => {
  /** This is not a redux action */
  
  return await API.lookupPlayer(player);
}

