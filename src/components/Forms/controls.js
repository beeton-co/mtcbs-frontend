import React from 'react';

import {
  Form, Button, Col, Row,
} from 'antd';
import CoinSelect from "./coinselect";
import {DateTimePicker, NumberPicker} from 'react-widgets';
import {
  TextField,
} from 'redux-form-antd'
import {Field} from 'redux-form';

export const FormItem = Form.Item;
export const required = value => value ? undefined : 'Required';
export const defaultFormItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 7},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12},
    md: {span: 10},
  },
};

export const ControlButtons = (props) => {
  const {pristine, submitting} = props;
  return (<FormItem style={{marginTop: 32}}>
    <Row>
      <Col sm={7} xs={24}>
      </Col>
      <Col sm={12} md={10} xs={24}>
        <Button type="primary" htmlType="submit" loading={submitting} disabled={pristine || submitting}>
          Create
        </Button>
        <Button style={{marginLeft: 8}} disabled={pristine || submitting}>Cancel</Button>
      </Col>
    </Row>
  </FormItem>);
};

export const SelectControl = (props) => {
  return (<FormItem style={{marginTop: 32}}>
    <Row>
      <Col sm={7} xs={24}>
      </Col>
      <Col sm={12} md={10} xs={24}>
        <CoinSelect {...props}/>
      </Col>
    </Row>
  </FormItem>);
};

export const DateTimePickerControl = (props) => {
  const {input: {onChange, value}, label} = props;
  return (
          <FormItem style={{marginTop: 32}}>
            <Row>
              <Col sm={7} xs={24} className="ant-form-item-label">
                <label>{label}</label>
              </Col>
              <Col sm={8} md={6} xs={18}>
                <DateTimePicker onChange={onChange} format="dddd, MMMM Do YYYY, h:mm:ss a" time={true} value={!value ? null : new Date(value)}/>
              </Col>
            </Row>
          </FormItem>);
};

export const MinBetControl = (props) => {
  const {input: {onChange}, label} = props;
  const config = {defaultValue: 0.1, min: 0.1, max: 100, step: 0.1, culture: 'en', format: "0.0"};
  return (
          <FormItem style={{marginTop: 32}}>
            <Row>
              <Col sm={7} xs={24} className="ant-form-item-label">
                <label>{label}</label>
              </Col>
              <Col sm={8} md={6} xs={18}>
                <NumberPicker onChange={onChange} format={config.format.value} {...config} />
              </Col>
            </Row>
          </FormItem>);
};

export const MinNumberOfBetsControl = (props) => {
  const {input: {onChange}, label} = props;
  const config = {defaultValue: 3, min: 3, step: 1, culture: 'en', format: "0"};
  return (
          <FormItem style={{marginTop: 32}}>
            <Row>
              <Col sm={7} xs={24} className="ant-form-item-label">
                <label>{label}</label>
              </Col>
              <Col sm={8} md={6} xs={18}>
                <NumberPicker onChange={onChange} format={config.format.value} {...config} />
              </Col>
            </Row>
          </FormItem>);
};

export const SubDomainAvailableControl = (props) => {
  const {loading, icon, handleClick} = props;
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 7},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 12},
      md: {span: 23},
    },
  };
  let subdomainValue = '';
  let self = this;

  //const OnChange = (event, newValue, previousValue, name) => {
  const OnChange = (event, newValue) => {
    self.subdomainValue = newValue;
  };

  const handleAvailability = () => {
    if (self.subdomainValue !== undefined && self.subdomainValue !== '') {
      handleClick(self.subdomainValue);
    }
  };

  const icon_ = icon === 'danger' ? '' : icon;
  const type = icon === 'danger' ? icon : 'primary';
  const text = icon === 'danger' ? 'Unavailable' : 'Check availability';

  return (
          <FormItem style={{marginTop: 32}}>
            <Row>
              <Col sm={7} xs={24} className="ant-form-item-label">
                <label>Subdomain Name</label>
              </Col>
              <Col sm={16} md={6} xs={18}>
                <Field {...formItemLayout} name="subdomain" component={TextField} validate={[required]} onChange={OnChange}/>
              </Col>
              <Col sm={8} md={6} xs={18}>
                <Button type={type} loading={loading} onClick={handleAvailability} icon={icon_} ghost>
                  {text}
                </Button>
              </Col>
            </Row>
          </FormItem>);
};