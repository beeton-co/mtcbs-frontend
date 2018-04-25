import {
  GET_ALL_USER_BETS,
  GET_ALL_USER_RACES
} from '../actions/types';

const initialState = {
  bets: {},
  races: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USER_BETS:
      return {
        ...state,
        bets: action.payload
      };
    case GET_ALL_USER_RACES:
      return {
        ...state,
        races: action.payload
      };
    default:
      return state;
  }
}