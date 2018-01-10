import {all, takeLatest} from 'redux-saga/effects'

import {fetchPlayerStats, fetchPlayerMatches, setPlayer} from "./player";

export default function *watchMany() {
  yield all([
    takeLatest("PLAYER/SET_PLAYER_REQUEST", setPlayer),
    takeLatest("PLAYER/STATS_FETCH_REQUEST", fetchPlayerStats),
    takeLatest("PLAYER/MATCHES_FETCH_REQUEST", fetchPlayerMatches),
  ])
}