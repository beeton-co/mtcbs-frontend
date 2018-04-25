import React, {Component} from 'react';
import {Select, Spin} from 'antd';
import * as priceengine from '../../actions/priceengine';
const Option = Select.Option;
export const coins = [];

export default class CoinSelect extends Component {
  state = {
    value: [],
    fetching: true,
  };

  handleChange = (value) => {
    this.props.selectValueChanged(value);
    this.setState({
      value,
      fetching: false,
    });
  };

  render() {
    const {fetching, value} = this.state;
    return (
            <Select mode="multiple"
                    value={value}
                    placeholder="Select Coins"
                    notFoundContent={fetching ? <Spin size="small"/> : null}
                    filterOption={false}
                    onChange={this.handleChange}
                    style={{width: '100%'}}>
              {priceengine.getAvailableCoins().map(d => <Option key={d.id}>{d.name}</Option>)}
            </Select>
    );
  }
}