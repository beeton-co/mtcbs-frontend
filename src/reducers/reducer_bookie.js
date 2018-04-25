import {
  GET_CHANNEL_FOR_ADDRESS
} from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_CHANNEL_FOR_ADDRESS:
      return [action.payload, ...state];
    default:
      return state;
  }

}
