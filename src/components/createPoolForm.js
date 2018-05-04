import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Multiselect, DateTimePicker} from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import Checkbox from './checkbox';
import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('en');

momentLocalizer();

const renderMultiselect = ({input, data, valueField, textField}) =>
        <Multiselect {...input}
                     onBlur={() => input.onBlur()}
                     value={input.value || []} // requires value to be an array
                     data={data}
                     valueField={'value'}
                     textField={'label'}
        />

const renderDateTimePicker = ({input: {onChange, value}, showTime}) =>
        <DateTimePicker
                onChange={onChange}
                format="DD MMM YYYY"
                time={showTime}
                value={!value ? null : new Date(value)}
        />

const coins = [
  {value: '1', label: 'Ethereum'},
  {value: '2', label: 'Litecoin'},
  {value: '3', label: 'Bitcoin'},
  {value: '4', label: 'Ripple'},
  {value: '5', label: 'Dogecoin'},
  {value: '6', label: 'Bitcoin Cash'}
]

let CreatePoolForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
   function handleExclusive(state) {

   }
  return (

          <form onSubmit={handleSubmit}>
            <div>
              <label>Pool Name</label>
              <div>
                <Field
                        name="poolName"
                        component="input"
                        type="text"
                        placeholder="Pool Name"
                        className="ant-input"
                />
              </div>
            </div>
            <div>
              <label>Select Coins</label>
              <div>
                <Field
                        name="coins"
                        component={renderMultiselect}
                        data={coins}
                />
              </div>
            </div>
            <div>
              <label>Betting Start Time</label>
              <Field
                      name="bettingStartTime"
                      showTime={true}
                      component={renderDateTimePicker}
              />
            </div>
            <div>
              <label>Race Start Time</label>
              <Field
                      name="raceStartTime"
                      showTime={true}
                      component={renderDateTimePicker}
              />
            </div>
            <div>
              <label>Race Duration (End Time)</label>
              <Field
                      name="end"
                      showTime={true}
                      component={renderDateTimePicker}
              />
            </div>

            <Checkbox handleCheckboxChange={handleExclusive} label="Exclusive" key="Exclusive" name="exclusive" id="exclusive"/>
            <div>
              <button type="submit" disabled={pristine || submitting}>Submit</button>
              <button type="button" disabled={pristine || submitting} onClick={reset}>
                Clear Values
              </button>
            </div>
          </form>
  )
};

export default reduxForm({
  form: 'createPoolForm', // a unique identifier for this form
})(CreatePoolForm);
