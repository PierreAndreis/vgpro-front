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
  currentPage: 0,
  playerMatches: {},
}

const playerMatches = (state = initialState, action) => {
  switch (action.type) {
  case "PLAYER/MATCHES_FETCH_REQUEST":
    return {
      ...state,
      name: action.payload,
      currentPage: action.page,
      playerMatches: {
        ...state.playerMatches,
        [action.page]: {
          status: "loading"
        }
      }
    }
  case "PLAYER/MATCHES_FETCH_SUCCEEDED":
    return {
      ...state,
      playerMatches: {
        ...state.playerMatches,
        [action.page]: {
          status: "loaded",
          payload: action.payload
        }
      }
    }
  case "PLAYER/MATCHES_FETCH_FAILED":
    return {
      ...state,
      playerMatches: {
        ...state.playerMatches,
        [action.page]: {
          status: "loaded",
          payload: action.payload
        }
      }
    }

  case "PLAYER/MATCHES_REMOVE_PAGE":
    
    return {
      ...state,
      currentPage: state.currentPage - action.qnty,
    }


  default:
    return state
  }
}

export default playerMatches;