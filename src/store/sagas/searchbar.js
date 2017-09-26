import {call, put } from 'redux-saga/effects'

import {getServers} from "./../../api";

export function* fetchRegions(action) {
  try {
    const regions = yield call(getServers);
    yield put({type: "REGIONS_FETCH_SUCCEEDED", regions: regions});
 } catch (e) {
    yield put({type: "REGIONS_FETCH_FAILED", message: e.message});
 }
}
