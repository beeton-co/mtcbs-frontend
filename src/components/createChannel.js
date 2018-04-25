import React, { Component } from 'react';
import { Card } from 'antd';
import CreateChannelForm from './createChannelForm';
import * as utils from "../actions/utils";


class CreateChannel extends Component {
  constructor(props) {
    super(props);
    this.handleCreateChannel = this.handleCreateChannel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }

  handleCreateChannel(form) {
    const {econtract} = this.props;
    if (utils.nonNull(econtract.account) && utils.nonNull(econtract.account.default)){
      this.props.createChannel(form.channelName, form.description);
    }
  }
    render() {
        return (
            <div className="create-channel">
                <Card
                    className="create-channel-card"
                    cover={
                        <div>
                            <CreateChannelForm onSubmit={this.handleCreateChannel} />
                        </div>
                    }
                >
                </Card>
            </div>
        );
    }
}

export default CreateChannel;
