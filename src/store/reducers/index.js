import { combineReducers } from 'redux'

import i18n           from "./i18n";
import playerStats    from "./playerStats";
import playerMatches  from "./playerMatches";
import user           from "./user";

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

let persistConfig = {
  key: 'user',
  storage,
}

const reducers = combineReducers({
  // We are not persisting till later on once we have all translations
  // i18n: persistReducer(persistConfig, i18n),
  user: persistReducer(persistConfig, user),
  i18n,
  playerStats,
  playerMatches
})

export default reducers;