import { createStore, applyMiddleware } from 'redux'

import createSagaMiddleware from 'redux-saga'

import reducers from "./reducers";

import Sagas from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(
  reducers,
  applyMiddleware(
    sagaMiddleware
  )
)


// then run the saga
sagaMiddleware.run(Sagas)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => {
  console.log(store.getState());
})

export default store;