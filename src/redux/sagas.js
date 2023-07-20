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
  LOGIN_USER,
  REGISTER_USER,
  resetUserData,
  RESET_USER,
  setChallangerQue,
  setItemData,
  setPatchVersion,
  setSummonerSpells,
  setUserLiveGame,
} from "./actions";
import { auth } from '../firebase/firebase';
import { message } from "antd";

function* fetchAllDataSaga({ payload }) {
  try {
    const data = yield call(RiotApiService.fetchAllData, payload?.summoner_name, payload?.region);
    yield put(fetchAllDataSuccess(data));
    payload?.setIsLoading(false);
  } catch (error) {
    yield put(fetchAllDataFailure(error.message));
    payload?.setIsLoading(false);
  }
}

function* loginUserSaga({ payload }) {
  try {
    const userCredential = yield call(
      [auth, auth.signInWithEmailAndPassword],
      payload.email,
      payload.password
    );
    const user = userCredential.user;
    const userEmail = user?.email;
    const idToken = yield call([user, user.getIdToken]);
    
    if (!user?.emailVerified) {
      message.error("Please verify your email before logging in.", 3);
      return;
    }

    localStorage.setItem('accessToken', idToken);
    yield put({ type: 'SET_TOKEN', payload: idToken });
    yield put({ type: 'SET_USER', payload: { email: userEmail } });
    message.success(`Welcome back ${userEmail?.split("@")[0]}!`, 2);
  } catch (error) {
    console.log(error)
    let errorMessage = error.message;
    const startIdx = errorMessage.indexOf(':') + 1;
    const endIdx = errorMessage.indexOf('(');
    if (startIdx !== -1 && endIdx !== -1) {
      errorMessage = errorMessage.slice(startIdx, endIdx).trim();
    }
    message.error(errorMessage, 3);
  }
}

function* registerUserSaga({ payload }) {
  try {
    const userCredential = yield call([auth, auth.createUserWithEmailAndPassword], payload.email, payload.password);
    const user = userCredential.user;

    yield call([user, user.sendEmailVerification]);
    
    payload?.handleNotification()

  } catch (error) {
    let errorMessage = error.message;
    const startIdx = errorMessage.indexOf(':') + 1;
    const endIdx = errorMessage.indexOf('(');
    if (startIdx !== -1 && endIdx !== -1) {
      errorMessage = errorMessage.slice(startIdx, endIdx).trim();
    }
    message.error(errorMessage, 3);
  }
}

function* resetUserSaga() {
  try {
    yield put(resetUserData());
  } catch (err) {
    console.log('err', err)
  }
}

function* fetchItemDataSaga({ payload }) {
  try {
    const data = yield call(RiotApiService.getItemData, payload?.patchVersion);
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
    const data = yield call(RiotApiService.getChallangerQue, payload.que, payload.league, payload?.region);
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
    const data = yield call(RiotApiService.getPlayerLiveGame, payload?.summonerId, payload?.region);
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
    takeEvery(LOGIN_USER, loginUserSaga),
    takeEvery(REGISTER_USER, registerUserSaga),
  ]);
};