export const FETCH_ALL_DATA = "FETCH_ALL_DATA";
export const FETCH_ALL_DATA_SUCCESS = "FETCH_ALL_DATA_SUCCESS";
export const FETCH_ALL_DATA_FAILURE = "FETCH_ALL_DATA_FAILURE";
export const RESET_USER = "RESET_USER";
export const RESET_USER_DATA = "RESET_USER_DATA";
export const GET_ITEM_DATA = "GET_ITEM_DATA";
export const SET_ITEM_DATA = "SET_ITEM_DATA";
export const GET_PATCH_VERSION = "GET_PATCH_VERSION";
export const SET_PATCH_VERSION = "SET_PATCH_VERSION";

export const fetchAllData = (payload) => ({
  type: FETCH_ALL_DATA,
  payload: payload,
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

export const getItemData = () => ({
  type: GET_ITEM_DATA,
});

export const setItemData = (payload) => ({
  type: SET_ITEM_DATA,
  payload: payload
});

export const getPatchVersion = () => ({
  type: GET_PATCH_VERSION, 
});

export const setPatchVersion = (payload) => ({
  type: SET_PATCH_VERSION,
  payload: payload
});
