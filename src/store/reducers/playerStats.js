/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */

const initialState = {
  name: "",
  filters: {},
  playerStats: [],
  status: "loading"
}

const playerStats = (state = initialState, action) => {
  switch (action.type) {
  
  case "PLAYER/SET_PLAYER_REQUEST": 
    return {
      ...state,
      name: "",
      status: "loading"
    }

  case "PLAYER/SET_PLAYER": 
    return {
      ...state,
      name: action.payload,
      status: "loading"
    }

  case "PLAYER/STATS_FETCH_REQUEST":
    return {
      ...state,
      name: action.payload,
      filters: action.filters,
      status: "loading"
    }
  case "PLAYER/STATS_FETCH_SUCCEEDED":
    return {
      ...state,
      status: "loaded",
      filters: action.filters,
      playerStats: action.payload,
    }
  case "PLAYER/STATS_FETCH_FAILED":
    return {
      ...state,
      status: "error",
      filters: action.filters,
      playerStats: action.payload,
    }
  default:
    return state
  }
}

export default playerStats;