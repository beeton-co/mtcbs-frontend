import {
  GET_COIN_FOR_ID,
  GET_ALL_COINS,
  GET_COINS_FOR_IDS,
  GET_DETAIL_RACE_COIN_INFORMATION
} from './types';

import API from '../api';

export const getDetailRaceCoins = (status, race) => {
  if (status === 'running') {
    //load from contract
  } else {
    //load from server

  }

  return dispatch => {
    API.get(`coins/detail/${race}`)
            .then(response => {
              dispatch(getDetailCoinsAsync(response.data));
            });
  };

};
export const getCoins = (offset) => {
  return dispatch => {
    API.get(`coins/all/${offset}`)
            .then(response => {
              dispatch(getCoinsAsync(response.data));
            });
  };
};

export const getCoinsForIds = (ids) => {
  return dispatch => {
    API.get("coins/for_ids", {
      params: {
        format: 'json',
        coinId: ids
      }
    }).then(response => {
      dispatch(getCoinsIdsAsync(response.data));
    });
  };
};

export const getCoin = (coinId) => {
  return dispatch => {
    API.get(`coins/${coinId}`)
            .then(response => {
              dispatch(getCoinForIdAsync(response.data));
            });
  };
};

function getCoinForIdAsync(coin) {
  return async(GET_COIN_FOR_ID, coin);
}

function getCoinsAsync(coin) {
  return async(GET_ALL_COINS, coin);
}

function getDetailCoinsAsync(coin) {
  return async(GET_DETAIL_RACE_COIN_INFORMATION, coin);
}

function getCoinsIdsAsync(coin) {
  return async(GET_COINS_FOR_IDS, coin);
}

function async(type, payload) {
  return {
    type: type,
    payload: payload
  };
}