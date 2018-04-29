import React, {Component} from 'react';
import {Carousel, Divider, Card, Row, Col, List, Avatar} from 'antd';
import DashCard from "../../../DashCard";
import * as priceengine from '../../../../actions/priceengine';
import * as utils from '../../../../actions/utils';
import CountDownTimer from '../../../CountDownTimer';

import DescriptionList from '../../../../components/DescriptionList';

const { Description } = DescriptionList;

const ListItemMeta = List.Item.Meta;
const ListItem = List.Item;

export default class RunningRaceView extends Component {

  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.raceDetailView = this.raceDetailView.bind(this);
    this.getCoinName = this.getCoinName.bind(this);
    this.leadingCoin = this.leadingCoin.bind(this);
    this.props.getRacesByStatus('running', 0);
  }
  state = {
    raceDetailId: null
  };

  eventHandler(id) {
    this.setState({raceDetailId: id});
  }

  getCoinName(id) {
    for (let i = 0; i < priceengine.getAvailableCoins().length; i++) {
      if (priceengine.getAvailableCoins()[i].id === id) {
        return priceengine.getAvailableCoins()[i].name;
      }
    }
    return '';
  }

  coinsDetailView(race) {
    console.log(race);
    return (<div className="standardList">
              <Card bordered={false} style={{marginTop: 24}} bodyStyle={{padding: '0 32px 40px 32px'}}>
                <List className="listCard" size="large" rowKey="id" loading={false} dataSource={race.coins}
                      renderItem={coin => (
                              <ListItem>
                                <ListItemMeta title=" " description={this.getCoinName(coin.id)} avatar={
                                  <Avatar src={`/coin-svg/${coin.symbol.toLowerCase()}.svg`} shape="square" size="large"/>}/>

                                <div className="listContent">
                                  <div className="listContentItem">
                                    <span>Start Price</span>
                                    <p>{coin.startPrice}</p>
                                  </div>
                                  <div className="runningListContentItem listContentItem">
                                    <span>Real Time Price</span>
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
              <Card bordered={false} >
                <Divider style={{ marginBottom: 32 }} />
                <DescriptionList size="large" title="Race Information" style={{ marginBottom: 32 }}>
                  {/*<Description term="Race Name">{race.name}</Description>*/}
                  <Description term="Race start time">{new Date(race.startTime *1000).toLocaleString()}</Description>
                  <Description term="Race Countdown"><CountDownTimer duration={race.duration} startTime={race.startTime}/></Description>
                  <Description term="Number Of Coins">{race.coins.length}</Description>
                  <Description term="Coins">{this.renderParticipatingCoins(race.coins)}</Description>
                </DescriptionList>
              </Card>
            </div>
    );
  }

  leadingCoin(race) {
    if (priceengine.hasPrice(race.id)) {
      const prices = priceengine.getPriceInfo(race.id);
      return prices.coins[0].symbol;
    } else {
      const name = this.getCoinName(race.coinIds[0]);
      return name.length > 4 ? name.substring(0, 4) : name;
    }
  }

  renderParticipatingCoins(coins){
    let results = [];
    for (let i = 0; i < coins.length; i++){
      results.push(<img className="avatar dash-logo" key={`coin-${coins[i].id}`} alt="dash-logo" src={process.env.PUBLIC_URL + `/coin-svg/${coins[i].symbol.toLowerCase()}.svg`} />)
    }

    return results;
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
        <Card bordered={false} style={{marginTop: 24}} bodyStyle={{padding: '0 32px 40px 32px'}}>
          <List className="listCard" size="large" rowKey="id" loading={true}/>
        </Card>
      </div>);
    }
    else if (!priceengine.hasPrice(race.id)) {
      this.props.getDetailRaceCoins('running', race.id);
      return (<div className="standardList">
        <Card bordered={false} style={{marginTop: 24}} bodyStyle={{padding: '0 32px 40px 32px'}}>
          <List className="listCard" size="large" rowKey="id" loading={true} dataSource={race.coinIds}
                renderItem={item => (
                        <ListItem>
                          <ListItemMeta title=" " description={this.getCoinName(item + 1)} avatar={
                            <Avatar src={`/coin-svg/${priceengine.getCoinSymbol(item).toLowerCase()}.svg`} shape="square" size="large"/>}/>

                        </ListItem>
                )}
          />
        </Card>
      </div>);
    } else {
      return this.coinsDetailView(priceengine.getPriceInfo(race.id));
    }
  }

  render() {
    let raceResult = this.props.races;
    let races = [];
    if (raceResult.length > 0) {
      if(utils.isNull(raceResult[0].running)){
        this.props.getRacesByStatus('running', 0);
      }else{
        races = raceResult[0].running.hits;
      }
    }
    if (races && (races.length > 0)) {
      const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1
      };

      return (
              <div style={{marginTop: 50}}>
                <Row>
                  <Col sm={1}>
                  </Col>
                  <Col sm={19}>
                    <Carousel {...settings}>
                      {races.map(r => <div className="dash-card" key={utils.id()}>
                        <DashCard key={r.id}
                                  raceId={r.id}
                                  leadingCoin={this.leadingCoin(r)}
                                  cardClickEventHandler={this.eventHandler}
                                  coinImg={r.coinIds[0]}
                                  participatingCoins={r.coinIds}
                                  bStartTime={r.bStartTime}
                                  startTime={r.startTime}
                                  duration={r.duration} {...this.props} /></div>)}
                    </Carousel></Col>
                  <Col sm={1}>
                  </Col>
                </Row>
                <Divider style={{marginBottom: 50}}/>
                {this.raceDetailView()}
                <svg height="0" width="0">
                  <defs>
                    <linearGradient id="gradient-circle-progress-open">
                      <stop
                              offset="5%"
                              stopColor="#F60"
                      />
                      <stop
                              offset="95%"
                              stopColor="#FF6"
                      />
                    </linearGradient>
                  </defs>
                </svg>
                <svg height="0" width="0">
                  <defs>
                    <linearGradient id="gradient-circle-progress-closed">
                      <stop
                              offset="5%"
                              stopColor="#4145F0"
                      />
                      <stop
                              offset="95%"
                              stopColor="#2AE4F6"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
      );

    }
    //TODO message about empty races.
    return (<div></div>);
  }
}