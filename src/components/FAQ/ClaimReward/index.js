import React, {PureComponent} from 'react';
import {Col, Row} from 'antd';

export default class ClaimReward extends PureComponent {
  render() {
    return (
            <div className="faq">
              <Row>
                <p className="faq-title">How to claim rewards</p>
                  <Col sm={24} xs={24} className="faq-block">
                    <p className="faq-text">Click the <strong>Completed</strong> dropdown menu option under <strong>Races</strong>.</p>
                    <img alt="account address" src={process.env.PUBLIC_URL + "/faq/racedropdown.png"}/>
                  </Col>
                  <Col sm={24} xs={24} className="faq-block">
                    <p className="faq-text">Click on a race for the detail view and now click the Claim Reward button.</p>
                    <img alt="account address" src={process.env.PUBLIC_URL + "/faq/clickonclaim.png"}/>
                  </Col>
                  <Col sm={24} xs={24} className="faq-block">
                    <p className="faq-text">If you can claim the Metamask notification will open and from there you’ll be able to complete the transaction.</p>
                    <img alt="account address" src={process.env.PUBLIC_URL + "/faq/claimconfetti.png"}/>

                  </Col>
                  <Col sm={24} xs={24} className="faq-block">
                    <img alt="account address" src={process.env.PUBLIC_URL + "/faq/congratsmessage.png"}/>
                  </Col>
              </Row>
            </div>
    );
  }
}