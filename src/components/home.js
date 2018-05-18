import React, { Component } from 'react';

import BettingRaceView from './Race/RacePhaseView/BettingRaceView';

class Home extends Component {
    constructor(props){
        super(props);
    }

    render() {
       return (<BettingRaceView {...this.props}/>);
    }
}

export default Home;
