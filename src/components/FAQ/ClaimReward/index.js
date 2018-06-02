import React, {PureComponent} from 'react';
import {Col, Row, Divider} from 'antd';

export default class ClaimReward extends PureComponent {
  render() {
    return (
            <div className="faq">
              <Row>
                <p className="faq-title">How to claim rewards</p>
                  <Col sm={24} xs={24} className="faq-block">
                    <Divider orientation="left" className="faq-divider">Step 1</Divider>
                    <p className="faq-text">Click the <strong>Completed</strong> dropdown menu option under <strong>Races</strong>.</p>
                    <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/racedropdown.png"}/>
                  </Col>
                  <Col sm={24} xs={24} className="faq-block">
                    <Divider orientation="left" className="faq-divider">Step 2</Divider>
                    <p className="faq-text">Click on a race for the detail view and now click the Claim Reward button.</p>
                    <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/clickonclaim.png"}/>
                  </Col>
                  <Col sm={24} xs={24} className="faq-block">
                    <Divider orientation="left" className="faq-divider">Step 3</Divider>
                    <p className="faq-text">If you can claim the Metamask notification will open and from there you’ll be able to complete the transaction.</p>
                    <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/claimconfetti.png"}/>
                  </Col>
                  <Col sm={24} xs={24} className="faq-block">
                    <Divider orientation="left" className="faq-divider">Step 4</Divider>
                    <img className="faq-image" alt="account address" src={process.env.PUBLIC_URL + "/faq/congratsmessage.png"}/>
                  </Col>
              </Row>
            </div>
    );
  }
}