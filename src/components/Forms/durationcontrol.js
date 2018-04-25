import React, {Component} from 'react'
import {NumberPicker} from 'react-widgets';
import {
  Col, Row,
} from 'antd';
import Moment from 'moment';

const HOUR = 60 * 60;
const DAY = 24 * HOUR;
const YEAR = Moment.duration({years: 1}).asDays() * DAY;

export default class DurationControl extends Component {
  state = {
    dayConfig: {defaultValue: 0, min: 0, max: 365, step: 1, culture: 'en'},
    yearConfig: {defaultValue: 0, min: 0, max: 10, step: 1, culture: 'en'},
    hoursConfig: {defaultValue: 1, min: 0, max: 24, step: 1, culture: 'en'},
    value: {hour: 1, day: 0, year: 0}
  };

  handleChangeEvent(value) {
    this.setState({value});
    const duration = YEAR * value.year + DAY * value.day + HOUR * value.hour;
    if (this.props.onDurationChange) {
      this.props.onDurationChange(duration);
    }
  }

  render() {
    const {label} = this.props;
    return (

            <Row>
              <Col sm={7} xs={24} className="ant-form-item-label">
                <label>{label}</label>
              </Col>
              <Col sm={15} md={12} xs={18}>
                <Row>
                  <Col sm={4} md={4} xs={18}>
                    <label>Year</label>
                    <NumberPicker {...this.state.yearConfig} onChange={value => this.handleChangeEvent({
                      hour: this.state.value.hour,
                      day: this.state.value.day,
                      year: value
                    })}/>
                  </Col>
                  <Col sm={4} md={4} xs={18}>
                    <label>Day</label>
                    <NumberPicker {...this.state.dayConfig} onChange={value => this.handleChangeEvent({
                      hour: this.state.value.day,
                      day: value,
                      year: this.state.value.year
                    })}/>
                  </Col>
                  <Col sm={4} md={4} xs={18}>
                    <label>Hours</label>
                    <NumberPicker  {...this.state.hoursConfig} onChange={value => this.handleChangeEvent({
                      hour: value,
                      day: this.state.value.day,
                      year: this.state.value.year
                    })}/>
                  </Col>
                </Row>
              </Col>
            </Row>

    );
  }
}
