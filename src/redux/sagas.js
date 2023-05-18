import { all, call, put, takeEvery } from "redux-saga/effects";
import RiotApiService from "../api/apiEndpoints";
import {
  fetchAllDataFailure,
  fetchAllDataSuccess,
  FETCH_ALL_DATA,
  GET_CHALLANGER_QUE,
  GET_ITEM_DATA,
  GET_PATCH_VERSION,
  GET_SUMMONER_SPELLS,
  GET_USER_LIVE_GAME,
  resetUserData,
  RESET_USER,
  setChallangerQue,
  setItemData,
  setPatchVersion,
  setSummonerSpells,
  setUserLiveGame,
} from "./actions";

function* fetchAllDataSaga({ payload }) {
  try {
    const data = yield call(RiotApiService.fetchAllData, payload?.summoner_name);
    yield put(fetchAllDataSuccess(data));
  } catch (error) {
    yield put(fetchAllDataFailure(error.message));
  }
}

function* resetUserSaga() {
  try {
    yield put(resetUserData());
  } catch (err) {
    console.log('err', err)
  }
}

function* fetchItemDataSaga() {
  try {
    const data = yield call(RiotApiService.getItemData);
    yield put(setItemData(data.data));
  } catch (error) {
    console.log(error);
  };
};

function* getPatchVersionSaga() {
  try {
    const data = yield call(RiotApiService.getPatchVersion);
    yield put(setPatchVersion(data));
  } catch (err) {
    console.log(err);
  }
};

function* getChallangerQueSaga({ payload }) {
  try {
    const data = yield call(RiotApiService.getChallangerQue, payload.que, payload.league);
    yield put(setChallangerQue(data));
  } catch (err) {
    console.log(err);
  };
};

function* getSummonerSpellsSaga({payload}) {
  try {
    const data = yield call(RiotApiService.getSummonerSpells, payload?.patchVersion);
    yield put(setSummonerSpells(data));
  } catch (err) {
    console.log(err);
  }
}

function* getUserLiveGameSaga({payload}) {
  try {
    const data = yield call(RiotApiService.getPlayerLiveGame, payload?.summonerId);
    yield put(setUserLiveGame(data));
  } catch (err) {
    console.log(err);
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(FETCH_ALL_DATA, fetchAllDataSaga),
    takeEvery(RESET_USER, resetUserSaga),
    takeEvery(GET_ITEM_DATA, fetchItemDataSaga),
    takeEvery(GET_PATCH_VERSION, getPatchVersionSaga),
    takeEvery(GET_CHALLANGER_QUE, getChallangerQueSaga),
    takeEvery(GET_SUMMONER_SPELLS, getSummonerSpellsSaga),
    takeEvery(GET_USER_LIVE_GAME, getUserLiveGameSaga),
  ]);
};