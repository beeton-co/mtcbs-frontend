import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {message} from 'antd';
import Header from './components/header';
import Main from './components/main';
import * as utils from './actions/utils'
import {
  getCompletedRacesList,
  getVoidRacesList,
  getBettingRacesList,
  getCreatedRacesList,
  getRunningRacesList,
  getChannels,
  getRacesByStatus
} from './actions/mtcbs-rest';

import {
  getUserBets,
  getUserRaces,
  getUserBetsWithStatus,
  getRaceBets
} from './actions/bets';


import {
  detectNetwork,
  loadControllerContract,
  retrieveAccount,
  createChannel,
  betOn,
  winningCoins,
  myChannel,
  createRace,
  claimReward,
  raceEndPrices,
  raceStartPrices,
  totalAmount,
  inspectCoin,
  CONTRACT_NETWORK
} from './actions/pocketcoin';

import {
  getRaceCompleteInfos
} from './actions/race_contract_integration';

import {
  getCoins,
  getCoin,
  getCoinsForIds,
  getDetailRaceCoins,
} from './actions/priceengine';

class App extends Component {
  constructor(props) {
    super(props);
    //preload coins into cache
    this.props.getCoins(0);
  }

  state = {
    errorLoaded: false,
    network: {loaded: false, error: false},
    account: {loaded: false, error: false},
    loadingMyChannel: false,
  };

  componentWillMount() {
    this.props.detectNetwork();
  }

  componentWillReceiveProps(nextProps) {
    this.handleContractEvent(nextProps, this.props, this.state);
    if (utils.nonNull(nextProps.econtract.account)) {
      if (utils.nonNull(nextProps.econtract.account.error)) {
        this.setState({account: {loaded: true, error: true}})
      } else if (utils.nonNull(nextProps.econtract.account.default)) {
        this.setState({account: {loaded: true, error: false}})
      }
    }

    if (utils.nonNull(nextProps.econtract.network)) {
      if (utils.nonNull(nextProps.econtract.network.error)) {
        this.setState({network: {loaded: true, error: true}})
      } else if (utils.nonNull(nextProps.econtract.network.id)) {
        if (nextProps.econtract.network.id === process.env.REACT_APP_CONTRACT_NETWORK){
          this.setState({network: {loaded: true, error: false}})
        }else{
          this.setState({network: {loaded: true, error: true}})
        }

      }
    }

  }

  handleContractEvent(nextProps, props, state) {
    //If this is a contract event handle
    let econtract = props.econtract;
    //if both error and id is null it means we are in the process of determining the network.
    if (utils.isNull(econtract.network.error) && utils.isNull(econtract.network.id)) {
      if (nextProps.econtract.network.id === CONTRACT_NETWORK) {
        //load controller contract
        props.loadControllerContract();
      }
    }
    if (utils.nonNull(econtract.network.id) && econtract.network.id === process.env.REACT_APP_CONTRACT_NETWORK){
      if (utils.isNull(econtract.account.default) && utils.isNull(econtract.account.error)) {
        props.retrieveAccount();
      }
    }

    if(state.network.loaded && !state.network.error &&
            state.account.loaded && !state.account.error && !state.loadingMyChannel){
      let context = {};
      context['from'] = econtract.account.default;
      props.myChannel();
      this.setState({loadingMyChannel: true})
    }
  }

  bootstrpErrorMessage(content) {
    if (!this.state.errorLoaded){
      message.error(content, 86400);
      this.setState({errorLoaded:true});
    }
  }
  render() {

    if(this.state.network.loaded && this.state.network.error){
      window.setTimeout(() => this.bootstrpErrorMessage(`Error was encountered while trying to discover network. Please ensure that the MetaMask (https://metamask.io) plugin is installed and your provider set to ${process.env.REACT_APP_CONTRACT_NETWORK}`), 200);
      return (<div></div>);
    }
    if(this.state.account.loaded && this.state.account.error){
      window.setTimeout(() => this.bootstrpErrorMessage('Account is not unlocked! Please unlock account before proceeding.'), 200);
      return (<div></div>);
    }

    if((typeof this.props.econtract.user.channelOwner) === 'boolean'){
      return (
              <div className="App">
                <Header {...this.props} />
                <Main {...this.props} />
              </div>
      );
    }

    return (
            <div className="loading">Loading&#8230;</div>
    );
  }
}

// connects root reducer to props
function mapStateToProps(state) {
  return {
    races: state.races,
    channels: state.channels,
    coins: state.coins,
    coin: state.coin,
    rcd: state.rcd,
    bets: state.bets,
    econtract: state.econtract
  }
}

// connects redux actions to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCompletedRacesList: getCompletedRacesList,
    getRacesByStatus: getRacesByStatus,
    getVoidRacesList: getVoidRacesList,
    getBettingRacesList: getBettingRacesList,
    getCreatedRacesList: getCreatedRacesList,
    getRunningRacesList: getRunningRacesList,
    getChannels: getChannels,
    getCoins: getCoins,
    getCoin: getCoin,
    myChannel:myChannel,
    getCoinsForIds: getCoinsForIds,
    getDetailRaceCoins: getDetailRaceCoins,
    getUserBets: getUserBets,
    getUserRaces: getUserRaces,
    getUserBetsWithStatus: getUserBetsWithStatus,
    getRaceBets: getRaceBets,
    detectNetwork: detectNetwork,
    loadControllerContract: loadControllerContract,
    retrieveAccount: retrieveAccount,
    createChannel: createChannel,
    createRace:createRace,
    betOn: betOn,
    winningCoins:winningCoins,
    raceStartPrices:raceStartPrices,
    raceEndPrices:raceEndPrices,
    totalAmount:totalAmount,
    inspectCoin:inspectCoin,
    getRaceCompleteInfos:getRaceCompleteInfos,
    claimReward:claimReward
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// export default App;
