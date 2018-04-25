import {
  GET_ALL_COINS,
  GET_COINS_FOR_IDS,
  GET_DETAIL_RACE_COIN_INFORMATION
} from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_ALL_COINS:
    case GET_COINS_FOR_IDS:
    case GET_DETAIL_RACE_COIN_INFORMATION:
      return [action.payload, ...state];
    default:
      return state;
  }

}
