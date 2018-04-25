import {
  LOAD_CONTROLLER_CONTRACT,
  DETECT_ETHEREUM_NETWORK,
  CREATE_CHANNEL,
  CREATE_RACE,
  MY_CHANNEL,
  RETRIEVE_USER_ACCOUNT,
  BET_ON, CLAIM_REWARD
} from '../actions/types';

import * as utils from '../actions/utils';
import * as sc from '../services/smartcontract';

const initialState = {
  controller: undefined, // controller contract for creating channels and races
  network: {},
  cRaceResult: undefined,
  cChannelResult: undefined,
  account: {},
  betOn: undefined,
  user: {}
};

export default function (state = initialState, action) {
  let result = {};

  switch (action.type) {
    case LOAD_CONTROLLER_CONTRACT:
      return {
        ...state,
        controller: action.payload
      };
    case DETECT_ETHEREUM_NETWORK:

      if (utils.nonNull(action.payload.value)) {
        result['id'] = action.payload.value.toLowerCase();
        sc.smartcontract.network = action.payload.value.toLowerCase();
      } else {
        result["error"] = action.payload.error;
      }
      return {
        ...state,
        network: result
      };
    case CREATE_CHANNEL:
      return {
        ...state,
        cChannelResult: action.payload
      };
    case CREATE_RACE:
      return {
        ...state,
        cRaceResult: action.payload
      };
    case MY_CHANNEL:
      if ((typeof action.payload) === 'object') {
        const name = action.payload[0];
        const description = action.payload[1];
        const disable = action.payload[2];
        const id = action.payload[3];
        result['channelOwner'] = name !== '' && description !== '' && id !== undefined;
        sc.smartcontract.user.channelOwner = name !== '' && description !== '' && id !== undefined;
        result['channel'] = {name: name, description: description, disable: disable, id: id};
        sc.smartcontract.user.channel = {name: name, description: description, disable: disable, id: id};
      } else {
        result['error'] = action.payload.toString();
      }
      return {
        ...state,
        user: result
      };
    case BET_ON:
      return {
        ...state,
        betOn: action.payload
      };
    case CLAIM_REWARD:
      return {
        ...state,
        reward: action.payload
      };
    case RETRIEVE_USER_ACCOUNT:

      if (utils.nonNull(action.payload.value)) {
        if (action.payload.value.length > 0) {
          result['default'] = action.payload.value[0];
          sc.smartcontract.account = action.payload.value[0];
          sc.smartcontract.context['from'] = action.payload.value[0];
        } else {
          result["error"] = new Error("User account not unlocked!");
        }
      } else {
        result["error"] = action.payload.error;
      }
      return {
        ...state,
        account: result
      };
    default:
      return state;
  }

}
