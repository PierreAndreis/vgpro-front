export const addRecent = (player) => {
  return {
    type: 'USER_ADD_RECENT',
    payload: player,
  }
};

export const addFavorite = (player) => {
  return {
    type: 'USER_ADD_FAVORITE',
    payload: player,
  }
}

export const setRecent = (recents) => {
  return {
    type: 'USER_SET_RECENT',
    payload: recents
  }
}

export const setFavorite = (favorites) => {
  return {
    type: 'USER_SET_FAVORITE',
    payload: favorites
  }
}