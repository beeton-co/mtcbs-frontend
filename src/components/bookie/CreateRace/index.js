import React, {Component} from 'react';
import {Card} from 'antd';
import * as utils from "../../../actions/utils";
import {CreatePoolForm} from "../../Forms/createPoolForm";
import {message} from 'antd';
import * as notification from '../../../services/notification';
import  { Redirect } from 'react-router-dom'

const HOUR = 60 * 60;
const QUARTER_HOUR = HOUR / 4;
const MIN_BET = 0.1;

class CreateRace extends Component {
  constructor(props) {
    super(props);
    this.handleCreateRace = this.handleCreateRace.bind(this);
    this.selectValueChanged = this.selectValueChanged.bind(this);
    this.onDurationChange = this.onDurationChange.bind(this);
    this.onMinBetChange = this.onMinBetChange.bind(this);
  }

  state = {
    coins: [],
    duration: HOUR,
    minNumOfBets: 3
  };

  componentWillReceiveProps(nextProps) {
  }

  handleCreateRace(form) {
    const minBet = utils.isNull(form.minBet) ? MIN_BET : form.minBet;
    // if (this.state.coins.length < 3) {
    //   message.error('Minimum number of coin violation! At least 3 coins needed for a race.', 600);
    // } else if (this.state.coins.length > 10) {
    //   message.error('Maximum number of coins reached! At most 10 coins can take part in a race.', 600);
    // } else if(this.state.duration < HOUR){
    //   message.error('Shortest race duration is an hour!', 600);
    // }else if (parseFloat(minBet) < MIN_BET){
    //   message.error(`Minimum bet for a race cannot be below ${MIN_BET}`, 600);
    // }else{
      let currentTime = Math.round(new Date().getTime() / 1000);
      const bettingStartTime = Math.floor(form.bettingStartTime.getTime() / 1000);
      const raceStartTime = Math.floor(form.raceStartTime.getTime() / 1000);
      const minNumOfBets = utils.nonNull(form.minNumOfBets) ? form.minNumOfBets: this.state.minNumOfBets;
      const diff = bettingStartTime - currentTime;


      // if (diff <= HOUR){
      //   notification.info('You cannot create a race that starts (both bet placement and race) in less than an hour from now.');
      //   return;
      // }
      //
      // if (raceStartTime <= (bettingStartTime + QUARTER_HOUR)) {
      //   notification.info("Race can't be created. At least 15 minutes is required for people to place their bets!");
      //   return;
      // }
      //this.props.createRace(form.poolName, this.state.coins, String(minBet), bettingStartTime, raceStartTime, this.state.duration, minNumOfBets, false);
    this.props.createRace(form.poolName, this.state.coins, String(minBet), bettingStartTime, raceStartTime, 3*60, minNumOfBets, false);
    //}
  }

  selectValueChanged(value) {
    if (utils.isNull(value)) {
      this.setState({coins: []});
    } else {
      this.setState({coins: value});
    }
  }

  onDurationChange(value){
    this.setState({duration: value});
  }

  onMinBetChange(value) {
    this.setState({minBet: value});
  }

  render() {
    if (utils.isNull(this.props.econtract.user) || !this.props.econtract.user.channelOwner){
      return <Redirect to='/home' {...this.props} />;
    }
    return (<Card style={{marginTop: 32}} bordered={false}>
      <div style={{ marginTop: 50, fontSize: 24, fontWeight: 500, color:"#fff", textTransform: "uppercase" }}>Race creation form</div>
      <CreatePoolForm onSubmit={this.handleCreateRace}
                      onMinBetChange={this.onMinBetChange}
                      selectValueChanged={this.selectValueChanged}
                      onDurationChange={this.onDurationChange}{...this.props}/>
    </Card>);
  }
}

export default CreateRace;
