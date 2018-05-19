import React from 'react';
import {Field, reduxForm} from 'redux-form';

import 'react-widgets/dist/css/react-widgets.css';

import {
  required,
  defaultFormItemLayout,
  ControlButtons,
  SubDomainAvailableControl} from "./controls";
import {
  TextAreaField,
  TextField,
} from 'redux-form-antd'

let ChannelForm = (props) => {
  const {handleSubmit, loading, onAvailable, icon} = props;

  return (<form onSubmit={handleSubmit}>
    <Field {...defaultFormItemLayout} name="channelName" component={TextField} label="Booth Name" validate={[required]}/>
    <SubDomainAvailableControl loading={loading} handleClick={onAvailable} icon={icon}/>
    <Field {...defaultFormItemLayout} name="description" component={TextAreaField} rows={6} label="Booth Description" validate={[required]}/>
    <Field name="ctrlBtns" component={ControlButtons} />
  </form>);
};

export const CreateChannelValidationForm = reduxForm({
  form: 'createCreateForm', // a unique identifier for this form
})(ChannelForm);
