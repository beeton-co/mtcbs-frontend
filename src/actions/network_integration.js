import ChannelManager from '../blockchain/ChannelManager.json';
import Race from '../blockchain/Race.json';
import SubDomainManager from '../blockchain/SubDomainManager.json';


//import * as utils from './utils';

const Web3 = require('web3');
const TruffleContract = require("truffle-contract");
const CONTRACT_CONTROLLER_ADDRESS = `${process.env.REACT_APP_POCKET_CONTRACT_CONTROLLER}`;


export const PRECISION = 100000;
export const web3Instance = new Web3(Web3.givenProvider);

export const CONTRACT_CONTROLLER = loadContract2(ChannelManager);
export const RACE_CONTRACT = loadContract2(Race);
export const SUBDOMAIN_MANAGER_CONTRACT = loadContract2(SubDomainManager);


export const __controller = () => {
  return CONTRACT_CONTROLLER.at(CONTRACT_CONTROLLER_ADDRESS);
};

export const __race = (race) =>{
  return RACE_CONTRACT.at(race);
};

export const __subdomainManager = (sdm) =>{
  return SUBDOMAIN_MANAGER_CONTRACT.at(sdm);
};


function loadContract2(abi) {
  let contract = undefined;
  if (web3Instance.currentProvider !== null) {
    let contractWrapper = TruffleContract(abi);
    contractWrapper.setProvider(web3Instance.currentProvider);
    contract = contractWrapper;
  }
  return contract;
}

/*
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
*/