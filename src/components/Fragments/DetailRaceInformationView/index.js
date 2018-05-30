import React from 'react';
import {Card, Divider} from 'antd';
import CountDownTimer from "../../CountDownTimer";
import DescriptionList from '../../../components/DescriptionList';
import * as utils from '../../../actions/utils';
const {Description} = DescriptionList;


export const DetailRaceInformationView = (props) => {
  const {race, col, size, coins, enableCountDown, startTime, duration} = props;
  let timerStatic = true;
  if(enableCountDown) {
    timerStatic = false;
  }
  const renderCoins = ()=> {
    if(utils.nonNull(coins)){
      return (<Description term="Coins">{utils.renderCoinAvatars(coins)}</Description>)
    }
    return (<Description term=""/>)
  };

  return (<Card bordered={false}>
    <Divider style={{marginBottom: 32}}/>
    <DescriptionList title="Race Information" style={{marginBottom: 32}} size={size} col={col}>
      <Description term="Race name">{race.name}</Description>
      <Description term="Race Address @Block Explorer">{process.env.REACT_APP_BLOCK_EXPLORER_PREFIX}{race.id}</Description>
      <Description term="Betting start time">{new Date(race.bStartTime * 1000).toLocaleString()}</Description>
      <Description term="Race start time">{new Date(race.startTime * 1000).toLocaleString()}</Description>
      <Description term="Race Duration"><CountDownTimer static={timerStatic} duration={duration} startTime={startTime}/></Description>
      {renderCoins()}
    </DescriptionList>
  </Card>);
};