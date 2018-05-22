import React, {PureComponent} from 'react';
import {Tabs,Collapse,  Table} from 'antd';
import * as utils from "../../../actions/utils";
import {Redirect} from 'react-router-dom'
import * as coin from '../../../actions/pocketcoin';


const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

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
    if (utils.nonNull(this.state.bets) && utils.nonNull(this.state.bets[status])) {

        bets = this.state.bets[status];
        let groups = [];
        bets.forEach(function (bet) {
          bet['key'] = utils.id();
          let group = groups[bet.raceName];
          if(utils.isNull(group)){
            group = groups[bet.raceName] = [];
          }
          group.push(bet);
        });
        let result = [];
        for (let key in groups) {
          // check also if property is not inherited from prototype
          if (groups.hasOwnProperty(key)) {
            const groupBets = groups[key];
            //
            result.push(
                      <Collapse accordion key={utils.id()}>
                        <Panel header={key} key={utils.id()}>
                          <Table loading={false} dataSource={groupBets} columns={columns}/>
                        </Panel>
                    </Collapse>);
          }
        }
        return result;
    }else{
      return (<Table loading={false} dataSource={[]} columns={columns}/>);
    }

  }

  render() {
    if (utils.redirect(this.props)) {
      return <Redirect to='/' {...this.props} />;
    }
    return (
            <div className="card-container">
              <div style={{ marginTop: 50, fontSize: 24, fontWeight: 500, color:"#fff", textTransform: "uppercase" }}>My Bets</div>
              <Tabs type="card" defaultActiveKey="completed-bets" style={{width: "100%", height: "100%", marginTop: 100, overflowY: "scroll"}}>
                <TabPane tab="Completed" key="completed-bets">{this.renderBetsTableFor('completed')}</TabPane>
                <TabPane tab="Running" key="running-bets">{this.renderBetsTableFor('running')}</TabPane>
                <TabPane tab="Betting" key="betting-bets">{this.renderBetsTableFor('betting')}</TabPane>
                <TabPane tab="Void" key="void-bets">{this.renderBetsTableFor('void')}</TabPane>
              </Tabs>
            </div>
    );
  }
}