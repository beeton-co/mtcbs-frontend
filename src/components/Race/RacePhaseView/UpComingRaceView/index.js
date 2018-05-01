import React, {Component} from 'react';
import {Divider} from 'antd';
import * as utils from '../../../../actions/utils';
import {GenerateSVGGradient} from '../../../Fragments/SVGGradients';
import DescriptionList from '../../../../components/DescriptionList';
import {RaceCarousel} from '../../RaceCarousel';
import {DetailRaceInformationView} from '../../../Fragments/DetailRaceInformationView';
import {EmptyRaceView} from '../../EmptyRaceView';
const { Description } = DescriptionList;

export default class UpComingRaceView extends Component {

  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.props.getRacesByStatus('created', 0);
  }
  state = {
    raceDetailId: null
  };

  eventHandler(id) {
    this.setState({raceDetailId: id});
  }

  render() {
    let raceResult = this.props.races;
    let races = [];
    if (raceResult.length > 0) {
      if(utils.isNull(raceResult[0].created)){
        this.props.getRacesByStatus('created', 0);
      }else{
        races = raceResult[0].created.hits;
      }
    }
    if (utils.nonNull(races) && (races.length > 0)) {

      let race = undefined;

      if (races.length > 0) {
        const raceId = utils.isNull(this.state.raceDetailId) ? races[0].id : this.state.raceDetailId;
        for (let i = 0; i < races.length; i++) {
          if (races[i].id === raceId) {
            race = races[i];
            break;
          }
        }
      }
      return (
              <div style={{marginTop: 50}}>
                <RaceCarousel races={races} eventHandler={this.eventHandler}/>
                <Divider style={{marginBottom: 100}}/>
                <DetailRaceInformationView race={race} col={1} size="small" coins={race.coinIds} enableCountDown={true}/>
                <GenerateSVGGradient id="gradient-circle-progress-open"
                                     offset1="5%"
                                     stopColor1="#F60"
                                     offset2="95%"
                                     stopColor2="#FF6"/>

                <GenerateSVGGradient id="gradient-circle-progress-closed"
                                     offset1="5%"
                                     stopColor1="#4145F0"
                                     offset2="95%"
                                     stopColor2="#2AE4F6"/>
              </div>
      );

    }
    return (<EmptyRaceView type="info" message="Upcoming races" description="On upcoming races? We got you covered, already in the process of adding new races!"/>);
  }
}