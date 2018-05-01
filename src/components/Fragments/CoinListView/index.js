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
    amount: false,
    bets: false,
    change: false,
    endPrice: false,
    startPrice: false,
    idBase: 0
  };

  getFlag(flag) {
    if (utils.isNull(flag)) {
      return true;
    }
    return flag;
  }

  render() {

    const {coins, loading, priceClass, avatarsOnly, empty} = this.props;
    let priceCls = priceClass;
    if(utils.isNull(priceCls)){
      priceCls ='';
    }
    if(empty){
      return (
              <Card bordered={false} style={{marginTop: 24}} bodyStyle={{padding: '0 32px 40px 32px'}}>
                <List className="listCard" size="large" rowKey="id" loading={loading}/>
              </Card>
      );
    }
    if(avatarsOnly) {
      return (
              <Card bordered={false} style={{marginTop: 24}} bodyStyle={{padding: '0 32px 40px 32px'}}>
                <List className="listCard" size="large" rowKey="id" loading={loading} dataSource={coins}
                      renderItem={item => (
                              <ListItem>
                                <ListItemMeta title=" " description={this.getCoinName(item)} avatar={
                                  <Avatar src={`/coin-svg/${this.getCoinSymbol(item).toLowerCase()}.svg`} shape="square" size="large"/>}/>

                              </ListItem>
                      )}
                />
              </Card>
      );
    }
    return (<Card bordered={false} style={{marginTop: 24}} bodyStyle={{padding: '0 32px 40px 32px'}}>
      <List className="listCard" size="large" rowKey="id" loading={loading} dataSource={coins}
            renderItem={coin => (
                    <ListItem>
                      <ListItemMeta title=" " description={this.getCoinName(coin)} avatar={
                        <Avatar src={`/coin-svg/${this.getCoinSymbol(coin).toLowerCase()}.svg`} shape="square" size="large"/>}/>

                      <div className="listContent">
                        {this.renderAmount(coin)}
                        {this.renderBets(coin)}
                        {this.renderStartPrice(coin, priceCls)}
                        {this.renderEndPrice(coin, priceCls)}
                        {this.renderChange(coin, priceCls)}
                      </div>
                    </ListItem>
            )}
      />
    </Card>);
  }

  getCoinSymbol(coin) {
    if (utils.nonNull(coin.symbol)) {
      return coin.symbol.toLowerCase();
    }
    if (utils.nonNull(coin.coinId)) {
      return priceengine.getCoinSymbol(coin.coinId);
    }
    if (utils.nonNull(coin.id)) {
      return priceengine.getCoinSymbol(coin.id);
    }
    return priceengine.getCoinSymbol(coin);
  }

  getCoinName(coin) {

    for (let i = 0; i < priceengine.getAvailableCoins().length; i++) {
      let id = coin;
      if (utils.nonNull(coin.coinId)) {
        id = coin.coinId;
      }
      if (utils.nonNull(coin.id)) {
        id = coin.id;
      }
      if (priceengine.getAvailableCoins()[i].id === id) {
        return priceengine.getAvailableCoins()[i].name;
      }
    }
    return '';
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

  renderChange(coin, priceCls) {
    const priceClass = priceCls + " listContentItem";
    if (this.state.change) {
      return (
              <div className={priceClass}>
                <span>Change (%)</span>
                <p>{coin.change}</p>
              </div>
      );
    }
  }

  renderEndPrice(coin, priceCls) {
    const priceClass = priceCls + " listContentItem";
    if (this.state.endPrice) {
      return (
              <div className={priceClass}>
                <span>End Price</span>
                <p>{coin.endPrice}</p>
              </div>
      );
    }
  }

  renderStartPrice(coin, priceCls) {
    const priceClass = priceCls + " listContentItem";
    if (this.state.startPrice) {
      return (
              <div className={priceClass}>
                <span>Start Price</span>
                <p>{coin.startPrice}</p>
              </div>
      );
    }
  }
}