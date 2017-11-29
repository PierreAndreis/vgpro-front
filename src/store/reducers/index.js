import { combineReducers } from 'redux'

import i18n       from "./i18n";
import player     from "./player";

const reducers = combineReducers({
  i18n,
  player
})

export default reducers;