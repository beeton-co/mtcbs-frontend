import Controller from '../blockchain/Controller.json';
import Race from '../blockchain/Race.json';
import * as notification from '../services/notification';
import {
  DETECT_ETHEREUM_NETWORK,
  LOAD_CONTROLLER_CONTRACT,
  RETRIEVE_USER_ACCOUNT,
  CREATE_CHANNEL,
  IS_BOOKIE,
  MY_CHANNEL,
  CREATE_RACE,
  BET_ON,
  CLAIM_REWARD,
  RACE_WINNERS,
  RACE_START_PRICES,
  RACE_END_PRICES,
  RACE_TOTAL_AMOUNT,
  RACE_INSPECT_COIN,
  RACE_COINS_INFOS
} from "./types";
import * as utils from './utils';
import * as sc from '../services/smartcontract';
import {message} from 'antd';
const PRECISION = 100000;
const Web3 = require('web3');
const TruffleContract = require("truffle-contract");
export const web3Instance = new Web3(Web3.givenProvider);
export const CONTRACT_NETWORK = `${process.env.REACT_APP_CONTRACT_NETWORK}`;
const CONTRACT_CONTROLLER_ADDRESS = `${process.env.REACT_APP_POCKET_CONTRACT_CONTROLLER}`;
const BLOCKCHAIN_GET_CALL_TIMEOUT = 15000; //15 seconds
const btnblockcain = {races: {}};
const CONTRACT_CONTROLLER = loadContract2(Controller);
const RACE_CONTRACT = loadContract2(Race);

// detects network client is trying to use to connect with. this call is a time out call should in case
// detection takes longer than 15 seconds.
export const detectNetwork = () => {
  return timeoutBlockchainGetCall(DETECT_ETHEREUM_NETWORK,
          web3Instance.eth.net.getNetworkType);
};

//action to load controller contract
export const loadControllerContract = () => {
  return utils.async(LOAD_CONTROLLER_CONTRACT, {});
};

export const retrieveAccount = () => {
  return timeoutBlockchainGetCall(RETRIEVE_USER_ACCOUNT,
          web3Instance.eth.getAccounts);
};


export const createChannel = (name, description) => {
  const hideMessage = message.loading(`Creating '${name}' channel. This might take a couple of seconds...`);
  let context = sc.smartcontract.context;
  context['value'] = web3Instance.utils.toWei("1", "ether");
  return dispatch => {
    let controller;
    __controller().then(function (instance) {
      controller = instance;
      return controller.createChannel.estimateGas(name, description, context);
    }).then(function (estimateGas) {

      context['gas'] = estimateGas;
      controller.createChannel(name, description, context)
              .then(function (tx, error) {
                hideMessage();
                if (utils.nonNull(error)) {
                  notification.createChannelError(error);
                  dispatch(utils.async(CREATE_CHANNEL, error));
                } else {
                  notification.channelCreationSucces(name, tx);
                  dispatch(utils.async(CREATE_CHANNEL, {tx: tx}));
                }
              }).catch(function (err) {
        hideMessage();
        notification.createChannelError(err);
        dispatch(utils.async(CREATE_CHANNEL, err));
      });
    }).catch(function (err) {
      hideMessage();
      notification.error('Could not determine gas at this point in time. Please try again later');
      dispatcher(dispatch, CREATE_CHANNEL, null, err);
    });
  };
};

export const createRace = (name, coins, minBet, bStartTime, rStartTime, duration, minNumOfBets, exclusive) => {
  const hideMessage = message.loading(`Creating '${name}' race. This might take a couple of seconds...`, 0);
  return dispatch => {
    let controller;
    const mBet = web3Instance.utils.toWei(minBet, "ether");

    __controller().then(function (instance) {
      controller = instance;
      if (exclusive) {
        return controller.createExclusiveRace.estimateGas(name,
                coins, mBet, bStartTime, rStartTime,
                duration, minNumOfBets, sc.smartcontract.context);
      }
      return controller.createRace.estimateGas(name, coins, mBet, bStartTime,
              rStartTime, duration, minNumOfBets,
              sc.smartcontract.context);
    }).then(function (estimateGas) {
      let context = sc.smartcontract.context;
      context['gas'] = estimateGas;
      if (exclusive) {
        controller.createExclusiveRace(name, coins, mBet, rStartTime,
                bStartTime, duration, minNumOfBets, context)
                .then(function (tx, error) {
                  hideMessage();
                  notification.raceCreationSuccess(tx);
                  dispatcher(dispatch, CREATE_RACE, tx, error);
                }).catch(function (err) {
          hideMessage();
          notification.createRaceError(err);
          dispatcher(dispatch, CREATE_RACE, null, err);
        });
      } else {
        controller.createRace(name, coins, mBet, rStartTime, bStartTime, duration, minNumOfBets, context)
                .then(function (tx, error) {
                  hideMessage();
                  notification.raceCreationSuccess(tx);
                  dispatcher(dispatch, CREATE_RACE, tx, error);
                }).catch(function (err) {
          hideMessage();
          notification.createRaceError(err);
          dispatcher(dispatch, CREATE_RACE, null, err);

        });
      }

    }).catch(function (err) {
      console.log(err);
      hideMessage();
      notification.error('Could not determine gas at this point in time. Please try again later');
      dispatcher(dispatch, CREATE_RACE, null, err);
    });
  };
};

export const winningCoins = (race) => {
  return dispatch => {
    const cacheri = btnblockcain.races[race];
    //load from cache if available.
    if (utils.nonNull(cacheri) &&
            utils.nonNull(cacheri.winners)) {
      dispatcher(dispatch, RACE_WINNERS, {winners: cacheri.winners});
    } else {
      __race(race).then(function (instance) {
        return instance.winningCoins();
      }).then(function (coins) {
        raceWinners(race, coins);
        dispatcher(dispatch, RACE_WINNERS, {winners: btnblockcain.races[race].winners});
      }).catch(function (err) {
        dispatcher(dispatch, RACE_WINNERS, {err});
      });
    }
  }
};

export const raceStartPrices = (race) => {
  return dispatch => {
    __race(race).then(function (instance) {
      return instance.startPrices();
    }).then(function (pricesObj) {
      console.log('startPrices', pricesObj);
      racePrices(race, pricesObj, 'startPrices');
      dispatcher(dispatch, RACE_START_PRICES, {pricesObj});
    }).catch(function (err) {
      console.log('startPrices', err);
      dispatcher(dispatch, RACE_START_PRICES, err);
    });
  }
};

export const raceEndPrices = (race) => {
  return dispatch => {
    __race(race).then(function (instance) {
      return instance.endPrices();
    }).then(function (pricesObj) {
      console.log('endPrices', pricesObj, 'endPrices');
      racePrices(race, pricesObj, 'endPrices');
      dispatcher(dispatch, RACE_END_PRICES, {pricesObj});
    }).catch(function (err) {
      console.log('endPrices', err);
      dispatcher(dispatch, RACE_END_PRICES, err);
    });
  }
};


export const inspectCoin = (race, coinId) => {
  return dispatch => {
    __race(race).then(function (instance) {
      return instance.inspectCoin(coinId);
    }).then(function (coin) {

      const _coin = {coinId:coin[0].toNumber(),
        total:coin[1].toNumber(),
        numOfBets:coin[2].toNumber(),
        startPrice:coin[3].toNumber(),
        endPrice:coin[4].toNumber()};

      console.log('coin', _coin);
      racePrices(race, _coin, 'coin');
      dispatcher(dispatch, RACE_INSPECT_COIN, {coin:_coin});
    }).catch(function (err) {
      console.log('endPrices', err);
      dispatcher(dispatch, RACE_INSPECT_COIN, err);
    });
  }
};

export const getRaceCoinInfos = (race) => {
  return dispatch => {
    const cacheri = btnblockcain.races[race];
    //load from cache if available.
    if (utils.nonNull(cacheri) &&
            utils.nonNull(cacheri.coins)) {
      dispatcher(dispatch, RACE_WINNERS, {coins: cacheri.coins});
    } else {
      __race(race).then(function (instance) {
        return instance.inspectCoins();
      }).then(function (coins) {
        raceCoinsInfo(race, coins);
        console.log('{coins: btnblockcain.races[race].coins}',{coins: btnblockcain.races[race].coins});
        dispatcher(dispatch, RACE_COINS_INFOS, {coins: btnblockcain.races[race].coins});
      }).catch(function (err) {
        console.log('endPrices', err);
        dispatcher(dispatch, RACE_COINS_INFOS, err);
      });
    }

  }
};

export const totalAmount = (race) => {
  return dispatch => {
    __race(race).then(function (instance) {
      return instance.totalAmount();
    }).then(function (amount) {

      //This is a BigNumber object to somehow fails eventhough
      //it is one of the objects accepted by fromWei
      // (Please pass numbers as strings or BigNumber objects to avoid precision errors.)
      //For now workaround would be the convert to number -> string
      //const ether = web3Instance.utils.fromWei(amount, 'ether');
      const wei = amount.toNumber();
      const weiStr = String(wei);
      const ether = web3Instance.utils.fromWei(weiStr, 'ether');
      console.log('totalAmount', ether, race);
      racePrices(race, ether, 'totalAmount');
      dispatcher(dispatch, RACE_TOTAL_AMOUNT, ether);
    }).catch(function (err) {
      console.log('totalAmount', err);
      dispatcher(dispatch, RACE_TOTAL_AMOUNT, err);
    });
  }
};

export const betOn = (race, coin, value, coinName) => {
  let context = sc.smartcontract.context;
  const hideMessage = message.loading(`Placing a bet on ${coinName}. This might take a couple of seconds...`);
  if (utils.nonNull(value)) {
    context['value'] = web3Instance.utils.toWei(String(value), "ether");
  } else {//if value is undefined simply means user is using default value with is the min bet set by race creator
    context['value'] = String(race.minBet);
  }
  return dispatch => {
    let raceContract;
    __race(race.id).then(function (instance) {
      raceContract = instance;
      return raceContract.betOn.estimateGas(coin, context);
    }).then(function (estimateGas) {
      context['gas'] = estimateGas;
      raceContract.betOn(coin, context)
              .then(function (tx, error) {
                hideMessage();
                notification.betSuccess(tx);
                dispatcher(dispatch, BET_ON, tx, error);
              }).catch(function (err) {
        hideMessage();
        notification.betError(err);
        dispatcher(dispatch, BET_ON, null, err);
      });
    }).catch(function (err) {
      console.log(err);
      hideMessage();
      notification.error('Could not determine gas at this point in time. Please try again later');
      dispatcher(dispatch, BET_ON, null, err);
    });
  }
};

export const claimReward_ = (race) => {
  return dispatch => {
    let raceContract;
    __race(race.id).then(function (instance) {
      raceContract = instance;
      return raceContract.claimMyReward();
    }).then(function (canClaim) {
      console.log('canClaim', canClaim);
      dispatcher(dispatch, CLAIM_REWARD, canClaim, null);
    }).catch(function (err) {
      console.log(err);
      notification.error('Could not determine gas at this point in time. Please try again later');
      dispatcher(dispatch, CLAIM_REWARD, null, err);
    });
  };
};

export const claimReward = (race) => {
  let context = sc.smartcontract.context;
  const hideMessage = message.loading(`Claiming reward. This might take a couple of seconds...`);
  return dispatch => {
    let raceContract;
    __race(race.id).then(function (instance) {
      raceContract = instance;
      console.log(context);
      return raceContract.claimMyReward.estimateGas(context);
    }).then(function (estimateGas) {
      context['gas'] = estimateGas;
      raceContract.claimMyReward(context)
              .then(function (tx, error) {
                console.log(tx, error);
                hideMessage();
                //TODO message
                dispatcher(dispatch, CLAIM_REWARD, {race: race.id, amount: tx}, error);
              }).catch(function (err) {
        hideMessage();
        //TODO message
        dispatcher(dispatch, CLAIM_REWARD, null, err);
      });
    }).catch(function (err) {
      console.log(err);
      hideMessage();
      notification.error('Could not determine gas at this point in time. Please try again later');
      dispatcher(dispatch, CLAIM_REWARD, null, err);
    });
  };
};

export const myChannel = () => {
  return dispatch => {
    __controller().then(function (instance) {
      return instance.myChannel(sc.smartcontract.context);
    }).then(function (channel) {
      dispatcher(dispatch, MY_CHANNEL, channel, null);
    }).catch(function (err) {
      dispatcher(dispatch, MY_CHANNEL, null, err);
    });
  };
};

export const isBookie = () => {
  return dispatch => {
    __controller().then(function (instance) {
      return instance.isBookie(sc.smartcontract.context);
    }).then(function (bookie) {
      dispatcher(dispatch, IS_BOOKIE, bookie, null);
    }).catch(function (err) {
      dispatcher(dispatch, IS_BOOKIE, null, err);
    });
  };
};

function __controller() {
  return CONTRACT_CONTROLLER.at(CONTRACT_CONTROLLER_ADDRESS);
}

function __race(race) {
  return RACE_CONTRACT.at(race);
}

function dispatcher(dispatch, type, tx, error) {
  if (utils.nonNull(error)) {
    dispatch(utils.async(type, error));
  } else {
    dispatch(utils.async(type, tx));
  }
}

// function loadContract(address, abi) {
//   let contract = undefined;
//   if (web3Instance.currentProvider !== null) {
//     let contractWrapper = TruffleContract(abi);
//     contractWrapper.setProvider(web3Instance.currentProvider);
//     contract = contractWrapper.at(address);
//   }
//   return contract;
// }

function loadContract2(abi) {
  let contract = undefined;
  if (web3Instance.currentProvider !== null) {
    let contractWrapper = TruffleContract(abi);
    contractWrapper.setProvider(web3Instance.currentProvider);
    contract = contractWrapper;
  }
  return contract;
}


function timeoutBlockchainGetCall(type, blockchainMethod) {
  let networkPromise = new Promise((resolve, reject) => {
    try {
      blockchainMethod((err, value) => {
        let result = {};
        if (utils.nonNull(err)) {
          result["error"] = err;
          reject(result);
        }
        if (utils.nonNull(value)) {
          result["value"] = value;
        }
        resolve(result);
      });
    } catch (error) {// if blockchainMethod is not a function
      reject(error);
    }
  });

  return timeoutBlockchainCall(BLOCKCHAIN_GET_CALL_TIMEOUT, type, networkPromise);
}

function timeoutBlockchainCall(time, type, promise) {
  return dispatch => {
    //a max of 15 seconds to determine the network.
    let doIt = utils.timeoutCall(time, promise);
    doIt.then(response => {
      dispatch(utils.async(type, response))
    }).catch(err => {
      let result = {};
      if (typeof err === 'string') {
        result["error"] = new Error(err);
        dispatch(utils.async(type, result))
      } else {
        result["error"] = err;
        dispatch(utils.async(type, result))
      }
    });
  };
}

//cache values to prevent constant communication with network

function raceWinners(raceId, coins) {
  if (utils.isNull(btnblockcain.races[raceId])) {
    btnblockcain.races[raceId] = {};
  }
  const winners = [];
  for (let i = 0; i < coins.length; i++) {
    winners.push(coins[i].toNumber());
  }
  btnblockcain.races[raceId].winners = winners;
}

function raceCoinsInfo(race, coins) {
  if (utils.isNull(btnblockcain.races[race])) {
    btnblockcain.races[race] = {};
  }

  const results = [];

  for (let i = 0; i < coins[0].length; i++) {
    const s = coins[3][i].toNumber();
    const e = coins[4][i].toNumber();
    const change = (((e - s) / s) * 100).toFixed(5);
    const end = (e / PRECISION).toFixed(5);
    const start = (s / PRECISION).toFixed(5);

    results.push({
      coinId: coins[0][i].toString(),
      total: web3Instance.utils.fromWei(coins[1][i].toString(), "ether"),
      numOfBets: coins[2][i].toNumber(),
      startPrice: start,
      endPrice: end,
      change: change
    });
  }
  btnblockcain.races[race].coins = results;
}

function racePrices(raceId, prices, name) {
  if (utils.isNull(btnblockcain.races[raceId])) {
    btnblockcain.races[raceId] = {};
  }
  btnblockcain.races[raceId][name] = prices;
}