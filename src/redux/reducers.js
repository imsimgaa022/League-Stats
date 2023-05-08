import { FETCH_ALL_DATA, FETCH_ALL_DATA_FAILURE, FETCH_ALL_DATA_SUCCESS, RESET_USER_DATA } from "./actions";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
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
    default:
      return state;
  }
};
