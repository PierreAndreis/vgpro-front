import { combineReducers } from 'redux'

import i18n           from "./i18n";
import playerStats    from "./playerStats";
import playerMatches  from "./playerMatches";

const reducers = combineReducers({
  i18n,
  playerStats,
  playerMatches
})

export default reducers;