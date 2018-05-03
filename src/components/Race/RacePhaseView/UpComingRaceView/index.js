import React, {Component} from 'react';
import {Divider} from 'antd';
import * as utils from '../../../../actions/utils';
import {GenerateSVGGradient} from '../../../Fragments/SVGGradients';
import {RaceCarousel} from '../../RaceCarousel';
import {DetailRaceInformationView} from '../../../Fragments/DetailRaceInformationView';
import {EmptyRaceView} from '../../EmptyRaceView';


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
      if (utils.isNull(raceResult[0].created)) {
        this.props.getRacesByStatus('created', 0);
      } else {
        races = raceResult[0].created.hits;
      }
    }
    races = this.getFilterRaces(races);
    if (utils.nonNull(races) && (races.length > 0)) {
      //filter out races that have transitioned to betting phase.

      let race = {};
      const raceId = utils.isNull(this.state.raceDetailId) ? races[0].id : this.state.raceDetailId;
      for (let i = 0; i < races.length; i++) {
        if (races[i].id === raceId) {
          race = races[i];
          break;
        }
      }

      return (
              <div style={{marginTop: 50}}>
                <RaceCarousel phase='upcoming' races={races} eventHandler={this.eventHandler} completedCallback={() => {
                  this.setState(this.state)
                }}/>
                <Divider style={{marginBottom: 100}}/>
                <DetailRaceInformationView
                        race={race}
                        col={1}
                        size="small"
                        coins={race.coinIds}
                        enableCountDown={true}
                        duration={0} startTime={race.bStartTime}/>
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
    return (
            <EmptyRaceView type="info" message="Upcoming races" description="On upcoming races? We got you covered, already in the process of adding new races!"/>);
  }

  getFilterRaces(races) {
    if(utils.nonNull(races) && races.length > 0){

      function comparator(race) {
        return race.bStartTime > new Date().getTime() / 1000;
      }
      return races.filter(comparator);
    }
    return races;
  }
}