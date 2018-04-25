import React, { Component } from 'react';
import { Card } from 'antd';
import CreatePoolForm from './createPoolForm';
import * as utils from "../actions/utils";

class CreatePool extends Component {
  constructor(props) {
    super(props);
    this.handleCreateRace = this.handleCreateRace.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }

  handleCreateRace(form) {
    const {econtract} = this.props;
    if (utils.nonNull(econtract.account) && utils.nonNull(econtract.account.default)){
      //TODO Valid input
      let context = {};
      context['from'] = econtract.account.default;
      this.props.createChannel(context, form.poolName, form.coins, form.minBet,
              form.bettingStartTime, form.raceStartTime, form.end, form.exclusive);
    }
  }
    render() {
        return (
            <div className="create-pool-flex">
                <Card
                    className="create-pool-card"
                    cover={
                        <div>
                            <CreatePoolForm onSubmit={this.handleCreateRace} />
                        </div>
                    }
                >
                </Card>
            </div>
        );
    }
}

export default CreatePool;
