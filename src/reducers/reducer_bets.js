import _ from 'lodash';

import {
  GET_BETS_BY_BETTOR,
  GET_BETS_FOR_STATUS_BY_BETTOR,
  GET_BETS_FOR_RACE
} from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
      case GET_BETS_BY_BETTOR:
        let bets = [...state];
        _.forEach(action.payload, function (value) {
          bets.push(value);
        })
      return bets;
    case GET_BETS_FOR_STATUS_BY_BETTOR:
    case GET_BETS_FOR_RACE:
      return [action.payload, ...state];
    default:
      return state;
  }

}
