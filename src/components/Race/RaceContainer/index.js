import React, {Component} from 'react';
import {Carousel, Divider, Card, Row, Col, List, Avatar} from 'antd';
import DashCard from "../../DashCard";
import * as priceengine from '../../../actions/priceengine';
import * as utils from '../../../actions/utils';

const ListItemMeta = List.Item.Meta;
const ListItem = List.Item;
export default class RaceContainer extends Component {

  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.raceDetailView = this.raceDetailView.bind(this);
    this.getCoinName = this.getCoinName.bind(this);
    this.getCoinSymbol = this.getCoinSymbol.bind(this);
    this.leadingCoin =this.leadingCoin.bind(this);
    props.getCoins(0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coins.length > 0 && utils.nonNull(nextProps.coins[0].hits)) {
      this.setState({coins: nextProps.coins[0].hits, loading: false});
    }
    if (nextProps.rcd.length > 0) {
      this.setState({loading: false});
    }
    this.setState({status:this.props.status});
  }

  eventHandler(id) {
    this.setState({raceDetailId: id});
  }

  getCoinName(id) {
    for (let i = 0; i < this.state.coins.length; i++) {
      if (this.state.coins[i].id === id) {
        return this.state.coins[i].name;
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

  runningRaceDetailView(race) {
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
                                    <span>Current Price</span>
                                    <p>{coin.currentPrice}</p>
                                  </div>
                                  <div className="runningListContentItem listContentItem">
                                    <span>Current Change (%)</span>
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

  leadingCoin(race) {
    if(priceengine.hasPrice(race.id)) {
      const prices = priceengine.getPriceInfo(race.id);
      return prices.coins[0].symbol;
    }else{
      const name = this.getCoinName(race.coinIds[0]);
      return name.length > 4 ? name.substring(0, 4) : name;
    }
  }

  completedRaceDetailView(race) {
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
                                    <span>End Price</span>
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

  voidRaceDetailView() {
  }

  raceDetailView() {

    let raceResult = this.props.races;
    let races = [];
    if (raceResult.length > 0) {
      races = raceResult[0][this.props.status].hits;
    }
    let race = undefined;
    let selectedIndex = -1;
    if (races.length > 0) {
      const raceId = this.state.raceDetailId === '' ? races[0].id : this.state.raceDetailId;
      for (let i = 0; i < races.length; i++) {
        if (races[i].id === raceId) {
          race = races[i];
          selectedIndex = i;
          break;
        }
      }
    }
    if (race === undefined) {
      return (<div></div>);
    }
    if (this.state.coins.length === 0) {
      return (<div className="standardList">
        <Card bordered={false} style={{marginTop: 24}} bodyStyle={{padding: '0 32px 40px 32px'}}>
          <List className="listCard" size="large" rowKey="id" loading={true}/>
        </Card>
      </div>);
    }
    else if (!priceengine.hasPrice(race.id)) {
      this.props.getDetailRaceCoins(this.props.status, race.id);
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
      if (this.props.status === 'running') {
        return this.runningRaceDetailView(priceengine.getPriceInfo(race.id));
      }
    }
  }

  render() {
    let raceResult = this.props.races;
    let races = [];
    if (raceResult.length > 0) {
      const current = raceResult[0][this.props.status];
      if(utils.isNull(current)){
        this.setState({status:''});
        return (<div></div>);
      }
      races = raceResult[0][this.props.status].hits;
    }
    if (races && (races.length > 0)) {

      let scrollCount = Math.floor(races.length / 6);
      if (((races.length % 6) !== 0 ) && races.length > 6) {
        scrollCount++;
      }
      const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        /*centerMode: true,*/
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1
      };

      return (
              <div>
                <Row>
                  <Col sm={1}>
                  </Col>
                  <Col sm={19}>
                    <Carousel {...settings}>
                      {races.map(r => <div className="dash-card">
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