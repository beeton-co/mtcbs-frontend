import React, {Component} from 'react';
import * as utils from "../../../actions/utils";
import {Card} from 'antd';
import {CreateChannelValidationForm} from "../../Forms/createChannelForm";
import * as notification from '../../../services/notification';
import  { Redirect } from 'react-router-dom'

export default class CreateChannel extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state ={
    redirect: false
  };

  componentWillReceiveProps(nextProps) {
    if(utils.nonNull(nextProps.econtract.cChannelResult) &&
            utils.nonNull(nextProps.econtract.cChannelResult.tx)){
      this.setState({redirect:true});
    }
  }

  handleSubmit = (data) => {
    const {econtract} = this.props;
    if (utils.nonNull(econtract.account) && utils.nonNull(econtract.account.default)){
      this.props.createChannel(data.channelName, data.description);
    }else{
      notification.warn('No account could be identified. Please authenticate via metamask (https://www.metamask.io)')
    }
  };

  render() {
    if (this.state.redirect ||
            (utils.nonNull(this.props.econtract.user) && this.props.econtract.user.channelOwner)){
      return <Redirect to='/home' {...this.props} />;
    }
    return (<Card  style={{marginTop: 32}} bordered={false}>
      <div className="pocket-form">
        <CreateChannelValidationForm onSubmit={this.handleSubmit}/>
      </div>
    </Card>);
  }
}