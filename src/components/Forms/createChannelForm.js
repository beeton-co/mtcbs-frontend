import React from 'react';
import {Field, reduxForm} from 'redux-form';

import 'react-widgets/dist/css/react-widgets.css';

import {
  required,
  defaultFormItemLayout,
  ControlButtons} from "./controls";
import {
  TextAreaField,
  TextField,
} from 'redux-form-antd'

let ChannelForm = (props) => {
  const {handleSubmit} = props;


  return (<form onSubmit={handleSubmit}>
    <Field {...defaultFormItemLayout} name="channelName" component={TextField} label="Channel Name" validate={[required]}/>
    <Field {...defaultFormItemLayout} name="description" component={TextAreaField} rows={6} label="Channel Description" validate={[required]}/>
    <Field name="ctrlBtns" component={ControlButtons} />
  </form>);
};

export const CreateChannelValidationForm = reduxForm({
  form: 'createCreateForm', // a unique identifier for this form
})(ChannelForm);
