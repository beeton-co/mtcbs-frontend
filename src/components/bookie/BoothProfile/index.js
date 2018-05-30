import React, {Component} from 'react';
import * as utils from "../../../actions/utils";
import {Card, Row, Col} from 'antd';
import {Redirect} from 'react-router-dom'
import DescriptionList from '../../../components/DescriptionList';

const {Description} = DescriptionList;

const ProfileEntry = (props) => {
  const {name, value} = props;
  return(<Row gutter={40} style={{marginBottom: 4}}>
    <Col sm={2} className='description' >
      <div className='term'>{name}</div>
    </Col>
    <Col sm={10} className='description'>
      <div className='detail'>{value}</div>
    </Col>
    <Col sm={10}>
    </Col>
  </Row>);
};

const AccountEntry = () => {
  /*
  <Button type="primary" htmlType="submit" loading={submitting} disabled={pristine || submitting}>
          Create
        </Button>
   */
};

export default class BoothProfile extends Component {
  constructor(props){
    super(props);
    this.handleLoadAccount = this.handleLoadAccount.bind(this);
  }

  handleLoadAccount(){

  }
  render() {
    if (utils.isNull(this.props.econtract.user) || !this.props.econtract.user.channelOwner) {
      return <Redirect to='/' {...this.props} />;
    }

    const contract = this.props.econtract;

    const name = {'name': 'Name', 'value': contract.user.channel.name};
    const description = {'name': 'Description', 'value': contract.user.channel.description};
    const accountValue = contract.user.channel.account + ' ETH';
    const account = {'name': 'Account Balance', 'value': accountValue};
    const network = {'name': 'Network', 'value': contract.network.id};

    return (<Card bordered={false} title="Channel Profile">
      <div className='descriptionList' style={{marginBottom: 32}} size="large" >
        <ProfileEntry {...name}/>
        <ProfileEntry {...description}/>
        <ProfileEntry {...account}/>
        <ProfileEntry {...network}/>
      </div>
    </Card>);
  }
}