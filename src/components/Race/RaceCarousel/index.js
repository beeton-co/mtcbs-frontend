import React, {Component} from 'react';
import DashCard from "../../DashCard";
import {Carousel, Row, Col} from 'antd';
import * as priceengine from '../../../actions/priceengine';
import * as utils from '../../../actions/utils';


export const RaceCarousel = (props) => {
  const {races, eventHandler} = props;

  const leadingCoin = (race) =>{
    if (priceengine.hasPrice(race.id)) {
      const prices = priceengine.getPriceInfo(race.id);
      return prices.coins[0].symbol;
    } else {
      let name = '';
      for (let i = 0; i < priceengine.getAvailableCoins().length; i++) {
        if (priceengine.getAvailableCoins()[i].id === race.coinIds[0]) {
          name = priceengine.getAvailableCoins()[i].name;
          break;
        }
      }
      return name.length > 4 ? name.substring(0, 4) : name;
    }
  };

  return (
          <Row>
            <Col sm={1}>
            </Col>
            <Col sm={19}>
              <Carousel {...utils.CarouselDefaultSettings}>
                {races.map(r => <div className="dash-card" key={utils.id()}>
                  <DashCard key={r.id}
                            raceId={r.id}
                            leadingCoin={leadingCoin(r)}
                            cardClickEventHandler={eventHandler}
                            coinImg={r.coinIds[0]}
                            participatingCoins={r.coinIds}
                            bStartTime={r.bStartTime}
                            startTime={r.startTime}
                            duration={r.duration} {...this.props} /></div>)}
              </Carousel></Col>
            <Col sm={1}>
            </Col>
          </Row>
  );
};