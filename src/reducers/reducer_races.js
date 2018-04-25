import {
  GET_COMPLETED_RACES,
  GET_VOID_RACES,
  GET_BETTING_RACES,
  GET_CREATED_RACES,
  GET_RUNNING_RACES,
  GET_RACES_FOR_CHANNEL,
  GET_RACES_BY_STATUS
} from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_COMPLETED_RACES:
    case GET_VOID_RACES:
    case GET_BETTING_RACES:
    case GET_RACES_BY_STATUS:
    case GET_CREATED_RACES:
        return [action.payload, ...state];
    case GET_RUNNING_RACES:
        return [action.payload, ...state];
    case GET_RACES_FOR_CHANNEL:
      return [action.payload, ...state];
    default:
      return state;
  }

}
