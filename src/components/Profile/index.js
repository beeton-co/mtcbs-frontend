import React, { PureComponent } from 'react';

import RaceDetail from "./racedetail"

export default class Race extends PureComponent{
  constructor(props) {
    super(props);
  }
  render(){
    return(
            <RaceDetail></RaceDetail>
    );
  }
}