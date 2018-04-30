import {
  RACE_COMPLETE_INFOS,
} from '../actions/types';

export default function (state = {}, action) {

  const payload = action.payload;

  switch (action.type) {
    case RACE_COMPLETE_INFOS:
      return {
        ...state,
        info: payload
      };
    default:
      return state;
  }

}
