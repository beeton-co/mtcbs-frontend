import React, {Component} from 'react';
import {Card} from 'antd';
import {CountDownTimer} from "../../CountDownTimer";
import DescriptionList from '../../../components/DescriptionList';

const {Description} = DescriptionList;


export const DetailRaceInformationView = (props) => {
  const {race, col, size} = props;
  return (<Card bordered={false}>
    <Divider style={{marginBottom: 32}}/>
    <DescriptionList title="Race Information" style={{marginBottom: 32}} size={size} col={col}>
      <Description term="Race name">{race.name}</Description>
      <Description term="Betting start time">{new Date(race.bStartTime * 1000).toLocaleString()}</Description>
      <Description term="Race start time">{new Date(race.startTime * 1000).toLocaleString()}</Description>
      <Description term="Race Duration"><CountDownTimer static={true} duration={race.duration} startTime={race.startTime}/></Description>
    </DescriptionList>
  </Card>);
};