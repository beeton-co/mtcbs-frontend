import React, {PureComponent} from 'react';
import moment from 'moment';
import styles from './racedetail.less';
import {Card, Row, Col, Divider} from 'antd';
import DescriptionList from '../DescriptionList';
const { Description } = DescriptionList;
const { Meta } = Card;

export default class RaceDetail extends PureComponent {


  render() {
    //const {list: {list}, loading} = this.props;

    const Info = ({title, bordered}) => (
            <div className={styles.headerInfo}>
              <span>{title}</span>
              {bordered && <em/>}
            </div>
    );


    const ListContent = ({data: {owner, createdAt, percent, status}}) => (
            <div className={styles.listContent}>
              <div className={styles.listContentItem}>
                <span>Owner</span>
              </div>
              <div className={styles.listContentItem}>
                <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
              </div>
              <div className={styles.listContentItem}>
                {/*<Progress percent={percent} status={status} strokeWidth={6} style={{width: 180}}/>*/}
              </div>
            </div>
    );

    return (<div className={styles.standardList}>
      <Card bordered={false}>
        <DescriptionList size="large" title="Pool Name" style={{ marginBottom: 32 }}>
          <Description term="Minimum Bet">0.1 Ether</Description>
          <Description term="Start time">1000000000</Description>
          <Description term="Duration">1 hours</Description>
          <Description term="Countdown">12:12:45</Description>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
      </Card>
      <Card bordered={false}>
        <Row>
          <Col sm={3} xs={10}>
            <Info title="" bordered/>
          </Col>
          <Col sm={3} xs={10}>
            <Info title="Name" bordered/>
          </Col>
          <Col sm={3} xs={10}>
            <Info title="# of Bets" bordered/>
          </Col>
          <Col sm={3} xs={10}>
            <Info title="Start price" bordered/>
          </Col>
          <Col sm={3} xs={10}>
            <Info title="Change (%)"/>
          </Col>
        </Row>
      </Card>
      <Card className={styles.listCard} bordered={false} style={{marginTop: 24}} bodyStyle={{padding: '0 32px 40px 32px'}}>

      </Card>
    </div>);
  }
}