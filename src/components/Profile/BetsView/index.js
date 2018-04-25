import React, {PureComponent} from 'react';
import {Tabs, Table} from 'antd';
import * as utils from "../../../actions/utils";
import {Redirect} from 'react-router-dom'
import * as coin from '../../../actions/pocketcoin';

const TabPane = Tabs.TabPane;

console.log(coin.web3Instance);
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
}, {
  title: 'Race Duration',
  dataIndex: 'rDuration',
  key: 'rDuration',
}];

export default class BetsView extends PureComponent {
  constructor(props) {
    super(props);
    if (utils.nonNull(this.props.econtract.account) && utils.nonNull(this.props.econtract.account.default)) {
      //this.props.getUserBets(this.props.econtract.account.default);
      // ajax request after empty completing
      console.log('about to call setTimeout');
      setTimeout(() => {
        console.log('called');
        this.setState({loading:false,
          bets: {running:[{
            
            key:16,
            coinName: 'Bitcoin',
            coinSymbol: 'BTC',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }, {key:15,
            coinName: 'Ethereum',
            coinSymbol: 'ETH',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }, {key:14,
            coinName: 'LiteCoin',
            coinSymbol: 'LTC',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }, {key:13,
            coinName: 'NEO',
            coinSymbol: 'NEO',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }],
          completed:[{key:12,
            coinName: 'Bitcoin',
            coinSymbol: 'BTC',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }, {key:11,
            coinName: 'Ethereum',
            coinSymbol: 'ETH',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }, {key:10,
            coinName: 'LiteCoin',
            coinSymbol: 'LTC',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }, {key:9,
            coinName: 'NEO',
            coinSymbol: 'NEO',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }],
          'void':[{key:8,
            coinName: 'Bitcoin',
            coinSymbol: 'BTC',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }, {key:7,
            coinName: 'Ethereum',
            coinSymbol: 'ETH',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }, {key:6,
            coinName: 'LiteCoin',
            coinSymbol: 'LTC',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }, {key:5,
            coinName: 'NEO',
            coinSymbol: 'NEO',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }],
          betting:[{key:4,
            coinName: 'Bitcoin',
            coinSymbol: 'BTC',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }, {key:3,
            coinName: 'Ethereum',
            coinSymbol: 'ETH',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }, {key:2,
            coinName: 'LiteCoin',
            coinSymbol: 'LTC',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }, {key:1,
            coinName: 'NEO',
            coinSymbol: 'NEO',
            amount: 10000000000000,
            raceName: 'Top 4',
            rStartTime: 1524592995,
            rDuration: 3600
          }]}
        });
      }, 1000);
    }
  }

  state = {
    bets: undefined,
    loading: true,
  };

  componentWillReceiveProps(nextProps) {
    const {profile} = nextProps;
    if (utils.nonNull(profile)) {
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
    console.log(status);
    let bets = [];
    if (utils.nonNull(this.state.bets)) {
      if (utils.nonNull(this.state.bets[status])) {
        bets = this.state.bets[status];
      }
    }
    return (<Table loading={this.state.loading} dataSource={bets} columns={columns}/>);
  }

  render() {
    console.log(this.state);
    const {econtract} = this.props;

    if (utils.isNull(econtract.user) || utils.isNull(econtract.account) || utils.isNull(econtract.account.default)) {
      //notification.warn('No account could be identified. Please authenticate via metamask (https://www.metamask.io)')
      return <Redirect to='/home' {...this.props} />;
    }

    return (
            <div className="card-container">
              <div style={{ marginTop: 50, fontSize: 24, fontWeight: 500, color:"#fff", textTransform: "uppercase" }}>My Bets</div>
              <Tabs type="card" defaultActiveKey="running-bets" style={{width: "100%", height: "100%", marginTop: 100}}>
                <TabPane tab="Running" key="running-bets">{this.renderBetsTableFor('running')}</TabPane>
                <TabPane tab="Completed" key="completed-bets">{this.renderBetsTableFor('completed')}</TabPane>
                <TabPane tab="Betting" key="betting-bets">{this.renderBetsTableFor('betting')}</TabPane>
                <TabPane tab="Void" key="void-bets">{this.renderBetsTableFor('void')}</TabPane>
              </Tabs>
            </div>
    );
  }
}