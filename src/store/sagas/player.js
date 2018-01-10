import {call, put } from 'redux-saga/effects'

import API from "./../../utils/api";

const defaultFilter = {
  gameMode: "",
  season: ""
};

// THERE IS A HUGE HACK HERE.
// We need to wait for player/find to resolve before fetching matches and player stats
// So, we will set player request first which will put the playerName as undefined.
// As soon as we done fetching, we will call stats_fetch_request so they can start fetching user
// This is due to matches and player stats being requested at the same time
// and making us waste 12 calls to find the player region.
// In the future, we should be more smart about region. Like saving on redis for every match all the participants id/region/name.

export function* setPlayer(action) {
  try {
    yield call(API.lookupPlayer, action.payload);
    yield put({type: "PLAYER/SET_PLAYER"         , payload: action.payload, filters: defaultFilter});
    yield put({type: "PLAYER/STATS_FETCH_REQUEST", payload: action.payload, filters: defaultFilter});
 } catch (e) {
    yield put({type: "PLAYER/STATS_FETCH_FAILED", payload: e.message, filters: defaultFilter});
 }
}


export function* fetchPlayerStats(action) {
  try {
    const playerStats = yield call(API.fetchPlayerStats, action.payload, action.filters);
    if (!playerStats) throw new Error("Error while loading stats");
    yield put({type: "PLAYER/STATS_FETCH_SUCCEEDED", payload: playerStats, filters: action.filters});
  } catch (e) {
    yield put({type: "PLAYER/STATS_FETCH_FAILED", payload: e.message, filters: action.filters});
  }
}

export function* fetchPlayerMatches(action) {
  try {

    console.warn(action.filters);

    const playerMatches = yield call(
      API.fetchPlayerMatches, 
      action.payload, 
      {page: action.page, ...action.filters}
    );

    if (!playerMatches) throw new Error("Error while loading matches");

    yield put({
      type: "PLAYER/MATCHES_FETCH_SUCCEEDED", 
      payload: playerMatches, 
      page: action.page
    });
  } catch (e) {
    yield put({
      type: "PLAYER/MATCHES_FETCH_FAILED", 
      payload: e.message, 
      page: action.page
    });
 }
}