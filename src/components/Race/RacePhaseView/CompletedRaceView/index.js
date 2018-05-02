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
    this.raceDetailView = this.raceDetailView.bind(this);
    this.getDetailedRace = this.getDetailedRace.bind(this);
    this.renderClaimRewardButton = this.renderClaimRewardButton.bind(this);
    this.props.getRacesByStatus('completed', 0);
  }

  state = {
    raceDetailId: null,
    loadedRaceInfo: false,
    hasWinnings: false,
    claimed: false,
    clickedClaimReward: false,
  };

  componentWillReceiveProps(nextProps) {
    const {race} = nextProps.contract;
    if (utils.nonNull(race) && utils.nonNull(race.loaded) && race.loaded) {
      const winnings = race.myWinnings > 0;
      this.setState({loadedRaceInfo: true, hasWinnings:winnings});
    } else {
      this.setState({loadedRaceInfo: false});
    }
  }

  eventHandler(id) {
    this.setState({raceDetailId: id});
    //Dispatch evens to race contracts to fetch current values;
    this.props.getRaceCompleteInfos(id);
  }


  render() {
    let races;
    let raceResult = this.props.races;

    if (raceResult.length > 0) {
      if (utils.isNull(raceResult[0].completed)) {
        this.props.getRacesByStatus('completed', 0);
      } else {
        races = raceResult[0].completed.hits;
      }
    }

    if (utils.nonNull(races) && (races.length > 0)) {

      return (
              <div style={{marginTop: 50}}>
                {this.renderConfetti()}
                <RaceCarousel races={races} eventHandler={this.eventHandler}/>
                <Divider style={{marginBottom: 50}}/>
                {this.renderClaimRewardButton()}
                {this.raceDetailView()}
                <GenerateSVGGradient id="gradient-circle-progress-closed"
                                     offset1="5%"
                                     stopColor1="#4145F0"
                                     offset2="95%"
                                     stopColor2="#2AE4F6"/>
              </div>
      );

    }
    return (
            <EmptyRaceView type="info" message="Completed Races" description="No completed races at the moment. Please visit page at a later point."/>);
  }

  renderConfetti(props) {
    if (this.state.hasWinnings && this.state.clickedClaimReward ){
      if (utils.nonNull(props.contract) &&
              utils.nonNull(props.contract.race)){
        if(this.props.contract.race.canClaim) {
          message.info(`Congratulations! Your reward is ${props.contract.race.myWinnings}`, 15)
          setTimeout(() => {
            const race = this.getDetailedRace();
            this.props.claimReward(race);
          }, 0);

          return (<WinnerConfetti recycle={false}/>);
        }else{
          message.success('Reward already claimed.', 15);
        }

      }
    }
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
    else if (!this.state.loadedRaceInfo) {
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

  getDetailedRace() {
    let raceResult = this.props.races;
    let races = [];
    if (raceResult.length > 0) {
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

  renderClaimRewardButton() {

    if (this.state.loadedRaceInfo) {
      const winningCoins = this.props.contract.race.winningCoins;
      const descriptions = [];

      descriptions.push(<Description key={utils.id()}>
        <Button onClick={(event) => {
          event.preventDefault();
          this.setState({clickedClaimReward: true});
        }} ghost>Claim Reward</Button>
      </Description>);

      if (utils.nonNull(winningCoins) && winningCoins.length > 0) {
        descriptions.push(
                <Description term="Winner(s)" key={utils.id()}>{utils.renderCoinAvatars(winningCoins)}</Description>);
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

}