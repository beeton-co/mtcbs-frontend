import React from 'react';
import {Field, reduxForm} from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css';
import {
  required,
  defaultFormItemLayout,
  ControlButtons,
  SelectControl,
  DateTimePickerControl,
  MinBetControl
} from "./controls";
import DurationControl from './durationcontrol';
//import MinBetControl from './mincontrol';


import {
  TextField,
} from 'redux-form-antd'

import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import simpleNumberLocalizer from 'react-widgets-simple-number';

Moment.locale('en');

momentLocalizer();
simpleNumberLocalizer();
let PoolForm = props => {

  const {handleSubmit} = props;
  return (<div className="pocket-form">
    <form onSubmit={handleSubmit}>
      <Field {...defaultFormItemLayout} name="poolName" component={TextField} label="Pool Name" validate={[required]}/>
      <Field {...defaultFormItemLayout} name="coins" component={SelectControl} label="Select Coins" {...props}/>
      <Field {...defaultFormItemLayout} name="bettingStartTime" component={DateTimePickerControl} label="Betting Start Time" validate={[required]}/>
      <Field {...defaultFormItemLayout} name="raceStartTime" component={DateTimePickerControl} label="Race Start Time" validate={[required]}/>
      <Field {...defaultFormItemLayout} name="raceDuration" component={DurationControl} label="Race Duration"  {...props}/>
      <Field {...defaultFormItemLayout} name="minBet" component={MinBetControl} label="Minimum Bet"  {...props}/>
      <Field name="ctrlBtns" component={ControlButtons}/>
    </form>
  </div>);
};

export const CreatePoolForm = reduxForm({
  form: 'createPoolForm', // a unique identifier for this form
})(PoolForm);