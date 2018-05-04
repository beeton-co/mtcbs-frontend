import React, {PureComponent} from 'react';
import * as utils from "../../../actions/utils";
import {Redirect} from 'react-router-dom';
import {Table} from 'antd';
import * as ethutils from '../../../actions/network_integration';

const columns = [{
  title: 'Race',
  dataIndex: 'race',
  key: 'race',
}, {
  title: 'Race Address',
  dataIndex: 'address',
  key: 'address'
}, {
  title: 'Claim Date',
  dataIndex: 'timestamp',
  key: 'timestamp',
  render: text => new Date(parseInt(text, 10) * 1000).toLocaleString(),
}, {
  title: 'Amount (Ether)',
  dataIndex: 'amount',
  key: 'amount',
  render: text => ethutils.web3Instance.utils.fromWei(String(text), 'ether') ,
}];


export default class Rewards extends PureComponent {

  render() {
    if (utils.redirect(this.props)) {
      return <Redirect to='/home' {...this.props} />;
    }
    return (<Table rowClassName="rewards-table" dataSource={this.props.data} columns={columns}/>);
  }
}