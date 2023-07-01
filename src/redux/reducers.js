import { FETCH_ALL_DATA, FETCH_ALL_DATA_FAILURE, FETCH_ALL_DATA_SUCCESS, GET_CHALLANGER_QUE, GET_ITEM_DATA, RESET_USER_DATA, SET_CHALLANGER_QUE, SET_ITEM_DATA, SET_PATCH_VERSION, SET_SUMMONER_SPELLS, SET_USER_LIVE_GAME } from "./actions";

const initialState = {
  isLoading: true,
  data: null,
  error: null,
  items: null,
  patchVersion: null,
  challangerQue: null,
  summonerSpells: null,
  liveGame: null,
};
//create more reducers to store different data
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DATA:
      return { ...state, isLoading: true, data: null, liveGame: null };
    case FETCH_ALL_DATA_SUCCESS:
      return { ...state, isLoading: false, data: action.payload.data };
    case FETCH_ALL_DATA_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };
    case RESET_USER_DATA:
      return {...state, isLoading: false, data: null};
    case SET_ITEM_DATA:
      return {...state, isLoading: false, items: action.payload};
    case SET_PATCH_VERSION:
      return {...state, patchVersion: action.payload.data[0]};
    case GET_CHALLANGER_QUE:
      return {...state, isLoading: true};
    case GET_ITEM_DATA:
      return {...state, isLoading: true};
    case SET_CHALLANGER_QUE:
      return {...state, isLoading: false, challangerQue: action.payload};
    case SET_SUMMONER_SPELLS:
      return {...state, isLoading: false, summonerSpells: action.payload};
    case SET_USER_LIVE_GAME:
      return {...state, isLoading: false, liveGame: action.payload};
    default:
      return state;
  }
};
