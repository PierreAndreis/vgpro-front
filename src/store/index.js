import {compose, createStore, applyMiddleware } from 'redux'

import createSagaMiddleware from 'redux-saga';

import {persistStore, autoRehydrate} from 'redux-persist';

import reducers from "./reducers";
import Sagas from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(
  reducers,
  undefined,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
    autoRehydrate()
  )
)

// We are storing some of the states in the localstorage.
// It's okay to store regions, since we will be fetching everytime anyways.
// We will be fetching because Searchbar.jsx will mount before the persist is back, and it will try to fetch the request from API
// Then the persist will replace the defaults, and after that, the request will be succeed and replace the persisted.
persistStore(store, {
  whitelist: ["i18n", "regions"]
});
// then run the saga
sagaMiddleware.run(Sagas)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => {
  // console.log(store.getState());
})

export default store;