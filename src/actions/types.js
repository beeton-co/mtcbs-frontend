// race related fetch
export const GET_RUNNING_RACES = 'get_running_races';
export const GET_VOID_RACES = 'get_void_races';
export const GET_COMPLETED_RACES = 'get_completed_races';
export const GET_RACES_BY_STATUS = 'get_races_by_status';
export const GET_CREATED_RACES = 'get_created_races';
export const GET_BETTING_RACES = 'get_betting_races';
export const GET_RACES_FOR_CHANNEL = 'get_races_for_channel';

//channel fetch
export const GET_ALL_CHANNEL = 'get_all_channels';
export const GET_CHANNEL_FOR_ID = 'get_channel_for_id';
export const GET_CHANNEL_FOR_ADDRESS = 'get_channel_for_user_address';

//coin
export const GET_COIN_FOR_ID = 'get_coin_for_id';
export const GET_COINS_FOR_IDS = 'get_coins_for_ids';
export const GET_ALL_COINS = 'get_all_coins';
export const GET_DETAIL_RACE_COIN_INFORMATION = "get_detail_race_coin_information";

//bets
export const GET_BETS_BY_BETTOR = 'get_bets_by_bettor';
export const GET_BETS_FOR_STATUS_BY_BETTOR = 'get_bets_for_status_by_bettor';
export const GET_BETS_FOR_RACE = 'get_bets_for_race';

//contract
export const LOAD_CONTROLLER_CONTRACT = 'load_controller_contract';
export const DETECT_ETHEREUM_NETWORK = 'detect_ethereum_network';
export const RETRIEVE_USER_ACCOUNT = 'retrieve_user_account';
export const CREATE_CHANNEL = 'contract_call_create_channel';
export const MY_CHANNEL = 'contract_call_my_channel';
export const CREATE_RACE = 'contract_call_create_race';
export const IS_BOOKIE = 'contract_call_is_bookie';
//contract race events
export const RACE_WINNERS = "contract_race_winners";
export const BET_ON = "contract_place_bet_on";
export const RACE_START_PRICES = "contract_race_start_prices";
export const RACE_END_PRICES = "contract_race_end_prices";
export const RACE_TOTAL_AMOUNT = "contract_race_total_amount";
export const RACE_INSPECT_COIN = "contract_race_inspect_coin";
export const RACE_COINS_INFOS = "contract_race_coin_infos";
export const RACE_COMPLETE_INFOS = "contract_race_complete_infos";
export const CLAIM_REWARD = "contract_place_claim_reward";
export const CLAIM_REWARD_CONFETTI = "contract_place_claim_reward_confetti";
export const HAS_REWARD = "contract_race_has_reward";

//user
export const GET_ALL_USER_RACES = 'get_all_user_races';
export const GET_ALL_USER_BETS = 'get_all_user_bets';

