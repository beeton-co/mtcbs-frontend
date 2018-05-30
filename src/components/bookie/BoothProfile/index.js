import React, {Component} from 'react';
import * as utils from "../../../actions/utils";
import {Card, Row, Col, Button} from 'antd';
import {Redirect} from 'react-router-dom';
import {NumberPicker} from 'react-widgets';


const ProfileEntry = (props) => {
  const {name, value} = props;
  return (<Row gutter={40} style={{marginBottom: 4}}>
    <Col sm={3} className='description'>
      <div className='term'>{name}</div>
    </Col>
    <Col sm={11} className='description'>
      <div className='detail'>{value}</div>
    </Col>
    <Col sm={10}>
    </Col>
  </Row>);
};
const config = {defaultValue: 0.1, min: 0.1, max: 100, step: 0.1, culture: 'en', format: "0.0"};
const AccountEntry = (props) => {
  const {name, value, handleLoadAccount, handleValueChange} = props;
  return (<Row gutter={40} style={{marginBottom: 4}}>
    <Col sm={3} className='description'>
      <div className='term'>{name}</div>
    </Col>
    <Col sm={11} className='description'>

      <Row>
        <Col sm={2}>
          <div className='detail'>{value}</div>
        </Col>
        <Col sm={4}>
          <NumberPicker onChange={handleValueChange} format={config.format.value} {...config} />
        </Col>
        <Col sm={5}><Button type="primary" onClick={handleLoadAccount}>Load Account</Button></Col>

      </Row>
    </Col>
    <Col sm={10}>
    </Col>
  </Row>);
};

export default class BoothProfile extends Component {
  constructor(props) {
    super(props);
    this.handleLoadAccount = this.handleLoadAccount.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  state ={reload:false, value:"0.1"};

  handleLoadAccount() {
    this.setState({reload:false});
    this.props.reloadAccount(String(this.state.value));
  }

  handleValueChange(value){

    this.setState({value:value});
  }

  componentWillReceiveProps(nextProps) {
    const contract = nextProps.econtract;
    this.setState({reload:false});
    if(utils.nonNull(contract.user) &&
            utils.nonNull(contract.user.accountReloaded)){
      if(contract.user.accountReloaded  && !this.state.reload) {
        this.setState({reload:true});
        this.props.myBooth();
      }
    }
  }

  render() {
    if (utils.isNull(this.props.econtract.user) || !this.props.econtract.user.channelOwner) {
      return <Redirect to='/' {...this.props} />;
    }

    const contract = this.props.econtract;

    const name = {'name': 'Name', 'value': contract.user.channel.name};
    const description = {'name': 'Description', 'value': contract.user.channel.description};
    const accountValue = contract.user.channel.account + ' ETH';
    const account = {'name': 'Account Balance', 'value': accountValue, handleLoadAccount: this.handleLoadAccount, handleValueChange: this.handleValueChange};
    const network = {'name': 'Network', 'value': contract.network.id};

    return (<Card bordered={false} title="Channel Profile">
      <div className='descriptionList' style={{marginBottom: 32}} size="large">
        <ProfileEntry {...name}/>
        <ProfileEntry {...description}/>
        <AccountEntry {...account}/>
        <ProfileEntry {...network}/>
      </div>
    </Card>);
  }
}