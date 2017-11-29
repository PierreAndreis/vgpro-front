import {all, takeLatest} from 'redux-saga/effects'

// import {fetchRegions} from "./regions";
import {fetchPlayerStats} from "./player";

export default function *watchMany() {
  yield all([
    takeLatest("PLAYER/STATS_FETCH_REQUEST", fetchPlayerStats),
  ])
}