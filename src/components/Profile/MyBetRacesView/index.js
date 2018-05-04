import React, {PureComponent} from 'react';
import * as utils from "../../../actions/utils";
import {Redirect} from 'react-router-dom';
import RacesView from '../RaceView';


export default class MyBetRacesView extends PureComponent {
  constructor(props) {
    super(props);
    if (utils.nonNull(this.props.econtract.account) && utils.nonNull(this.props.econtract.account.default)) {
      //this.props.getUserBets(this.props.econtract.account.default);
    }
  }
  render() {
    if (utils.redirect(this.props)) {
      return <Redirect to='/home' {...this.props} />;
    }


    return (<RacesView items={this.props.profile.bets} channelOwner={false} title="My Bets"/>);
  }
}