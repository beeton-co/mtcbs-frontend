import React, {Component} from 'react';
import {Carousel, Divider, Card, Row, Col, List, Avatar, Button} from 'antd';
import DashCard from "../../../DashCard";
import * as priceengine from '../../../../actions/priceengine';
import * as utils from '../../../../actions/utils';
import CountDownTimer from '../../../CountDownTimer';
import DescriptionList from '../../../../components/DescriptionList';

const { Description } = DescriptionList;
const ListItemMeta = List.Item.Meta;
const ListItem = List.Item;

export default class CompletedRaceView extends Component {

  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.raceDetailView = this.raceDetailView.bind(this);
    this.leadingCoin = this.leadingCoin.bind(this);
    this.getDetailedRace = this.getDetailedRace.bind(this);
    this.renderClaimRewardButton = this.renderClaimRewardButton.bind(this);
    this.props.getRacesByStatus('completed', 0);
  }
  state = {
    raceDetailId: null,
    rewards:{}
  };

  componentWillReceiveProps(nextProps) {

    const {econtract} = nextProps;
    if (utils.nonNull(econtract) && utils.nonNull(econtract.reward)){
     if (utils.isNull(this.state.rewards[econtract.reward.race])){
       let rewards = this.state.rewards;
       rewards[econtract.reward.race] = {shown: false, amount:econtract.reward.amount};
       this.setState({rewards});
     }
    }
  }

  eventHandler(id) {
    //Dispatch evens to race contracts to fetch current values;
    // this.props.winningCoins(id);
    // this.props.raceStartPrices(id);
    // this.props.raceEndPrices(id);
    this.props.inspectCoin(id, 1);
    this.props.inspectCoin(id, 2);
    this.props.inspectCoin(id, 3);
    this.props.totalAmount(id);
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
                                  <div className="finishedListContentItem listContentItem">
                                    <span>End Price</span>
                                    <p>{coin.endPrice}</p>
                                  </div>
                                  <div className="finishedListContentItem listContentItem">
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
                <DescriptionList title="Race Information" style={{ marginBottom: 32 }} size="small" col="1">
                  <Description term="Race name">{race.name}</Description>
                  <Description term="Betting start time">{new Date(race.bStartTime *1000).toLocaleString()}</Description>
                  <Description term="Race start time">{new Date(race.startTime *1000).toLocaleString()}</Description>
                  <Description term="Race Duration"><CountDownTimer static={true} duration={race.duration} startTime={race.startTime}/></Description>
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

  raceDetailView() {

    const race = this.getDetailedRace();

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
      this.props.getDetailRaceCoins('completed', race.id);
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

  getDetailedRace() {
    let raceResult = this.props.races;
    let races = [];
    if (raceResult.length > 0) {
      races = raceResult[0].completed.hits;
    }
    if (utils.nonNull(races) && races.length > 0) {
      const raceId = utils.isNull(this.state.raceDetailId) ? races[0].id : this.state.raceDetailId;
      // if(utils.isNull(this.state.raceDetailId) ){
      //   this.props.winningCoins(raceId);
      // }
      for (let i = 0; i < races.length; i++) {
        if (races[i].id === raceId) {
          return races[i];
        }
      }
    }
    return null;
  }

  getRaces(props){
    let raceResult = props.races;
    if (raceResult.length > 0) {
      if(utils.isNull(raceResult[0].completed)){
        props.getRacesByStatus('completed', 0);
      }else{
        return raceResult[0].completed.hits;
      }
    }
    return null;
  }

  renderClaimRewardButton(){
    const race = this.getDetailedRace();
    if(utils.nonNull(race)){
      return (<Card>
        <DescriptionList size="large" col="2" style={{ marginBottom: 32 }}>
          <Description><Button onClick={(event) => this.props.claimReward(race)} ghost>Claim Reward</Button></Description>
        </DescriptionList>
      </Card>);
    }
  }

  render() {

    let races = this.getRaces(this.props);

    if (utils.nonNull(races) && (races.length > 0)) {
      const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        autoplay: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6
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
                {this.renderClaimRewardButton()}
                {this.raceDetailView()}
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