import {
  //GET_ALL_COINS,
  GET_COIN_FOR_ID
} from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_COIN_FOR_ID:
      return [action.payload, ...state];
    default:
      return state;
  }

}
