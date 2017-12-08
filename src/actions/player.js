export const fetchPlayerStats = (name) => {
  return {
    type: 'PLAYER/STATS_FETCH_REQUEST',
    payload: name
  }
}
export const fetchPlayerMatches = (name, filters) => {
  return {
    type: 'PLAYER/MATCHES_FETCH_REQUEST',
    payload: name,
    filters: filters,
  }
}
