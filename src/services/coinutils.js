import React from 'react';
import * as priceengine from '../actions/priceengine';

export const getCoinName = (id) => {
  for (let i = 0; i < priceengine.getAvailableCoins().length; i++) {
    if (priceengine.getAvailableCoins()[i].id === id) {
      return priceengine.getAvailableCoins()[i].name;
    }
  }
  return '';
};