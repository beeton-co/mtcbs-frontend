import React, {Component} from 'react';
import {Divider, Card, Button, message} from 'antd';
import * as priceengine from '../../../../actions/priceengine';
import * as utils from '../../../../actions/utils';
import {RaceCarousel} from '../../RaceCarousel';
import {EmptyRaceView} from '../../EmptyRaceView';
import {WinnerConfetti} from '../../../../components/WinnerConfetti';
import DescriptionList from '../../../../components/DescriptionList';
import CoinListView from '../../../Fragments/CoinListView';
import {GenerateSVGGradient} from '../../../Fragments/SVGGradients';
import {DetailRaceInformationView} from '../../../Fragments/DetailRaceInformationView';

const {Description} = DescriptionList;

export default class CompletedRaceView extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.claimRewardHandler = this.claimRewardHandler.bind(this);
    this.props.getRacesByStatus('completed', 0);
  }

  state = {
    raceDetailId: null,
    contractResult: {},
    hasWinnings: false,
    claimedReward: false,
  };

  componentWillReceiveProps(nextProps) {
    const {race} = nextProps.contract;
    let winnings = false;

    if (utils.nonNull(race)) {
      if (race.loaded) {
        winnings = race.myWinnings > 0;
      }
      let claimedReward = false;
      if(this.state.claimedReward) {
        claimedReward = true;
      }
      if (race.confetti && !this.state.claimedReward) {
        claimedReward = true;
        const race = this.getDetailedRace();
        this.props.claimReward(race);
      }
      this.setState({contractResult: race, hasWinnings: winnings, claimedReward: claimedReward});
    } else {
      this.setState({contractResult: {}});
    }
  }

  componentDidUpdate(){
    const race = this.getDetailedRace();
    if (utils.nonNull(race) && utils.isNull(this.state.raceDetailId)) {
      this.props.getRaceCompleteInfos(race.id);
      this.setState({raceDetailId: race.id});
    }
  }

  render() {
    const races = this.getRaces(this.props);
    if (races && races.length > 0) {
      return (
              <div style={{marginTop: 50}}>
                {this.renderConfetti()}
                <RaceCarousel phase='completed' races={races} eventHandler={this.eventHandler}/>
                <Divider style={{marginBottom: 50}}/>
                {this.renderClaimRewardButton()}
                {this.raceDetailView()}
                <GenerateSVGGradient id="gradient-circle-progress-closed"
                                     offset1="5%"
                                     stopColor1="#4145F0"
                                     offset2="95%"
                                     stopColor2="#2AE4F6"/>
              </div>
      )
    }
    return (
            <EmptyRaceView type="info" message="Completed Races" description="No completed races at the moment. Please visit page at a later point."/>);
  }

  raceDetailView() {
    const race = this.getDetailedRace();

    if (race === undefined) {
      return (<div></div>);
    } else if (priceengine.getAvailableCoins().length === 0) {
      return (<div className="standardList">
        <CoinListView loading={true}
                      empty={true}
                      amount={false}
                      bets={false}
                      change={false}
                      endPrice={false}
                      startPrice={false}
                      avatarOnly={true}/>
      </div>);
    }
    else if (!this.state.contractResult.loaded) {
      return (<div className="standardList">
        <CoinListView loading={true}
                      coins={race.coinIds}
                      amount={false}
                      bets={false}
                      change={false}
                      endPrice={false}
                      startPrice={false}
                      idBase={1}/></div>);
    } else {
      return (<div className="standardList">
        <CoinListView loading={false} coins={this.props.contract.race.coins} priceClass="finishedListContentItem"/>
        <DetailRaceInformationView race={race} col={1} size="small" coins={race.coinIds}/>
      </div>);
    }
  }

  renderConfetti() {
    if (this.state.contractResult &&
            this.state.contractResult.confetti &&
            (utils.nonNull(this.state.contractResult.disableConfetti) && !this.state.contractResult.disableConfetti)) {
      return (<WinnerConfetti recycle={false}/>);
    }
  }

  renderClaimRewardButton() {
    if (this.state.contractResult.loaded) {
      const winningCoins = this.state.contractResult.winningCoins;
      const descriptions = [];

      descriptions.push(<Description key={utils.id()}><Button onClick={this.claimRewardHandler} ghost>Claim Reward</Button></Description>);
      if (utils.nonNull(winningCoins) && winningCoins.length > 0) {
        descriptions.push(<Description term="Winner(s)" key={utils.id()}>{utils.renderCoinAvatars(winningCoins)}</Description>);
      }

      return (<Card>
        <DescriptionList size="large" col="4" style={{marginBottom: 32}}>
          <Description term=""/>
          {descriptions}
          <Description term=""/>
        </DescriptionList>
      </Card>);
    }
  }

  claimRewardHandler(event) {
    event.preventDefault();

    if (this.state.hasWinnings) {
      const race = this.getDetailedRace();
      this.props.claimConfetti(race);
    }
  }

  eventHandler(id) {
    //Dispatch evens to race contracts to fetch current values;
    this.props.getRaceCompleteInfos(id);
    this.setState({raceDetailId: id});
  }

  getRaces(props) {
    let raceResult = props.races;

    if (utils.nonNull(raceResult) && raceResult.length > 0) {
      if (utils.isNull(raceResult[0].completed)) {
        this.props.getRacesByStatus('completed', 0);
      } else {
        return raceResult[0].completed.hits;
      }
    }
    return [];
  }

  getDetailedRace() {
    let raceResult = this.props.races;
    let races = [];
    if (raceResult && raceResult.length > 0) {
      races = raceResult[0].completed.hits;
    }
    if (utils.nonNull(races) && races.length > 0) {
      const raceId = utils.isNull(this.state.raceDetailId) ? races[0].id : this.state.raceDetailId;
      for (let i = 0; i < races.length; i++) {
        if (races[i].id === raceId) {
          return races[i];
        }
      }
    }
    return null;
  }
}