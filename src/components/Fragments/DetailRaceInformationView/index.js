import React, {Component} from 'react';
import {Card, Divider} from 'antd';
import CountDownTimer from "../../CountDownTimer";
import DescriptionList from '../../../components/DescriptionList';
import * as utils from '../../../actions/utils';
const {Description} = DescriptionList;


export const DetailRaceInformationView = (props) => {
  const {race, col, size, coins} = props;

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
      <Description term="Betting start time">{new Date(race.bStartTime * 1000).toLocaleString()}</Description>
      <Description term="Race start time">{new Date(race.startTime * 1000).toLocaleString()}</Description>
      <Description term="Race Duration"><CountDownTimer static={true} duration={race.duration} startTime={race.startTime}/></Description>
      {renderCoins()}
    </DescriptionList>
  </Card>);
};