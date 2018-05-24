
import * as ethbchain from './network_integration';
import * as sc from '../services/smartcontract';
import * as utils from './utils';

import {
  MY_CHANNEL
} from "./types";

export const myBooth = () => {
  return dispatch => {
    ethbchain.__boothManager().then(function (instance) {
      return instance.myBooth(sc.smartcontract.context);
    }).then(function (channel) {
      const name = channel[0];
      const description  = channel[1];
      const account = ethbchain.web3Instance.utils.fromWei(channel[3].toString(), "ether");
      utils.dispatcher(dispatch, MY_CHANNEL, {'name':name, 'description':description, 'id': channel[2].toString(), 'account': account}, null);
    }).catch(function (err) {
      utils.dispatcher(dispatch, MY_CHANNEL, null, err);
    });
  };
};