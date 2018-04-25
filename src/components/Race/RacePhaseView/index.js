import React, {Component} from 'react';
import RaceDetail from "../racedetail";
import RaceContainer from "../RaceContainer";
import {Divider} from 'antd';
export default class RacePhaseView extends Component {
  constructor(props) {
    super(props);
    this.props.getRacesByStatus(this.props.status, 0);
  }

  state = {
    races: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.races.length > 0 && nextProps.races[0][this.props.status]){
      this.state.races = nextProps.races[0][this.props.status].hits;
    }
  }

  render() {
    return (
            <div style={{ marginTop: 50 }} >
              <RaceContainer {...this.props} />
              {/*<RaceDetail></RaceDetail>*/}
            </div>
    );
  }
}