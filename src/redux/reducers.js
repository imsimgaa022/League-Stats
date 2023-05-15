import { FETCH_ALL_DATA, FETCH_ALL_DATA_FAILURE, FETCH_ALL_DATA_SUCCESS, RESET_USER_DATA, SET_ITEM_DATA, SET_PATCH_VERSION } from "./actions";

const initialState = {
  isLoading: true,
  data: null,
  error: null,
  items: null,
  patchVersion: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DATA:
      return { ...state, isLoading: true };
    case FETCH_ALL_DATA_SUCCESS:
      return { ...state, isLoading: false, data: action.payload.data };
    case FETCH_ALL_DATA_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };
    case RESET_USER_DATA:
      return {...state, isLoading: false, data: null};
    case SET_ITEM_DATA:
      return {...state, items: action.payload};
    case SET_PATCH_VERSION:
      return {...state, patchVersion: action.payload.data[0]};
    default:
      return state;
  }
};
