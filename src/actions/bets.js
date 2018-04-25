import {
//  GET_BETS_BY_BETTOR,
  GET_BETS_FOR_STATUS_BY_BETTOR,
  GET_BETS_FOR_RACE,
  GET_ALL_USER_RACES,
  GET_ALL_USER_BETS
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
  return getUserData(`user/bets/${userId}`, getUserBetsAsync);
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

// const betsAsync = (type, payload) => {
//
//     let payloadArray = [];
//     let bettorRaceList = payload;
//
//     Object.keys(bettorRaceList.hits).forEach(function (key) {
//
//         if(bettorRaceList.hits[key].running !== undefined) {
//             let thisRace = bettorRaceList.hits[key].running[0].race;
//             let placedBet = bettorRaceList.hits[key].running;
//             let totalBets = {};
//             for (let i = 0; i < placedBet.length; i++) {
//                 if (!(`${placedBet[i].coinId}` in totalBets)){
//                     totalBets[`${placedBet[i].coinId}`] = placedBet[i].amount
//                 }else{
//                     totalBets[`${placedBet[i].coinId}`] += placedBet[i].amount
//                 }
//             }
//             let payloadHash = {id: bettorRaceList.hits[key].running[0].id ,'Bets': totalBets, 'Race': thisRace};
//             payloadArray.push(payloadHash);
//         }
//     });
//
//     return {
//         type: type,
//         payload: payloadArray
//     };
// };

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

