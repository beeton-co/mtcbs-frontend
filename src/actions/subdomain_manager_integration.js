import {
  IS_SDM_AVAILABLE
} from "./types";

import * as utils from './utils';

import * as ethbchain from './network_integration';

const SDM_ADDRESS = `${process.env.REACT_APP_SUBDOMAIN_MANAGER}`;

export const isSubDomainAvailable = (subdomain) => {
  return dispatch => {
    let sdmInstance;
    //1. get coins info
    ethbchain.__subdomainManager(SDM_ADDRESS).then(function (instance) {
      sdmInstance = instance;
      return sdmInstance.isAvailable(subdomain);
    }).then(function (available) {
      console.log(available);
      utils.dispatcher(dispatch, IS_SDM_AVAILABLE, {available: available});
    }).catch(function (err) {
      console.log(err);
      utils.dispatcher(dispatch, IS_SDM_AVAILABLE, {error: err});
    });
  };
};