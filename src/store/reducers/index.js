import { combineReducers } from 'redux'

import i18n       from "./i18n";
import regions  from "./regions";

const reducers = combineReducers({
  i18n,
  regions
})

export default reducers;