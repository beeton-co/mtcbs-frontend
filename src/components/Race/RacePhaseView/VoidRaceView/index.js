import React, {Component} from 'react';
import {Carousel, Divider, Card, Row, Col} from 'antd';
import DashCard from "../../../DashCard";
import * as priceengine from '../../../../actions/priceengine';
import * as utils from '../../../../actions/utils';
import DescriptionList from '../../../../components/DescriptionList';

const { Description } = DescriptionList;

export default class UpComingRaceView extends Component {

  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.getCoinName = this.getCoinName.bind(this);
    this.props.getRacesByStatus('void', 0);
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

  renderParticipatingCoins(coinArray){
    let coins = [];

    for (let i = 0; i < coinArray.length; i++){
      coins.push(<img className="avatar dash-logo" key={`coin-${coinArray[i]}`} alt="dash-logo"
                      src={process.env.PUBLIC_URL + `/coin-svg/${priceengine.getCoinSymbol(coinArray[i]).toLowerCase()}.svg`} />)
    }

    return coins;
  }

  render() {
    let raceResult = this.props.races;
    let races = [];
    if (raceResult.length > 0) {
      if(utils.isNull(raceResult[0].void)){
        this.props.getRacesByStatus('void', 0);
      }else{
        races = raceResult[0].void.hits;
      }
    }
    if (utils.nonNull(races) && (races.length > 0)) {
      const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1
      };

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

      const startTime = new Date(race.startTime *1000).toLocaleString();
      const endTime = new Date((race.startTime +race.duration) *1000).toLocaleString();
      const bstartTime = new Date(race.bStartTime *1000).toLocaleString();
      return (
              <div style={{marginTop: 50}}>
                <Row>
                  <Col sm={1}>
                  </Col>
                  <Col sm={19}>
                    <Carousel {...settings}>
                      {races.map(r => <div className="dash-card">
                        <DashCard key={r.id}
                                  raceId={r.id}
                                  leadingCoin=''
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
                <Divider style={{marginBottom: 100}}/>
                <Card>
                  <DescriptionList size="large" col="2" title="Race Information" style={{ marginBottom: 32 }}>
                    <Description term="Race Name">Combination of ...</Description>
                    <Description term="Betting start time">{bstartTime}</Description>
                    <Description term="Race start time">{startTime}</Description>
                    <Description term="Race end time">{endTime}</Description>
                    <Description term="Number Of Coins">{race.coinIds.length}</Description>
                    <Description term="Coins">{this.renderParticipatingCoins(race.coinIds)}</Description>
                  </DescriptionList>
                </Card>
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