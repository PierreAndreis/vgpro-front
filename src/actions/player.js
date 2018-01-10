export const setPlayer = (name) => {
  return {
    type: 'PLAYER/SET_PLAYER_REQUEST',
    payload: name,
  }
}

export const changeFilters = (name, filters) => {
  return {
    type:    'PLAYER/STATS_FETCH_REQUEST',
    payload: name,
    filters: filters
  }
}

export const fetchPlayerMatches = (name, page, filters = {}) => {
  return {
    type: 'PLAYER/MATCHES_FETCH_REQUEST',
    payload: name,
    filters: filters,
    page:    page,
  }
}

export const setPlayerMatches = (page, playerMatches, filters) => {

  return {
    type:             'PLAYER/MATCHES_SET_PAGE',
    page:              page,
    playerMatches:     playerMatches,
    filters:           filters,
  }
}
