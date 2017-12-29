import { combineReducers } from 'redux'

import i18n           from "./i18n";
import playerStats    from "./playerStats";
import playerMatches  from "./playerMatches";

// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/es/storage';

// let persistConfig = {
//   key: 'i18n',
//   storage,
// }

const reducers = combineReducers({
  // We are not persisting till later on once we have all translations
  // i18n: persistReducer(persistConfig, i18n),
  i18n,
  playerStats,
  playerMatches
})

export default reducers;