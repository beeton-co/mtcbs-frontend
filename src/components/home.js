import React, { Component } from 'react';

import BettingRaceView from './Race/RacePhaseView/BettingRaceView';

class Home extends Component {

    render() {
       return (<BettingRaceView {...this.props}/>);
    }
}

export default Home;
