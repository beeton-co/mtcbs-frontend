import React, {PureComponent} from 'react';
import {Col, Row} from 'antd';

export default class GetEther extends PureComponent {
  render() {
    return (
            <div className="faq">
              <Row>
                <p className="faq-title">How to get test Ethers</p>
                  <Col sm={24} xs={24} className="faq-block">
                    <p className="faq-text">Open the Metamask extension and edit account to copy your Ethereum address to clipboard.</p>
                    <img alt="account address" src={process.env.PUBLIC_URL + "/faq/copyAddressClipboard.jpeg"}/>
                  </Col>
                  <Col sm={24} xs={24} className="faq-block">
                    <p className="faq-text">Create a Google Plus account and create a post with your Ethereum address.</p>
                    <img alt="account address" src={process.env.PUBLIC_URL + "/faq/googlepluspost.jpeg"}/>
                  </Col>
                  <Col sm={24} xs={24} className="faq-block">
                    <p className="faq-text">Open your Google Plus post and copy the url address to the post.</p>
                    <img alt="account address" src={process.env.PUBLIC_URL + "/faq/googlepluslink.png"}/>
                  </Col>
                  <Col sm={24} xs={24} className="faq-block">
                    <p className="faq-text">Go to https://faucet.rinkeby.io/ and paste the Google Plus link to post in the input field. Select the amount of ether you would like to receive.</p>
                  </Col>
              </Row>
            </div>
    );
  }
}