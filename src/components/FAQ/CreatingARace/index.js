import React, {PureComponent} from 'react';
import {Col, Row, Divider} from 'antd';

export default class CreatingARace extends PureComponent {
  render() {
    return (
            <div className="faq">
              <Row>
                <p className="faq-title">How to create a race</p>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 1</Divider>
                  <p className="faq-text">Click the Create Race dropdown menu option under Booth Management.</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/booth_createrace_menu.png"}/>
                </Col>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 2</Divider>
                  <p className="faq-text">Fill in the required form fields.</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/booth_race_fields.png"}/>
                </Col>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 3</Divider>
                  <p className="faq-text">Click Create.</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/fields_racecreation.png"}/>
                </Col>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 4</Divider>
                  <p className="faq-text">Confirm the transaction with MetaMask.</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/race_creation_metamask.png"}/>
                </Col>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 5</Divider>
                  <p className="faq-text">Wait a few seconds…</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/race_wait_for_a_few.png"}/>
                </Col>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 6</Divider>
                  <p className="faq-text">And…</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/creation_successful.png"}/>
                </Col>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 7</Divider>
                  <p className="faq-text">To view your newly created race, navigate to the Up Coming dropdown menu option underneath Races.</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/race_view_upcoming.png"}/>
                </Col>
                <Col sm={24} xs={24} className="faq-block">
                  <Divider orientation="left" className="faq-divider">Step 8</Divider>
                  <p className="faq-text">Congratulations, you’ve created a race! You can now promote your race and let users place bets</p>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/upcoming_races.png"}/>
                  <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/race_sample.png"}/>
                </Col>
              </Row>
            </div>
    );
  }
}