import {all, takeLatest} from 'redux-saga/effects'

import {fetchPlayerStats, fetchPlayerMatches, fetchPlayerMatchesPage} from "./player";

export default function *watchMany() {
  yield all([
    takeLatest("PLAYER/STATS_FETCH_REQUEST", fetchPlayerStats),
    takeLatest("PLAYER/MATCHES_FETCH_REQUEST", fetchPlayerMatches),
    takeLatest("PLAYER/MATCHES_ADD_REQUEST", fetchPlayerMatchesPage),
  ])
}