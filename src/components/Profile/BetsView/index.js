import React, {PureComponent} from 'react';
import {Tabs, Table} from 'antd';
import * as utils from "../../../actions/utils";
import {Redirect} from 'react-router-dom'
import * as coin from '../../../actions/pocketcoin';

const TabPane = Tabs.TabPane;

const columns = [{
  title: 'Coin',
  dataIndex: 'coinName',
  key: 'coinName',
}, {
  title: 'Coin Symbol',
  dataIndex: 'coinSymbol',
  key: 'coinSymbol',
  render: text =>
          <img className="avatar dash-logo" key={`coin-${text}`} alt="dash-logo"
               src={process.env.PUBLIC_URL + `/coin-svg/${text.toLowerCase()}.svg`}/>,
}, {
  title: 'Amount (ETH)',
  dataIndex: 'amount',
  key: 'amount',
  render: text => coin.web3Instance.utils.fromWei(text + '', 'ether'),
}, {
  title: 'Race',
  dataIndex: 'raceName',
  key: 'raceName',
}, {
  title: 'Race Start Time',
  dataIndex: 'rStartTime',
  key: 'rStartTime',
  render: text => new Date(parseInt(text, 10) * 1000).toLocaleString(),
}, {
  title: 'Race Duration',
  dataIndex: 'rDuration',
  key: 'rDuration',
}];

export default class BetsView extends PureComponent {
  constructor(props) {
    super(props);
    if (utils.nonNull(this.props.econtract.account) && utils.nonNull(this.props.econtract.account.default)) {
      this.props.getUserBets(this.props.econtract.account.default);
    }
  }

  state = {
    bets: undefined,
    loading: true,
  };

  componentWillReceiveProps(nextProps) {
    const {profile} = nextProps;
    if (utils.nonNull(profile.bets)) {
      if (utils.nonNull(profile.bets['running']) ||
              utils.nonNull(profile.bets['completed']) ||
              utils.nonNull(profile.bets['betting']) ||
              utils.nonNull(profile.bets['void'])) {
        const {bets} = profile;
        this.setState({bets, loading:false});
      }else{
        this.setState({loading:false});
      }
    }

  }


  renderBetsTableFor(status) {
    let bets = [];
    if (utils.nonNull(this.state.bets)) {
      if (utils.nonNull(this.state.bets[status])) {
        bets = this.state.bets[status];
        let count = 0;
        bets.forEach(function (value) {
          value['key'] = count++;
        })
      }
    }
    return (<Table loading={this.state.loading} dataSource={bets} columns={columns}/>);
  }

  render() {
    if (utils.redirect(this.props)) {
      return <Redirect to='/home' {...this.props} />;
    }
    return (
            <div className="card-container">
              <div style={{ marginTop: 50, fontSize: 24, fontWeight: 500, color:"#fff", textTransform: "uppercase" }}>My Bets</div>
              <Tabs type="card" defaultActiveKey="completed-bets" style={{width: "100%", height: "100%", marginTop: 100}}>
                <TabPane tab="Completed" key="completed-bets">{this.renderBetsTableFor('completed')}</TabPane>
                <TabPane tab="Running" key="running-bets">{this.renderBetsTableFor('running')}</TabPane>
                <TabPane tab="Betting" key="betting-bets">{this.renderBetsTableFor('betting')}</TabPane>
                <TabPane tab="Void" key="void-bets">{this.renderBetsTableFor('void')}</TabPane>
              </Tabs>
            </div>
    );
  }
}