import {
  RACE_COMPLETE_INFOS,
  CLAIM_REWARD,
  CLAIM_REWARD_CONFETTI
} from "./types";
import {message} from 'antd';
import * as utils from './utils';
//import * as notification from '../services/notification';
import * as ethbchain from './network_integration';
import * as sc from '../services/smartcontract';


const race_blockchain_cache = {};

export const getRaceCompleteInfos = (id) => {
  return dispatch => {

    let coins = [];
    let winningCoins = [];
    const race = race_blockchain_cache[id];
    let canClaim = false;
    //load from cache if available.
    if (utils.nonNull(race)) {
      utils.dispatcher(dispatch, RACE_COMPLETE_INFOS, race);
    } else {
      let raceInstance;
      //1. get coins info
      ethbchain.__race(id).then(function (instance) {
        raceInstance = instance;

        return instance.inspectCoins();
      }).then(function (inspectCoins) {
        coins = raceCoinsInfo(inspectCoins);
        //2. get winning coins
        return raceInstance.winningCoins();
      }).then(function (_winningCoins) {
        winningCoins = raceWinners(_winningCoins);
        return raceInstance.rewardClaimed(sc.smartcontract.context);
      }).then(function (hasClaimed) {
        canClaim = !hasClaimed;
        return raceInstance.myWinnings(sc.smartcontract.context);
      }).then(function (_myWinnings) {

        const ether = ethbchain.web3Instance.utils.fromWei(_myWinnings.toString(), 'ether');
        utils.dispatcher(dispatch, RACE_COMPLETE_INFOS, (race_blockchain_cache[id] = {
          id: id,
          coins: coins,
          loaded: true,
          winningCoins: winningCoins,
          myWinnings: ether,
          canClaim:canClaim,
        }));
      }).catch(function (err) {
        utils.dispatcher(dispatch, RACE_COMPLETE_INFOS, err);
      });
    }
  }
};


export const claimReward = (race) => {
  let context = sc.smartcontract.context;

  return dispatch => {
    let raceContract;
    ethbchain.__race(race.id).then(function (instance) {
      raceContract = instance;
      return raceContract.claimMyReward.estimateGas(context);
    }).then(function (estimateGas) {
      context['gas'] = estimateGas;
      let r = race_blockchain_cache[race.id];
      if(utils.isNull(r)){
        r = {};
      }
      utils.dispatcher(dispatch, CLAIM_REWARD_CONFETTI, r, null);

      const hideMessage = message.loading(`Claiming reward. This might take a couple of seconds...`);
      raceContract.claimMyReward(context)
              .then(function (tx, error) {
                hideMessage();
                let cachedRace = race_blockchain_cache[race.id];
                if(utils.isNull(cachedRace)) {
                  cachedRace ={};
                }
                cachedRace.confetti = false;
                cachedRace.disableConfetti = true;
                utils.dispatcher(dispatch, CLAIM_REWARD, cachedRace, error);
                message.info(`Congratulations! Your reward is ${cachedRace.myWinnings} ether`, 10);
              }).catch(function (err) {
        hideMessage();
        utils.dispatcher(dispatch, CLAIM_REWARD, {}, err);
      });
    }).catch(function (err) {
      let r = race_blockchain_cache[race.id];
      r.disableConfetti = true;
      utils.dispatcher(dispatch, CLAIM_REWARD, r, null);
    });
  };
};

export const claimConfetti = (race) => {
  let context = sc.smartcontract.context;
  return dispatch => {
    let raceContract;
    ethbchain.__race(race.id).then(function (instance) {
      raceContract = instance;
      return raceContract.claimMyReward.estimateGas(context);
    }).then(function (estimateGas) {
      let r = race_blockchain_cache[race.id];
      if(utils.isNull(r)){
        r = {};
      }
      r.confetti = true;
      r.disableConfetti = false;
      utils.dispatcher(dispatch, CLAIM_REWARD_CONFETTI, r, null);
    }).catch(function (err) {
      let r = race_blockchain_cache[race.id];
      r.confetti = false;
      r.disableConfetti = true;
      utils.dispatcher(dispatch, CLAIM_REWARD_CONFETTI, r, null);
    });
  };
};

//cache values to prevent constant communication with network

function raceWinners(coins) {

  const winners = [];
  for (let i = 0; i < coins.length; i++) {
    winners.push(coins[i].toNumber());
  }
  return winners;
}

function raceCoinsInfo(coins) {
  const results = [];

  for (let i = 0; i < coins[0].length; i++) {
    const s = coins[3][i].toNumber();
    const e = coins[4][i].toNumber();
    const change = (((e - s) / s) * 100).toFixed(5);
    const end = (e / ethbchain.PRECISION).toFixed(5);
    const start = (s / ethbchain.PRECISION).toFixed(5);

    results.push({
      coinId: coins[0][i].toNumber(),
      total: ethbchain.web3Instance.utils.fromWei(coins[1][i].toString(), "ether"),
      numOfBets: coins[2][i].toNumber(),
      startPrice: start,
      endPrice: end,
      change: change
    });

  }
  results.sort(function (a, b) {
    return b.change - a.change;
  });
  return results;
}