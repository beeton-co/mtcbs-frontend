import React, {Component} from 'react';
import {Divider} from 'antd';
import * as priceengine from '../../../../actions/priceengine';
import * as utils from '../../../../actions/utils';
import CoinListView from '../../../Fragments/CoinListView';
import {GenerateSVGGradient} from '../../../Fragments/SVGGradients';
import {DetailRaceInformationView} from '../../../Fragments/DetailRaceInformationView';
import {RaceCarousel} from '../../RaceCarousel';
import {EmptyRaceView} from '../../EmptyRaceView';

export default class RunningRaceView extends Component {

  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.raceDetailView = this.raceDetailView.bind(this);
    this.props.getRacesByStatus('running', 0);
  }
  state = {
    raceDetailId: null
  };

  eventHandler(id) {
    this.setState({raceDetailId: id});
  }

  componentDidMount() {
    //periodically update tickers
    const self = this;
    const fetchTicker = () =>{
      const race = self.getRace(self.props, self.state.raceDetailId);
      if(race){
        self.props.getDetailRaceCoins('running', race.id);
        if ((race.startTime + race.duration) > new Date().getTime()) {
          clearInterval(this.fetchTickerInterval);
        }
      }
    };

    this.fetchTickerInterval = setInterval(fetchTicker, 20*1000);
  }

  componentWillUnmount() {
    clearInterval(this.fetchTickerInterval);
  }

  render() {
    const races = this.getRaces(this.props);

    if (races && (races.length > 0)) {
      const selectedRaceId = this.state.raceDetailId === null ? races[0].id : this.state.raceDetailId;
      return (
              <div style={{marginTop: 50}}>
                <RaceCarousel phase='running' races={races} eventHandler={this.eventHandler} selectedRaceId={selectedRaceId}/>
                <Divider style={{marginBottom: 50}}/>
                {this.raceDetailView()}
                <GenerateSVGGradient id="gradient-circle-progress-open"
                                     offset1="5%"
                                     stopColor1="#F60"
                                     offset2="95%"
                                     stopColor2="#FF6"/>

                <GenerateSVGGradient id="gradient-circle-progress-closed"
                                     offset1="5%"
                                     stopColor1="#4145F0"
                                     offset2="95%"
                                     stopColor2="#2AE4F6"/>
              </div>
      );

    }
    return (
            <EmptyRaceView type="info" message="Running" description="No races currently running!"/>);
  }

  raceDetailView() {

    let raceResult = this.props.races;
    let races = [];
    if (raceResult.length > 0) {
      races = raceResult[0].running.hits;
    }
    let race = undefined;
    if (races.length > 0) {
      const raceId = utils.isNull(this.state.raceDetailId) ? races[0].id : this.state.raceDetailId;
      for (let i = 0; i < races.length; i++) {
        if (races[i].id === raceId) {
          race = races[i];
          break;
        }
      }
    }
    if (race === undefined) {
      return (<div></div>);
    }
    if (priceengine.getAvailableCoins().length === 0) {
      return (<div className="standardList">
        <CoinListView loading={true}
                      coins={race.coinIds}
                      empty={true}
                      amount={false}
                      bets={false}
                      change={false}
                      endPrice={false}
                      startPrice={false}
                      avatarOnly={true}/>
      </div>);
    }
    else if (!priceengine.hasPrice(race.id)) {
      this.props.getDetailRaceCoins('running', race.id)
      return (<div className="standardList">
        <CoinListView loading={true}
                      coins={race.coinIds}
                      amount={false}
                      bets={false}
                      change={false}
                      endPrice={false}
                      startPrice={false}
                      avatarOnly={true}/>
      </div>);
    } else {
      const data = priceengine.getPriceInfo(race.id);
      return (<div className="standardList">
                <CoinListView loading={false}
                              coins={data.coins}
                              amount={false}
                              bets={false}
                              running={true}
                              priceClass="runningListContentItem"/>
                <DetailRaceInformationView race={race} col={1} size="large" coins={data.coins}/>
              </div>
      );
    }
  }
  getRace(props, raceDetailId) {
    let raceResult = props.races;
    let race = undefined;
    if (utils.nonNull(raceResult) && raceResult.length > 0) {
      let races = raceResult[0].running.hits;
      if (utils.nonNull(races) && races.length > 0) {
        const raceId = utils.isNull(raceDetailId) ? races[0].id : raceDetailId;
        for (let i = 0; i < races.length; i++) {
          if (races[i].id === raceId) {
            race = races[i];
            break;
          }
        }
      }
    }
    return race;
  }

  getRaces(props) {
    let raceResult = props.races;
    let races = [];
    if (utils.nonNull(raceResult) && raceResult.length > 0) {
      if(utils.isNull(raceResult[0].running)){
        props.getRacesByStatus('running', 0);
      }else{
        races = raceResult[0].running.hits;
      }
    }
    return races;
  }
}