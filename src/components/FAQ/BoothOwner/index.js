import React, {PureComponent} from 'react';
import {Col, Row, Divider} from 'antd';

export default class BoothOwner extends PureComponent {
  render() {
    return (
            <div className="faq">
              <Row>
                <p className="faq-title">Become a booth owner</p>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 1</Divider>
                  <p className="faq-text">Click the <strong>Become a Booth Owner</strong> menu option.</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/becomeowner.png"}/>
                </Col>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 2</Divider>
                  <p className="faq-text">Fill in the required form fields and click Create.</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/booth_requirefields.png"}/>
                </Col>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 3</Divider>
                  <p className="faq-text">Confirm the transaction with MetaMask.</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/booth_metamasknotification.png"}/>
                </Col>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 4</Divider>
                  <p className="faq-text">In a few seconds your channel will be created.</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/booth_systemnotification.png"}/>
                </Col>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 5</Divider>
                  <p className="faq-text">To view your channel, navigate to the new Booth Management menu option.</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/menu_booth.png"}/>
                </Col>
              </Row>
            </div>
    );
  }
}