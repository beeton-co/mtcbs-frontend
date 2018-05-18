import {
  GET_COIN_FOR_ID,
  GET_ALL_COINS,
  GET_COINS_FOR_IDS,
  GET_DETAIL_RACE_COIN_INFORMATION
} from './types';
import API from '../api';
import * as utils from './utils';
import CountdownLatch from './countdownlatch';

const PRECISION = 100000;
const UPDATE_INTERVAL = 5 * 60 * 1000;

export const getDetailRaceCoins = (status, race) => {
  const coins = priceEngine["prices"][race];
  let available = utils.nonNull(coins);

  if (status === 'running') {
    //load from contract
    return dispatch => {
      //dont perform any server request if already available in local cache
      if (available) {
        dispatch(getDetailCoinsAsync(coins));
      } else {
        API.get(`coins/detail/${race}`)
                .then(response => {
                  processRaceCoinPrices(race, status, response.data, getDetailCoinsAsync, dispatch);
                });
      }
    };
  } else {
    //load from server

    return dispatch => {
      //dont perform any server request if already available in locale cache
      if (available) {
        dispatch(getDetailCoinsAsync(coins));
      } else {
        API.get(`coins/detail/${race}`)
                .then(response => {
                  processRaceCoinPrices(race, status, response.data, getDetailCoinsAsync, dispatch);
                });
      }
    };
  }

};
export const getCoins = (offset) => {
  return dispatch => {
    API.get(`coins/all/${offset}`)
            .then(response => {
              if (utils.isNull(priceEngine.coinOffset)) {
                priceEngine["availableCoins"] = response.data.hits;
              }else{
                //let availCoins = [];
                //availCoins.pushAll(response.data);
                //availCoins.pushAll()
              }
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

export function getAvailableCoins() {
  return priceEngine["availableCoins"];
}

export function getCoinSymbol(coinId) {
  const coins = getAvailableCoins();
  for (let i = 0; i < coins.length; i++) {
    if (coins[i].id === coinId) {
      return coins[i].symbol;
    }
  }
  return '';
}

export function getCachedCoin(coinId) {
  const coins = getAvailableCoins();
  for (let i = 0; i < coins.length; i++) {
    if (coins[i].id === parseInt(coinId, 10)) {
      return coins[i];
    }
  }
  return undefined;
}

//global variable to store prices
//if (utils.isNull(localStorage.getItem("priceEngine"))) {
//localStorage.setItem('priceEngine', JSON.stringify({"prices": {}}));
//}

const priceEngine = {};
priceEngine["prices"] = {};
priceEngine["availableCoins"] = [];

function processRaceCoinPrices(race, status, data, callback, dispatch) {
  if (utils.nonNull(data.coins)) {
    let coins = toList(data.coins);
    if (coins.length > 0) {
      let processedCoins = [];
      if ('running' === status || 'betting' === status) {
        let countdownlatch = new CountdownLatch(coins.length);
        countdownlatch.await(function () {

          processedCoins.sort(function (a, b) {
            return b.change - a.change;
          });

          data["coins"] = processedCoins;
          data["lastUpdate"] = new Date().getTime();
          storePrice(race, data);
          dispatch(callback(data));
        });

        coins.forEach(function (value) {
          countdownlatch.async(function (done) {
            fetchTicker(value, done, processedCoins);
          })
        });

      } else if ('completed' === status) {
        coins.forEach(function (value) {
          value["change"] = (((value.endPrice - value.startPrice) / value.startPrice) * 100).toFixed(5);
          value["endPrice"] = (value.endPrice / PRECISION).toFixed(5);
          value["startPrice"] = (value.startPrice / PRECISION).toFixed(5);
        });
        coins.sort(function (a, b) {
          return b.change - a.change;
        });
        data["coins"] = coins;
        storePrice(race, data);
        dispatch(callback(data));
      }
    }
  }
}

function fetchTicker(value, outterDone, processedCoins) {
  let size = value.endpoints.length;
  let ticker = 0;
  let countdownlatch = new CountdownLatch(size);

  countdownlatch.await(function () {
    value["currentPrice"] = ((ticker / size) / PRECISION).toFixed(5);
    value["startPrice"] = ((value.startPrice) / PRECISION).toFixed(5);
    value["lastUpdate"] = new Date().getTime();
    value["change"] = (((value["currentPrice"] - value.startPrice) / value.startPrice) * 100).toFixed(5);
    processedCoins.push(value);
    outterDone();
  });

  value.endpoints.forEach(function (endpoint) {
    countdownlatch.async(function (done) {
      API.get(endpoint)
              .then(response => {
                if (endpoint.indexOf("coinmarketcap") > 1) {
                  ticker += PRECISION * response.data[0].price_usd;
                } else {
                  ticker += PRECISION * response.data.USD;
                }
                done();
              });
    })
  });
}

// function toMap(obj) {
//   let map = new Map();
//   for (let k of Object.keys(obj)) {
//     map.set(k, obj[k]);
//   }
//   return map;
// }

function toList(obj) {
  let list = [];
  for (let k of Object.keys(obj)) {
    list.push(obj[k]);
  }
  return list;
}

function getPriceEngine() {
  //return JSON.parse(localStorage.getItem('priceEngine'));
  return priceEngine;
}

function getPrices() {
  const priceEngine = getPriceEngine();
  return priceEngine["prices"];
}

function storePrice(race, data) {
  const pe = getPriceEngine();
  const prices = pe["prices"];
  prices[race] = data;
  //pe["prices"] = prices;
  //localStorage.setItem('priceEngine', JSON.stringify(priceEngine));
  priceEngine["prices"] = prices;
}

/**
 * verifies if a race already has its coins information stored in the local cache.
 * If race is either in a running or betting phase the last update is being taken into consideration.
 * @param raceId
 * @returns {boolean}
 */
export function hasPrice(raceId) {
  const prices = getPrices();
  const coins = prices[raceId];

  if (utils.isNull(coins)) {
    return false;
  } else {
    const lastUpdate = coins["lastUpdate"];
    if (utils.isNull(lastUpdate)) {
      return true;
    }
    const currentTime = new Date().getTime();
    return (lastUpdate + UPDATE_INTERVAL) > currentTime;
  }
}


export function getPriceInfo(race) {
  return getPrices()[race];
}

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
