import {all, takeLatest} from 'redux-saga/effects'

import {fetchRegions} from "./regions";

export default function *watchMany() {
  yield all([
    takeLatest("REGIONS_FETCH_REQUEST", fetchRegions),
  ])
}