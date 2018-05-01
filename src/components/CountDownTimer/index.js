import React, {PureComponent} from 'react';

export default class CountDownTimer extends PureComponent {
  constructor(props) {
    super(props);

    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    let startTime = props.startTime ? props.startTime : 0;

    let currentTime = Math.round(new Date().getTime() / 1000);
    let endTime = startTime + (props.duration ? props.duration : 0 );

    let remaining = (endTime - currentTime);
    if(remaining < 0){
      this.state = {time: {}, seconds: (props.duration ? props.duration : 0 )};
    }else{
      this.state = {time: {}, seconds: remaining};
    }
    this.timer = 0;
    this.disable = false;
  }

  state = {
    time: {},
    seconds: 0,
    disable:false
  };

  componentWillReceiveProps(nextProps) {
    this.resetTimer(nextProps);
  }

  componentWillUnmount(){
    this.disable = true;
    clearInterval(this.timer);
  }

  resetTimer(props) {

    if(this.timer !== 0){
      clearInterval(this.timer);
    }
    this.timer = 0;

    let startTime = props.startTime ? props.startTime : 0;

    let currentTime = Math.round(new Date().getTime() / 1000);
    let endTime = startTime + (props.duration ? props.duration : 0 );

    let remaining = (endTime - currentTime);
    if(remaining < 0){
      this.setState({time: {}, seconds: (props.duration ? props.duration : 0 )});
    }else{
      this.setState({time: {}, seconds: remaining});
    }

    this.disable = false;
    if(!this.props.static){

      if (this.state.seconds > 0){
        this.startTimer();
      }
    }
  }

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

    if(this.state.disable){
      return;
    }

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