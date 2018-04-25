import React, { Component } from 'react';


class Home extends Component {
    constructor(props){
        super(props)

        let ownerCardArray = [];
        let createdRaceList = this.props.races;
        if(createdRaceList[0] !== undefined){

            // for(let i = 0; i < createdRaceList[0].created.hits.length; i++){
            //     ownerCardArray.push(
            //         <OwnerDashCard
            //             key={createdRaceList[0].created.hits[i].id}
            //             coinImg={createdRaceList[0].created.hits[i].coinIds[0]}
            //             participatingCoins={createdRaceList[0].created.hits[i].coinIds}
            //             bStartTime={createdRaceList[0].created.hits[i].bStartTime}
            //             startTime={createdRaceList[0].created.hits[i].startTime}
            //             duration={createdRaceList[0].created.hits[i].duration}
            //             {...this.props}
            //         />
            //     )
            // }
        }



        this.state = {
            ownerCardArray
        }
    }

    componentWillReceiveProps (nextProps) {
        //let ownerCardArray = [];
        let createdRaceList = nextProps.races;
        if(this.props.races !== createdRaceList){
            // console.log(createdRaceList[0].created.hits);
            // for(let i = 0; i < createdRaceList[0].created.hits.length; i++){
            //     ownerCardArray.push(
            //         <OwnerDashCard
            //             key={createdRaceList[0].created.hits[i].id}
            //             coinImg={createdRaceList[0].created.hits[i].coinIds[0]}
            //             participatingCoins={createdRaceList[0].created.hits[i].coinIds}
            //             bStartTime={createdRaceList[0].created.hits[i].bStartTime}
            //             startTime={createdRaceList[0].created.hits[i].startTime}
            //             duration={createdRaceList[0].created.hits[i].duration}
            //             {...this.props}
            //         />
            //     )
            // }
            // this.setState({ownerCardArray});
        }



    }

    shouldComponentUpdate(nextProps){
        return this.props.races !== nextProps.races;
    }

    render() {
        return (<div></div>);
        // return (
        //     <div className="card-container">
        //         {this.state.ownerCardArray}
        //         <OwnerDashCard
        //             key={'17'}
        //             coinImg={'4'}
        //             participatingCoins={['1', '2']}
        //             bStartTime={1522860500}
        //             startTime={1522860550}
        //             duration={70}
        //             {...this.props}
        //         />
        //         <svg height="0" width="0">
        //             <defs>
        //                 <linearGradient id="gradient-circle-progress-open">
        //                     <stop
        //                         offset="5%"
        //                         stopColor="#F60"
        //                     />
        //                     <stop
        //                         offset="95%"
        //                         stopColor="#FF6"
        //                     />
        //                 </linearGradient>
        //             </defs>
        //         </svg>
        //         <svg height="0" width="0">
        //             <defs>
        //                 <linearGradient id="gradient-circle-progress-closed">
        //                     <stop
        //                         offset="5%"
        //                         stopColor="#4145F0"
        //                     />
        //                     <stop
        //                         offset="95%"
        //                         stopColor="#2AE4F6"
        //                     />
        //                 </linearGradient>
        //             </defs>
        //         </svg>
        //     </div>
        // );
    }
}

//connects root reducer to props

// function mapStateToProps(state) {
//     return {
//         races: state.races,
//         channels:state.channels,
//         coins:state.coins,
//         coin:state.coin
//     }
// }

//connects redux actions to props
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         getCompletedRacesList: getCompletedRacesList,
//         getVoidRacesList: getVoidRacesList,
//         getBettingRacesList: getBettingRacesList,
//         getCreatedRacesList: getCreatedRacesList,
//         getRunningRacesList: getRunningRacesList,
//         getChannels: getChannels,
//         getCoins: getCoins,
//         getCoin: getCoin,
//         getCoinsForIds: getCoinsForIds
//     }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
