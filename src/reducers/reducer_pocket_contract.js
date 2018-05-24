import {
  LOAD_CONTROLLER_CONTRACT,
  DETECT_ETHEREUM_NETWORK,
  CREATE_CHANNEL,
  CREATE_RACE,
  MY_CHANNEL,
  RETRIEVE_USER_ACCOUNT,
  BET_ON,
  RACE_WINNERS,
  RACE_TOTAL_AMOUNT,
  RACE_INSPECT_COIN,
  RACE_COINS_INFOS,
  IS_SDM_AVAILABLE,
} from '../actions/types';

import * as utils from '../actions/utils';
import * as sc from '../services/smartcontract';

const initialState = {
  controller: undefined, // controller contract for creating channels and races
  network: {},
  cRaceResult: undefined,
  cChannelResult: undefined,
  sdm: {},
  account: {},
  betOn: undefined,
  user: {},
  race: {}
};

export default function (state = initialState, action) {
  let result = {};

  switch (action.type) {
    case RACE_WINNERS:
      return {
        ...state,
        race: {...state.race, winners:action.payload}
      };
    case RACE_TOTAL_AMOUNT:
      return {
        ...state,
        race: {...state.race, totalAmount:action.payload}
      };
    case RACE_COINS_INFOS:
      return {
        ...state,
        race: {...state.race, coins:action.payload}
      };
    case RACE_INSPECT_COIN:
      return {
        ...state,
        race: {...state.race, coin:action.payload}
      };
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
    case IS_SDM_AVAILABLE:
      return {
        ...state,
        sdm: action.payload
      };

    case CREATE_RACE:
      return {
        ...state,
        cRaceResult: action.payload
      };
    case MY_CHANNEL:
      if(utils.nonNull(action.payload['error'])){
        result['error'] = action.payload.toString();
      }else {
        const payload = action.payload;
        result['channel'] = sc.smartcontract.user.channel = action.payload;
        result['channelOwner'] = sc.smartcontract.user.channelOwner =
                utils.notEmpty(payload.name) &&
                utils.notEmpty(payload.description) &&
                utils.notEmpty(payload.id);
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
