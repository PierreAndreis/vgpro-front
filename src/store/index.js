import {compose, createStore, applyMiddleware } from 'redux'

import createSagaMiddleware from 'redux-saga';

import { persistStore } from 'redux-persist';

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
  )
)

// We are storing some of the states in the localstorage.
// Then the persist will replace the defaults, and after that, the request will be succeed and replace the persisted.
persistStore(store);

// then run the saga
sagaMiddleware.run(Sagas);

export default store;