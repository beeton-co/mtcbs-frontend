
import React, {Component} from 'react';
import * as utils from "../../../actions/utils";
import {Card} from 'antd';
import {CreateChannelValidationForm} from "../../Forms/createChannelForm";
import * as notification from '../../../services/notification';
import  { Redirect } from 'react-router-dom'

export default class BoothProfile extends Component {

  render() {
    if (utils.isNull(this.props.econtract.user) || !this.props.econtract.user.channelOwner){
      return <Redirect to='/' {...this.props} />;
    }
    return ('');
  }
}