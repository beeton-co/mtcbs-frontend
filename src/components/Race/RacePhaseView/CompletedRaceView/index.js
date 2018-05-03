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
    hasClaimed: false,
    claimed: false,
    clickedClaimReward: false,
    messageOpen: false,
    confetti: false
  };

  componentWillReceiveProps(nextProps) {
    const {race} = nextProps.contract;

    if (utils.nonNull(race)) {
      if (utils.nonNull(race.loaded) && race.loaded) {
        const winnings = race.myWinnings > 0;
        const confetti = utils.nonNull(race.confetti) ? race.confetti : false;
        const hasClaimed = utils.nonNull(race.hasClaimed) ? race.hasClaimed : false;
        this.setState({loadedRaceInfo: true, hasWinnings: winnings, hasClaimed: hasClaimed, confetti: confetti});
      } else if (race.confetti) {
        this.setState({confetti: true});
      }
    } else {
      this.setState({loadedRaceInfo: false});
    }
  }

  componentDidUpdate() {
    let ccr = this.state.clickedClaimReward;
    let messageOpen = this.state.messageOpen;
    let claimed = this.state.claimed;
    let hasWinnings = this.state.hasWinnings;
    let confetti = false;
    if (this.state.clickedClaimReward) {
      if (this.props.contract.race.claimRewardExecuted) {
        ccr = false;
        if (this.state.hasClaimed && !this.state.claimed) {
          claimed = true;
          message.info(`Congratulations! Your reward is ${this.props.contract.race.myWinnings} ether`, 10);
        } else {
          messageOpen = true;
          const self = this;
          if (!self.state.messageOpen) {
            message.info('Reward already claimed.', 1, function () {
              self.setState({messageOpen: false});
            });
          }

        }
        hasWinnings = false;

        this.setState({
          clickedClaimReward: ccr,
          messageOpen: messageOpen,
          claimed: claimed,
          hasWinnings: hasWinnings,
          confetti: confetti,
        });
      } else if (!this.state.hasWinnings) { // use doesnt have a winning.
        message.info('No rewards for this race.', 1);
      }
    }

    const race = this.getDetailedRace();
    let raceDetailId = this.state.raceDetailId;
    if (utils.nonNull(race) && utils.isNull(this.state.raceDetailId)) {
      raceDetailId = race.id;
      this.props.getRaceCompleteInfos(race.id);
      this.setState({raceDetailId: race.id});
    }
  }

  eventHandler(id) {
    this.setState({raceDetailId: id, clickedClaimReward: false});
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
                {this.renderConfetti(this.props)}
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
    if (this.state.confetti) {
      return (<WinnerConfetti recycle={false}/>);
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
          if (this.state.hasWinnings) {
            const race = this.getDetailedRace();
            this.props.claimReward(race);
          }
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