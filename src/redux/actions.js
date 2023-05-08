export const FETCH_ALL_DATA = "FETCH_ALL_DATA";
export const FETCH_ALL_DATA_SUCCESS = "FETCH_ALL_DATA_SUCCESS";
export const FETCH_ALL_DATA_FAILURE = "FETCH_ALL_DATA_FAILURE";
export const RESET_USER = "RESET_USER";
export const RESET_USER_DATA = "RESET_USER_DATA";

export const fetchAllData = (summonerName, redirect) => ({
  type: FETCH_ALL_DATA,
  payload: summonerName,
  redirect: redirect,
});

export const fetchAllDataSuccess = (data) => ({
  type: FETCH_ALL_DATA_SUCCESS,
  payload: { data },
});

export const fetchAllDataFailure = (error) => ({
  type: FETCH_ALL_DATA_FAILURE,
  payload: { error },
});

export const resetUserData = () => ({
  type: RESET_USER_DATA,
});

export const resetUserAction = () => ({
  type: RESET_USER,
});
