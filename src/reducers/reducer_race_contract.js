import {
  RACE_COMPLETE_INFOS,
  CLAIM_REWARD,
  HAS_REWARD,
  CLAIM_REWARD_CONFETTI
} from '../actions/types';
const initialState = {
  race: {}
};
export default function (state = initialState, action) {

  const payload = action.payload;

  switch (action.type) {
    case CLAIM_REWARD:
    case HAS_REWARD:
    case RACE_COMPLETE_INFOS:
    case CLAIM_REWARD_CONFETTI:
      return {
        ...state,
        race: payload
      };
    default:
      return state;
  }

}
