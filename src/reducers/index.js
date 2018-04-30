import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import Races from './reducer_races';
import RaceInfo from './reducer_race_contract';
import Channels from './reducer_channels';
import Bookie from './reducer_bookie';
import Coins from './reducer_coins';
import Bets from './reducer_bets';
import CoinDetails from './reducer_race_coins_detail';
import Coin from './reducer_coin_for_id';
import EContract from './reducer_pocket_contract';
import Profile from './reducer_user_profile';

const rootReducer = combineReducers({
  form,
  races: Races,
  raceContract: RaceInfo,
  channels: Channels,
  coins: Coins,
  rcd: CoinDetails,//race coins detail
  coin: Coin,
  bookie: Bookie,
  bets: Bets,
  econtract: EContract,
  profile: Profile
});

export default rootReducer;
