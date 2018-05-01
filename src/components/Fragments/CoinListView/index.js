import React, {Component} from 'react';
import {Card, List, Avatar} from 'antd';
import * as utils from '../../../actions/utils';
import * as priceengine from '../../../actions/priceengine';

const ListItemMeta = List.Item.Meta;
const ListItem = List.Item;

export default class CoinListView extends Component {
  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(nextProps) {
    const {amount, startPrice, endPrice, change, bets} = nextProps;
    this.setState({
      amount: this.getFlag(amount),
      startPrice: this.getFlag(startPrice),
      endPrice: this.getFlag(endPrice),
      change: this.getFlag(change),
      bets: this.getFlag(bets)
    });
  }

  state = {
    amount: true,
    bets: true,
    change: true,
    endPrice: true,
    startPrice: true,
    idBase: 0
  };

  getFlag(flag) {
    if (utils.isNull(flag)) {
      return true;
    }
    return flag;
  }

  render() {
    const {coins, loading} = this.props;

    return (<Card bordered={false} style={{marginTop: 24}} bodyStyle={{padding: '0 32px 40px 32px'}}>
      <List className="listCard" size="large" rowKey="id" loading={loading} dataSource={coins}
            renderItem={coin => (
                    <ListItem>
                      <ListItemMeta title=" " description={this.getCoinName(coin)} avatar={
                        <Avatar src={`/coin-svg/${this.getCoinName(coin).toLowerCase()}.svg`} shape="square" size="large"/>}/>

                      <div className="listContent">
                        {this.renderAmount(coin)}
                        {this.renderBets(coin)}
                        {this.renderStartPrice(coin)}
                        {this.renderEndPrice(coin)}
                        {this.renderChange(coin)}
                      </div>
                    </ListItem>
            )}
      />
    </Card>);
  }

  getCoinName(coin) {
    if (utils.nonNull(coin.symbol)) {
      return coin.symbol.toLowerCase();
    }
    if (utils.nonNull(coin.coinId)) {
      return priceengine.getCoinSymbol(coin.coinId);
    }
    return priceengine.getCoinSymbol(coin);
  }

  renderBets(coin) {
    if (this.state.bets) {
      return (
              <div className="listContentItem">
                <span>Number of Bets</span>
                <p>{coin.numOfBets}</p>
              </div>
      );
    }
  }

  renderAmount(coin) {
    if (this.state.amount) {
      return (
              <div className="listContentItem">
                <span>Total Amount</span>
                <p>{coin.total}</p>
              </div>
      );
    }
  }

  renderChange(coin) {
    if (this.state.change) {
      return (
              <div className="finishedListContentItem listContentItem">
                <span>Change (%)</span>
                <p>{coin.change}</p>
              </div>
      );
    }
  }

  renderEndPrice(coin) {
    if (this.state.endPrice) {
      return (
              <div className="finishedListContentItem listContentItem">
                <span>End Price</span>
                <p>{coin.endPrice}</p>
              </div>
      );
    }
  }

  renderStartPrice(coin) {
    if (this.state.startPrice) {
      return (
              <div className="listContentItem">
                <span>Start Price</span>
                <p>{coin.startPrice}</p>
              </div>
      );
    }
  }
}