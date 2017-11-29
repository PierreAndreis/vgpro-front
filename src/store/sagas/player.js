import {call, put } from 'redux-saga/effects'

import API from "./../../utils/api";

export function* fetchPlayerStats(action) {
  try {
    const regions = yield call(API.fetchPlayerStats, action.payload);
    yield put({type: "PLAYER/STATS_FETCH_SUCCEEDED", payload: regions});
 } catch (e) {
    yield put({type: "PLAYER/STATS_FETCH_FAILED", payload: e.message});
 }
}
