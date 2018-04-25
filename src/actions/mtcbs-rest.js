import {
  GET_COMPLETED_RACES,
  GET_VOID_RACES,
  GET_BETTING_RACES,
  GET_CREATED_RACES,
  GET_RUNNING_RACES,
  GET_ALL_CHANNEL,
  GET_CHANNEL_FOR_ADDRESS,
  GET_RACES_BY_STATUS
} from './types';

import API from '../api';

export const getRacesByStatus = (status, offset) => {
  return getRace(status, `races/byStatus/${status}/${offset}`, getRacesByStatusAsync);
};

export const getCompletedRacesList = (channelId, offset) => {
  return getRace('completed', `races/completed/${channelId}/${offset}`, getCompletedRacesListAsync);
};

export const getVoidRacesList = (channelId, offset) => {
  return getRace('void', `races/void/${channelId}/${offset}`, getVoidRacesListAsync);
};

export const getBettingRacesList = (channelId, offset) => {
  return getRace('betting', `races/betting/${channelId}/${offset}`, getBettingRacesListAsync);
};

export const getCreatedRacesList = (channelId, offset) => {
  return getRace('created', `races/created/${channelId}/${offset}`, getCreatedRacesListAsync);
};

export const getRunningRacesList = (channelId, offset) => {
  return getRace('running', `races/running/${channelId}/${offset}`, getRunningRacesListAsync);
};

export const getChannels = (offset) => {
  return dispatch => {
    API.get(`channels/all/${offset}`)
            .then(response => {
              dispatch(getChannelsAsync(response.data));
            });
  };
};

export const getChannelForOwner = (address) => {
  return dispatch => {
    API.get(`channels/owner/${address}`)
            .then(response => {
              let bookie = {};
              bookie["isBookie"] = response.data.success;
              bookie["channel"] = response.data.entity;
              dispatch(getChannelForAddressAsync(bookie));
            });
  };
};

export const getRacesByChannel = (channelId) => {
  return dispatch => {
    API.get(`races/byChannel/${channelId}`)
            .then(response => {
              dispatch(getRacesByChannelAsync(response.data));
            });
  };
};

function getVoidRacesListAsync(races) {
  return async(GET_VOID_RACES, races);
}

function getRunningRacesListAsync(races) {
  return async(GET_RUNNING_RACES, races);
}

function getCreatedRacesListAsync(races) {
  return async(GET_CREATED_RACES, races);
}

function getBettingRacesListAsync(races) {
  return async(GET_BETTING_RACES, races);
}

function getCompletedRacesListAsync(races) {
  return async(GET_COMPLETED_RACES, races);
}

function getRacesByStatusAsync(races) {
  return async(GET_RACES_BY_STATUS, races);
}

function getChannelsAsync(races) {
  return async(GET_ALL_CHANNEL, races);
}

function getChannelForAddressAsync(channel) {
  return async(GET_CHANNEL_FOR_ADDRESS, channel);
}

function getRacesByChannelAsync(channel) {
  return async(GET_CHANNEL_FOR_ADDRESS, channel);
}

function getRace(status, uri, asyncFunc) {
  return dispatch => {
    API.get(uri)
            .then(response => {
              let object = {};
              object[status] = response.data;
              dispatch(asyncFunc(object));
            });
  };
}

function async(type, payload) {
  return {
    type: type,
    payload: payload
  };
}