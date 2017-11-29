import {call, put } from 'redux-saga/effects'

import API from "./../../utils/api";

export function* lookupPlayer(action) {
  try {
    const regions = yield call(API.lookupPlayer, action.payload);
    
    yield put({type: "REGIONS_FETCH_SUCCEEDED", regions: regions});
 } catch (e) {
    yield put({type: "REGIONS_FETCH_FAILED", message: e.message});
 }
}
