import React, { Component } from 'react';
import { Card, Progress } from 'antd';
import * as pe from '../actions/priceengine';

class OwnerDashCard extends Component {
    constructor(props) {
        super(props);
        let startTime = this.props.bStartTime;
        let currentTime = Math.round(new Date().getTime() / 1000);
        let betting = true;
        let endTime = this.props.startTime;

        if (currentTime >= endTime){
            startTime = this.props.startTime;
            betting = false;
            endTime = startTime + this.props.duration;
        }

        let totalSeconds = (endTime - startTime);
        let currentSecondsPast = (currentTime - startTime);
        let currentSecondsRemaining = (endTime - currentTime);


        let currentPercent = 0;

        if(currentTime >= startTime && endTime >= currentTime){
            currentPercent  = currentSecondsPast/totalSeconds;
            this.state = { time: {}, seconds: currentSecondsRemaining, fraction: (1/totalSeconds), percent: currentPercent, active: 'active', showInfo: true, betting };
        }else if(currentTime >= endTime){
            this.state = { time: {}, seconds: 0, fraction: 1, percent: 1, active: 'success', showInfo: true, betting };
        }

        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }


    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        if (hours <= 9){
            hours = "0"+hours;
        }
        if (minutes <= 9){
            minutes = "0"+minutes;
        }
        if (seconds <= 9){
            seconds = "0"+seconds;
        }

        return {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });

        if (this.state.percent !== 1){
            this.startTimer();
        }
    }

    startTimer() {
        if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        let currentTime = Math.round(new Date().getTime() / 1000);

        if (currentTime === this.props.startTime){
            let endTime = this.props.startTime + this.props.duration;
            let currentSecondsRemaining = (endTime - currentTime);

            this.setState({
                seconds: currentSecondsRemaining,
                fraction: (1/this.props.duration),
                percent: 0,
                betting: false
            })
        }else {
            // Remove one second, set state so a re-render happens.
            let seconds = this.state.seconds - 1;
            let percent = this.state.percent + this.state.fraction;

            this.setState({
                time: this.secondsToTime(seconds),
                seconds: seconds,
                percent: percent
            });
        }

        let seconds = this.state.seconds;

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            this.setState({
                time: this.secondsToTime(0),
                seconds: 0,
                percent: 1,
                active: 'success',
                showInfo: true,
                betting: false
            });
        }
    }

    renderParticipatingCoins(){
        let coins = [];
        let coinArray = this.props.participatingCoins;

        for (let i = 0; i < coinArray.length; i++){
            coins.push(<img className="avatar dash-logo" key={`coin-${coinArray[i]}`} alt="dash-logo"
                            src={process.env.PUBLIC_URL + `/coin-svg/${pe.getCoinSymbol(coinArray[i]).toLowerCase()}.svg`} />)
        }

        return coins;
    }

    render() {
        return (
            <Card
                className="dash-card"
                // style={{ width: 160px }}
                cover={
                    <div>
                        <Progress
                            percent={roundTo((this.state.percent * 100), 1)}
                            type="circle"
                            format={() => {
                                if (this.state.time.h !== "00") {
                                    return `${this.state.time.h} : ${this.state.time.m}`
                                } else if (this.state.time.m !== "00") {
                                    return `${this.state.time.m} : ${this.state.time.s}`
                                } else {
                                    return `${this.state.time.s}`
                                }
                             }
                            }
                            showInfo={this.state.showInfo}
                            status={this.state.active}
                            className={`dash-progress ${this.state.betting? 'betting-open' : 'betting-closed'} ` }
                        />
                        <div className="participating-coins AvatarStack">
                            <div className="AvatarStack-body" aria-label="coin, coin, and coin">
                                {this.renderParticipatingCoins()}
                            </div>
                        </div>
                    </div>
                }
                // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                // actions={[`H: ${this.state.time.h}`, `M: ${this.state.time.m}`, `S: ${this.state.time.s}`]}

                actions={[
                    this.state.time.h,
                    this.state.time.m,
                    this.state.time.s
                ]}
            >
                {/*<Meta*/}
                {/*avatar={<Avatar src="http://introtocrypto.com/wp-content/uploads/2017/08/ether@2x.png" />}*/}
                {/*title="Etherium"*/}
                {/*/>*/}
                <div className="payout-card-flex">
                    <p>1 ETH</p><img alt="card-arr" className="card-arr" src={process.env.PUBLIC_URL + "/angle-double-right.svg"}/><p className="payout-card-value">30 ETH</p>
                </div>
            </Card>
        );
    }
}

function roundTo(n, digits) {
    if (digits === undefined) {
        digits = 0;
    }

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    var test =(Math.round(n) / multiplicator);
    return +(test.toFixed(digits));
}

export default OwnerDashCard;
