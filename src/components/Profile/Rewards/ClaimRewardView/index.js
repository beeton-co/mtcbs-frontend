import React, {PureComponent} from 'react';
import * as utils from "../../../../actions/utils";
import {Redirect} from 'react-router-dom';
import Rewards from '../../Rewards';


export default class ClaimRewardView extends PureComponent {
  constructor(props) {
    super(props);
    if (utils.nonNull(this.props.econtract.account) &&
            utils.nonNull(this.props.econtract.account.default)) {
      this.props.getUserClaimRewards(this.props.econtract.account.default);
    }
  }

  render() {
    if (utils.redirect(this.props)) {
      return <Redirect to='/home' {...this.props} />;
    }
    const bets = this.props.bets;
    let data = [];
    if (utils.nonNull(bets) && utils.nonNull(bets.claimedRewards)) {
      data = bets.claimedRewards;
      let count = 0;
      data.forEach(function (value) {
        value['key'] = count++;
      });
    }
    return (<Rewards data={data} channelOwner={false} title="Claimed Rewards" {...this.props}/>);
  }
}