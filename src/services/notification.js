import {notification} from 'antd';
import * as utils from '../actions/utils';

export function info(description, title='', duration = 10, color="#00D4FF") {
  notification['info']({
    message: title,
    description: description,
    duration: duration,
    style:{
      backgroundColor: "#9a27ff",
      //backgroundColor: color,
      color: "#fff"
    }
  });
}

export function warn(description, title='', duration = 10, color="#00D4FF") {
  notification['warn']({
    message: title,
    description: description,
    duration: duration,
    style:{
      backgroundColor: "#9a27ff",
      //backgroundColor: color,
      color: "#fff"
    }
  });
}

export function success(description, title='', duration = 10, color="#00D4FF") {
  notification['success']({
    message: title,
    description: description,
    duration: duration,
    style:{
      backgroundColor: "#9a27ff",
      //backgroundColor: color,
      color: "#fff"
    }
  });
}

export function error(description, title='', duration = 10) {
  notification['error']({
    message: title,
    description: description,
    duration: duration,
    style:{
      backgroundColor: "#9a27ff",
      color: "#fff"
    }
  });
}
export function betSuccess(tx){
  success(`Congratulations! Your bet was successfully placed! Transaction:${tx.tx}`);
}
export function betError(err){
  const message = utils.nonNull(err.message) ? err.message : '';
  error(`Error occurred while placing bet! Please try again let. Remote error message: ${message}`);
}
export function channelCreationSucces(name, tx){
  success(`Congratulations! Your channel with name '${name}' was successfully created you can now create and manage races. Transaction:${tx.tx}`);
  //createSuccess('Channel', tx);
}

export function raceCreationSuccess(tx){
  createSuccess('Race', tx);
}

export function createSuccess(type, tx){
  success(`${type} successfully created! Transaction: ${tx.tx}`);
}

export function createError(type, err){
  const message = utils.nonNull(err.message) ? err.message : '';
  error(`Error creating ${type}! Please try again let. ${message}`);
}

export function createChannelError(err){
  createError('Channel', err);
}

export function createRaceError(err){
  createError('Race', err);
}
