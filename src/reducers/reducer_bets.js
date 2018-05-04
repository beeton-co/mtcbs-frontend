import _ from 'lodash';

import {
  GET_BETS_BY_BETTOR,
  GET_BETS_FOR_STATUS_BY_BETTOR,
  GET_BETS_FOR_RACE,
  GET_CLAIMED_REWARD,
  GET_PAYOUT_REWARD
} from '../actions/types';


const initialState = {
  claimedRewards: [],
  payout: []
};
export default function (state = initialState, action) {

  switch (action.type) {
    case GET_BETS_BY_BETTOR:
      let bets = [...state];
      _.forEach(action.payload, function (value) {
        bets.push(value);
      });
      return bets;
    case GET_BETS_FOR_STATUS_BY_BETTOR:
    case GET_BETS_FOR_RACE:
      return [action.payload, ...state];
    case GET_PAYOUT_REWARD:
      return {
        ...state,
        payout: action.payload
      };
    case GET_CLAIMED_REWARD:
      return {
        ...state,
        claimedRewards: action.payload
      };
    default:
      return state;
  }

}
