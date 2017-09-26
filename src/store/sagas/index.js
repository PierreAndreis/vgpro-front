import {takeLatest} from 'redux-saga/effects'


import {fetchRegions} from "./searchbar";

export default function *watchMany() {
  yield [
    takeLatest("REGIONS_FETCH_REQUEST", fetchRegions),
  ]
}