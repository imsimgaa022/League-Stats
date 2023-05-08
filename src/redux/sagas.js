import { message } from "antd";
import { all, call, put, takeEvery } from "redux-saga/effects";
import RiotApiService from "../api/apiEndpoints";
import {
  fetchAllDataFailure,
  fetchAllDataSuccess,
  FETCH_ALL_DATA,
  resetUserData,
  RESET_USER,
} from "./actions";

function* fetchAllDataSaga(action) {
  try {
    const data = yield call(RiotApiService.fetchAllData, action?.payload);
    yield put(fetchAllDataSuccess(data));
    action.redirect()
  } catch (error) {
    yield put(fetchAllDataFailure(error.message));
    message.error("User not found!!!", 3);
  }
}

function* resetUserSaga() {
  try {
    yield put(resetUserData());
  } catch (err) {
    console.log('err', err)
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(FETCH_ALL_DATA, fetchAllDataSaga),
    takeEvery(RESET_USER, resetUserSaga),
  ]);
}