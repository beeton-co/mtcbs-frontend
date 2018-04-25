import React, {PureComponent} from 'react';
import {Tabs, Collapse, Table} from 'antd';
import * as utils from "../../../actions/utils";
import * as priceengine from '../../../actions/priceengine';
import _ from 'lodash';
import DescriptionList from '../../../components/DescriptionList';


const {Description} = DescriptionList;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;


const columns = [{
  title: 'Coin',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Coin Symbol',
  dataIndex: 'symbol',
  key: 'symbol',
  render: text =>
          <img className="avatar dash-logo" key={`coin-${text}`} alt="dash-logo"
               src={process.env.PUBLIC_URL + `/coin-svg/${text.toLowerCase()}.svg`}/>,
}, {
  title: 'Number of Bets',
  dataIndex: 'numOfBets',
  key: 'numOfBets'
}];


export default class RacesView extends PureComponent {
  constructor(props) {
    super(props);
    console.log(this.props);
    if (this.props.items) {
      this.state.loading = false;
      this.state.races = this.props.items;
    }

    this.state.channelOwner = this.props.channelOwner;

  }

  state = {
    races: undefined,
    loading: true,
    channelOwner: false
  };

  componentWillReceiveProps(nextProps) {

    if (nextProps.items) {
      this.setState({races: nextProps.items});
    }

    this.setState({channelOwner: nextProps.channelOwner});

  }

  renderParticipatingCoins(coinArray) {
    let coins = [];

    for (let i = 0; i < coinArray.length; i++) {
      coins.push(<img className="avatar dash-logo" key={`coin-${coinArray[i]}`} alt="dash-logo"
                      src={process.env.PUBLIC_URL + `/coin-svg/${priceengine.getCoinSymbol(coinArray[i]).toLowerCase()}.svg`}/>)
    }

    return coins;
  }

  renderCoinsBetCount(channelOwner, race) {
    if (channelOwner) {
      const {betsCount} = race;
      const data = [];
      for (let key in betsCount) {
        // check also if property is not inherited from prototype
        if (betsCount.hasOwnProperty(key)) {
          const coin = priceengine.getCachedCoin(key);
          data.push({key: utils.id(), name: coin.name, symbol: coin.symbol, numOfBets: betsCount[key]})
        }
      }

      return (
              <DescriptionList size="large" title="Bet Stats" style={{marginBottom: 32}} col="2">
                <Description term="Total number of bets">{race.totalNumOfBets}</Description>
                <Description term="Count" style={{color: "black"}}>
                  <Table dataSource={data} columns={columns}/>
                </Description>
              </DescriptionList>
      );
    }
  }


  renderRacePanels(races) {
    let result = [];
    let self = this;

    _.forEach(races, function (race) {
      const startTime = new Date(race.startTime * 1000).toLocaleString();
      const endTime = new Date((race.startTime + race.duration) * 1000).toLocaleString();
      const bstartTime = new Date(race.bStartTime * 1000).toLocaleString();
      result.push(
              <Panel header={race.name} key={race.id}>
                <DescriptionList size="large" title="Race Information" style={{marginBottom: 32}} col="2">
                  <Description term="Betting start time" style={{color: "black"}}>{bstartTime}</Description>
                  <Description term="Race start time">{startTime}</Description>
                  <Description term="Race end time">{endTime}</Description>
                  <Description term="Minimum of bets">{race.minNumOfBets}</Description>
                  <Description term="Number of coins">{race.coinIds.length}</Description>
                  <Description term="Coins">{self.renderParticipatingCoins(race.coinIds)}</Description>

                </DescriptionList>
                {self.renderCoinsBetCount(self.state.channelOwner, race)}
              </Panel>
      );
    });
    return result;
  }

  renderRacesTableFor(status) {

    if (utils.nonNull(this.state.races)) {
      if (utils.nonNull(this.state.races[status])) {
        return (
                <Collapse accordion>
                  {this.renderRacePanels(this.state.races[status])}
                </Collapse>
        );
      }
    }
    return (
            <Collapse accordion>
              <Panel header="No Races" key="1">
                <p>No '{status}' races</p>
              </Panel>
            </Collapse>
    );
  }

  render() {

    return (
            <div className="card-container myraces-container">
              <div style={{marginTop: 50, fontSize: 24, fontWeight: 500, color: "#fff", textTransform: "uppercase"}}>
                {this.props.title}
              </div>

              <Tabs type="card" defaultActiveKey="running-bets" style={{width: "100%", height: "100%", marginTop: 100}}>
                <TabPane tab="Running" key="running-bets">{this.renderRacesTableFor('running')}</TabPane>
                <TabPane tab="Completed" key="completed-bets">{this.renderRacesTableFor('completed')}</TabPane>
                <TabPane tab="Betting" key="betting-bets">{this.renderRacesTableFor('betting')}</TabPane>
                <TabPane tab="Void" key="void-bets">{this.renderRacesTableFor('void')}</TabPane>
              </Tabs>
            </div>
    );
  }
}