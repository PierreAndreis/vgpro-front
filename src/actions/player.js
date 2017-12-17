export const fetchPlayerStats = (name) => {
  return {
    type: 'PLAYER/STATS_FETCH_REQUEST',
    payload: name
  }
}
export const fetchPlayerMatches = (name, page) => {
  return {
    type: 'PLAYER/MATCHES_FETCH_REQUEST',
    payload: name,
    page:    page,
  }
}

export const setPlayerMatches = (page, playerMatches) => {

  console.log(page, playerMatches);
  return {
    type:             'PLAYER/MATCHES_SET_PAGE',
    page:              page,
    playerMatches:     playerMatches,
  }
}
