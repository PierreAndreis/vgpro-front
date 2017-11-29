export const fetchPlayerStats = (name) => {
  return {
    type: 'PLAYER/STATS_FETCH_REQUEST',
    payload: name
  }
}
