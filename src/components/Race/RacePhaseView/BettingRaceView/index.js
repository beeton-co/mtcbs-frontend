import React, {Component} from 'react';
import {Divider, Card,List, Avatar, InputNumber, Button} from 'antd';
import * as priceengine from '../../../../actions/priceengine';
import * as utils from '../../../../actions/utils';
import * as notification from '../../../../services/notification';
import {RaceCarousel} from '../../RaceCarousel';

import CoinListView from '../../../Fragments/CoinListView';
import {GenerateSVGGradient} from '../../../Fragments/SVGGradients';
import {DetailRaceInformationView} from '../../../Fragments/DetailRaceInformationView';


const ListItemMeta = List.Item.Meta;
const ListItem = List.Item;

export default class BettingRaceView extends Component {

  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.raceDetailView = this.raceDetailView.bind(this);
    this.getCoinName = this.getCoinName.bind(this);
    this.getCoinSymbol = this.getCoinSymbol.bind(this);
    this.selectCoin = this.selectCoin.bind(this);
    this.placeBet = this.placeBet.bind(this);
    this.props.getRacesByStatus('betting', 0);
  }

  state = {
    raceDetailId: null,
    selectedCoins: []
  };

  eventHandler(id) {
    this.setState({raceDetailId: id});
  }


  render() {
    let raceResult = this.props.races;
    let races = [];
    if (raceResult.length > 0) {
      if (utils.isNull(raceResult[0].betting)) {
        this.props.getRacesByStatus('betting', 0);
      } else {
        races = raceResult[0].betting.hits;
      }
    }
    if (races && (races.length > 0)) {
      return (
              <div style={{marginTop: 50}}>
                <RaceCarousel races={races} eventHandler={this.eventHandler}/>
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
    //TODO message about empty races.
    return (<div></div>);
  }

  getCoinName(id) {
    for (let i = 0; i < priceengine.getAvailableCoins().length; i++) {
      if (priceengine.getAvailableCoins()[i].id === id) {
        return priceengine.getAvailableCoins()[i].name;
      }
    }
    return '';
  }
  getCoinSymbol(id) {
    for (let i = 0; i < this.state.coins.length; i++) {
      if (this.state.coins[i].id === id) {
        return this.state.coins[i].symbol;
      }
    }
    return '';
  }

  selectCoin(coin, value) {
    let selectedCoins = this.state.selectedCoins;
    selectedCoins[coin] = value;
    this.setState({selectedCoins: selectedCoins});
  }

  componentWillReceiveProps (nextProps) {
    let newRaces = nextProps.races;
    if(this.props.races !== newRaces){
      let races = [];
      if (newRaces.length > 0) {
        races = newRaces[0].betting.hits;
      }
      if (utils.nonNull(races) && races.length > 0) {
        if (utils.isNull(this.state.raceDetailId)) {
          this.setState({raceDetailId:races[0].id});
        }
      }
    }
  }

  placeBet(coin) {
    let selectedCoins = this.state.selectedCoins;
    let value = selectedCoins[coin];
    const race = this.getRace(this.props, this.state.raceDetailId);
    const coinName = this.getCoinName(coin);

    if(utils.isNull(race)){
      notification.info("Can't place this bet. Race is unknown!");
    }else{
      this.props.betOn(race, coin, value, coinName);
    }
  }

  coinsDetailView(race) {
    return (<div className="standardList">
              <Card bordered={false} style={{marginTop: 24}} bodyStyle={{padding: '0 32px 40px 32px'}}>
                <List className="listCard" size="large" rowKey="id" loading={false} dataSource={race.coins}
                      renderItem={coin => (
                              <ListItem
                                      actions={[<InputNumber
                                              defaultValue={0.1}
                                              step={0.1}
                                              min={0.1} onChange={(value) => this.selectCoin(coin.id, value)}/>,
                                        <Button onClick={(event) => this.placeBet(coin.id)} ghost>Place Bet</Button>]}>
                                <ListItemMeta title=" " description={this.getCoinName(coin.id)} avatar={
                                  <Avatar src={`/coin-svg/${coin.symbol.toLowerCase()}.svg`} shape="square" size="large"/>}/>

                                <div className="listContent">
                                  <div className="listContentItem">
                                    <span>Betting Start Price</span>
                                    <p>{coin.startPrice}</p>
                                  </div>
                                  <div className="runningListContentItem listContentItem">
                                    <span>Real Time Price*</span>
                                    <p>{coin.currentPrice}</p>
                                  </div>
                                  <div className="runningListContentItem listContentItem">
                                    <span>Change (%)</span>
                                    <p>{coin.change}</p>
                                  </div>
                                </div>

                              </ListItem>
                      )}
                />
              </Card>
            </div>
    );
  }

  getRace(props, raceDetailId) {
    let raceResult = props.races;
    let races = [];
    if (raceResult.length > 0) {
      races = raceResult[0].betting.hits;
    }
    let race = undefined;
    if (races.length > 0) {
      const raceId = utils.isNull(raceDetailId) ? races[0].id : raceDetailId;
      for (let i = 0; i < races.length; i++) {
        if (races[i].id === raceId) {
          race = races[i];
          break;
        }
      }
    }
    return race;
  }

  raceDetailView() {

    let race = this.getRace(this.props, this.state.raceDetailId);
    if (race === undefined) {
      return (<div></div>);
    }
    if (priceengine.getAvailableCoins().length === 0) {
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
    else if (!priceengine.hasPrice(race.id)) {
      this.props.getDetailRaceCoins('betting', race.id);
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
      return this.coinsDetailView(priceengine.getPriceInfo(race.id));
    }
  }
}