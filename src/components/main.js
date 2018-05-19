import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import CreateChannel from './bookie/CreateChannel';
import CreateRace from './bookie/CreateRace';
import RunningRaceView from './Race/RacePhaseView/RunningRaceView';
import CompletedRaceView from './Race/RacePhaseView/CompletedRaceView';
import BettingRaceView from './Race/RacePhaseView/BettingRaceView';
import UpComingRaceView from './Race/RacePhaseView/UpComingRaceView';
import VoidRaceView from './Race/RacePhaseView/VoidRaceView';
import BetsView from './Profile/BetsView';
import MyBetRacesView from './Profile/MyBetRacesView';
import ChannelOwnerRacesView from './Profile/ChannelOwnerRacesView';
import ClaimRewardView from './Profile/Rewards/ClaimRewardView';
import PayOutView from './Profile/Rewards/PayOutView';


import GetEther from './FAQ/GetEther';

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const prefetchedData = {};

const PropsRoute = ({ component, ...rest }) => {

  if (!prefetchedData.coins){
    rest.getCoins(0);
    prefetchedData.coins = true;
  }
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
};

const Main = (props) => (
        <main className="main-screen">
          <Switch>
            <PropsRoute exact path='/' component={Home} {...props} />
            <PropsRoute path='/createchannel' component={CreateChannel} {...props} />

            <PropsRoute path='/races/running' component={RunningRaceView} {...props} />
            <PropsRoute path='/races/void' component={VoidRaceView} {...props}  />
            <PropsRoute path='/races/upcoming' component={UpComingRaceView} {...props}  />
            <PropsRoute path='/races/betting' component={BettingRaceView} {...props}  />
            <PropsRoute path='/races/completed' component={CompletedRaceView} {...props}   />
            <PropsRoute path='/profile/races' component={MyBetRacesView} {...props}   />
            <PropsRoute path='/profile/bets' component={BetsView} {...props}   />
            <PropsRoute path='/profile/rewards' component={ClaimRewardView} {...props}   />
            <PropsRoute path='/profile/cmgmt/payout' component={PayOutView} {...props}   />
            <PropsRoute path='/profile/cmgmt/createrace' component={CreateRace} {...props}   />
            <PropsRoute path='/profile/cmgmt/races' component={ChannelOwnerRacesView} {...props}   />

            <PropsRoute path='/faq/getether' component={GetEther} {...props}   />
          </Switch>
        </main>
)

export default Main
