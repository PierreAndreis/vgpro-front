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

export const removePlayersMatches = (name, qnty) => {
  return {
    type:    'PLAYER/MATCHES_REMOVE_PAGE',
    payload: name,
    qnty:    qnty,
  }
}
