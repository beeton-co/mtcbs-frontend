import {
//  GET_BETS_BY_BETTOR,
  GET_BETS_FOR_STATUS_BY_BETTOR,
  GET_BETS_FOR_RACE,
  GET_ALL_USER_RACES,
  GET_ALL_USER_BETS,
  GET_CLAIMED_REWARD,
  GET_PAYOUT_REWARD
} from './types';

import * as utils from './utils'
import API from '../api';
//
// export const getUserBets = (address, page) => {
//   return utils.get('/bets/byBettorId/' + address + '/' + page, getUserBetsAsync);
// };

export const getUserBetsWithStatus = (address, status) => {
  return utils.get('/bets/byStatus/' + status + '/' + address, getUserBetsWithStatusAsync);
};

export const getRaceBets = (address, page) => {
  return utils.get('/bets/byRace/' + address + '/' + page, getRaceBetsAsync);
};

export const getUserRaces = (userId) => {
  return getUserData(`user/races/${userId}`, getUserRacesAsync);
};

export const getUserBets = (userId) => {
  return dispatch => {
    API.get(`user/bets/${userId}`)
            .then(response => {
              dispatch(getUserBetsAsync(response.data.entity));
            });
  };
};

export const getUserClaimRewards = (userId) => {
  return dispatch => {
    API.get(`user/claimreward/${userId}`)
            .then(response => {
              dispatch(getClaimedRewardsAsync(response.data));
            });
  };
};

export const getUserPayOutReward = (userId) => {
  return dispatch => {
    API.get(`user/payout/${userId}`)
            .then(response => {
              dispatch(getPayOutRewardsAsync(response.data));
            });
  };
};

function getUserBetsAsync(bets) {
  return utils.async(GET_ALL_USER_BETS, bets);
}

function getUserRacesAsync(bets) {
  return utils.async(GET_ALL_USER_RACES, bets);
}

function getUserBetsWithStatusAsync(bets) {
  return utils.async(GET_BETS_FOR_STATUS_BY_BETTOR, bets);
}

function getRaceBetsAsync(bets) {
  return utils.async(GET_BETS_FOR_RACE, bets);
}

function getClaimedRewardsAsync(rewards) {
  return utils.async(GET_CLAIMED_REWARD, rewards);
}

function getPayOutRewardsAsync(rewards) {
  return utils.async(GET_PAYOUT_REWARD, rewards);
}
export const getUserData = (uri, asyncFunc) => {
  return dispatch => {
    API.get(uri)
            .then(response => {
              let bookie = {};
              bookie["isBookie"] = response.data.success;
              bookie["channel"] = response.data.entity;
              dispatch(asyncFunc(bookie));
            });
  };
};

