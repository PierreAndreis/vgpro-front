import {call, put } from 'redux-saga/effects'

import API from "./../../utils/api";

export function* fetchPlayerStats(action) {
  try {
    const playerStats = yield call(API.fetchPlayerStats, action.payload);
    if (!playerStats) throw new Error("Error while loading stats");
    yield put({type: "PLAYER/STATS_FETCH_SUCCEEDED", payload: playerStats});
 } catch (e) {
    yield put({type: "PLAYER/STATS_FETCH_FAILED", payload: e.message});
 }
}

export function* fetchPlayerMatches(action) {
  try {
    const playerMatches = yield call(API.fetchPlayerMatches, action.payload, action.filters);
    if (!playerMatches) throw new Error("Error while loading matches");
    yield put({type: "PLAYER/MATCHES_FETCH_SUCCEEDED", payload: playerMatches});
 } catch (e) {
    yield put({type: "PLAYER/MATCHES_FETCH_FAILED", payload: e.message});
 }
}