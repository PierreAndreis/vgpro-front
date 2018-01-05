const initialState = {
  favorites:        [],
  recents:          [],
}

const user = (state = initialState, action) => {
  switch (action.type) {

  case 'USER_ADD_RECENT':
    return {
      ...state,
      recents:   [action.payload, ...state.recents],
    }
  case 'USER_ADD_FAVORITE':
    return {
      ...state,
      favorites: [action.payload, ...state.favorites]
    }

  case 'USER_SET_FAVORITE':
    return {
      ...state,
      favorites: action.payload
    }
  case 'USER_SET_RECENT': 
    return {
      ...state,
      recents: action.payload
    }
  default:
    return state
  }
}

export default user;