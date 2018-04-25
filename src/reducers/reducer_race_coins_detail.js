import {
  GET_DETAIL_RACE_COIN_INFORMATION
} from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_DETAIL_RACE_COIN_INFORMATION:
      return [action.payload, ...state];
    default:
      return state;
  }

}
