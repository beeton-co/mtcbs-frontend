import React, {PureComponent} from 'react';
import * as utils from "../../../actions/utils";
import {Redirect} from 'react-router-dom';
import RacesView from '../RaceView';


export default class MyBetRacesView extends PureComponent {
  constructor(props) {
    super(props);
    if (utils.nonNull(this.props.econtract.account) && utils.nonNull(this.props.econtract.account.default)) {
      //this.props.getUserBets(this.props.econtract.account.default);
      // ajax request after empty completing

      setTimeout(() => {

        this.setState({
          loading: false,
          races: {
            running: [{
              id: "0x827398542648127643891273491827349182",
              name: 'Top 4',
              startTime: 1524592995,
              bStartTime: 1524502995,
              duration: 3600,
              minNumOfBets: 3,
              coinIds:[1,2,3,4,5]
            },{
              id: "0x8273985426481276438912734918273erer82",
              name: 'Top 4',
              startTime: 1524592995,
              bStartTime: 1524502995,
              duration: 3600,
              minNumOfBets: 3,
              coinIds:[1,2,3,4,5]
            }],
            completed: [{
              id: "0x82739854264812764389256473491827349182",
              name: 'Top 4',
              startTime: 1524592995,
              bStartTime: 1524502995,
              duration: 3600,
              minNumOfBets: 3,
              coinIds:[1,2,3,4,5]
            },{
              id: "0x8273985426481276438918904918273erer82",
              name: 'Top 4',
              startTime: 1524592995,
              bStartTime: 1524502995,
              duration: 3600,
              minNumOfBets: 3,
              coinIds:[1,2,3,4,5]
            }],
            'void': [{
              id: "0x8273985426481277890890273491827349182",
              name: 'Top 4',
              startTime: 1524592995,
              bStartTime: 1524502995,
              duration: 3600,
              minNumOfBets: 3,
              coinIds:[1,2,3,4,5]
            },{
              id: "0x82739854264812764323412342734918273erer82",
              name: 'Top 4',
              startTime: 1524592995,
              bStartTime: 1524502995,
              duration: 3600,
              minNumOfBets: 3,
              coinIds:[1,2,3,4,5]
            }],
            betting: [{
              id: "304-ujpfeklwf",
              name: 'Top 4',
              startTime: 1524592995,
              bStartTime: 1524502995,
              duration: 3600,
              minNumOfBets: 3,
              coinIds:[1,2,3,4,5]
            },{
              id: "na,sd,fkjoiw8rue",
              name: 'Top 4',
              startTime: 1524592995,
              bStartTime: 1524502995,
              duration: 3600,
              minNumOfBets: 3,
              coinIds:[1,2,3,4,5]
            }]
          }
        });
      }, 1000);
    }
  }

  state = {
    races: undefined,
    loading: true,
  };

  componentWillReceiveProps(nextProps) {
    const {profile} = nextProps;
    if (utils.nonNull(profile)) {
      if (utils.nonNull(profile.races['running']) ||
              utils.nonNull(profile.races['completed']) ||
              utils.nonNull(profile.races['betting']) ||
              utils.nonNull(profile.races['void'])) {
        const {races} = profile;
        this.setState({races, loading: false});
      } else {
        this.setState({loading: false});
      }
    }

  }

  render() {
    const {econtract} = this.props;

    if (utils.isNull(econtract.user) || utils.isNull(econtract.account) || utils.isNull(econtract.account.default)) {
      return <Redirect to='/home' {...this.props} />;
    }

    return (<RacesView items={this.state.races} channelOwner={false} title="Races I have placed bets..."/>);
  }
}