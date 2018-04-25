import {
  GET_ALL_CHANNEL, GET_CHANNEL_FOR_ADDRESS,
  GET_CHANNEL_FOR_ID
} from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_ALL_CHANNEL:
    case GET_CHANNEL_FOR_ID:
    case GET_CHANNEL_FOR_ADDRESS:
      return [action.payload, ...state];
    default:
      return state;
  }

}
