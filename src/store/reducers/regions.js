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

 const defaultRegion = {
  name: "North America",
  Region: "na",
  Status: "1",
  Tag:  "NA",
 }

const initialState = {
  region:           defaultRegion,
  openMenu:         false,
  recentlySearched: [],
  regions:          [],
  regionStatus:     null,
  regionMessage:    null,
}

const searchbar = (state = initialState, action) => {
  switch (action.type) {

  case 'REGION_SWITCH':
    return {
      ...state,
      region: action.region,
      openMenu: false
    }

  case 'REGION_TOGGLE':
    return {
      ...state,
      openMenu: !state.openMenu,
    }

  case 'REGIONS_FETCH_REQUEST':
    return {
      ...state,
      regionStatus: "loading"
    }
  
  case 'REGIONS_FETCH_SUCCEEDED':
    return {
      ...state,
      regionStatus: "loaded",
      regions: action.regions
    }

  case 'REGIONS_FETCH_FAILED':
  return {
    ...state,
    regionStatus:  "error",
    regionMessage: action.message
  }
  default:
    return state
  }
}

export default searchbar;