import React, {PureComponent} from 'react';
import * as utils from "../../../../actions/utils";
import {Redirect} from 'react-router-dom';
import Rewards from '../../Rewards';
import {Row} from 'antd'

export default class PayOutView extends PureComponent {
  constructor(props) {
    super(props);
    if (utils.nonNull(this.props.econtract.account) &&
            utils.nonNull(this.props.econtract.account.default)) {
      this.props.getUserPayOutReward(this.props.econtract.account.default);
    }
  }

  render() {
    if (utils.redirect(this.props)) {
      return <Redirect to='/home' {...this.props} />;
    }
    const bets = this.props.bets;
    let data = [];
    if (utils.nonNull(bets) && utils.nonNull(bets.payout)) {
      data = bets.payout;
      let count = 0;
      data.forEach(function (value) {
        value['key'] = count++;
      });
    }
    return (
            <Row>
              <Row>
                <div style={{marginTop: 50, marginBottom: 25,fontSize: 24, fontWeight: 500, color: "#fff", textTransform: "uppercase"}}>
                  Pay Out Rewards
                </div>
              </Row>
              <Row>
                <Rewards data={data} channelOwner={false} title="Pay Out Rewards" {...this.props}/>
              </Row>
            </Row>);
  }
}