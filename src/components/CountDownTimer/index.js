import React, {Component} from 'react';

export default class CountDownTimer extends Component {
  constructor(props) {
    super(props);

    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    let startTime = this.props.startTime;
    let currentTime = Math.round(new Date().getTime() / 1000);
    let endTime = startTime + this.props.duration;

    let remaining = (endTime - currentTime);
    if(remaining < 0){
      this.state = {time: {}, seconds: this.props.duration};
    }else{
      this.state = {time: {}, seconds: remaining};
    }
    this.timer = 0;
  }

  state = {
    time: {},
    seconds: 0
  };

  secondsToTime(secs) {
    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(secs / (60 * 60 * 24));
    let hours = Math.floor((secs % (60 * 60 * 24)) / ( 60 * 60));
    let minutes = Math.floor((secs % (60 * 60)) / (60));
    let seconds = Math.floor(secs % (60));


    if (days <= 9) {
      days = "0" + days;
    }

    if (hours <= 9) {
      hours = "0" + hours;
    }
    if (minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds <= 9) {
      seconds = "0" + seconds;
    }

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {


    let currentTime = Math.round(new Date().getTime() / 1000);

    if (currentTime === this.props.startTime) {
      let endTime = this.props.startTime + this.props.duration;
      let remainder = (endTime - currentTime);

      this.setState({seconds: remainder});
    } else {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({time: this.secondsToTime(seconds), seconds: seconds});
    }

    let seconds = this.state.seconds;

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
      this.setState({time: this.secondsToTime(0), seconds: 0});
    }
  }

  componentDidMount() {

    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });

    if(!this.props.static){

      if (this.state.seconds > 0){
        this.startTimer();
      }
    }
  }

  render() {
    return (
            <p style={{textAlign: "center",fontSize:20, marginTop:0}}>{this.state.time.days}d : {this.state.time.hours}h : {this.state.time.minutes}m : {this.state.time.seconds}s</p>
    );
  }
}