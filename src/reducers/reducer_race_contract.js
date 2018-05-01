import {
  RACE_COMPLETE_INFOS,
} from '../actions/types';
const initialState = {
  race: {}
};
export default function (state = initialState, action) {

  const payload = action.payload;

  switch (action.type) {
    case RACE_COMPLETE_INFOS:
      return {
        ...state,
        race: payload
      };
    default:
      return state;
  }

}
