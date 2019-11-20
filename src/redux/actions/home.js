import { TYPES } from '../types';
import { API } from '../api';
import { get as getDeep } from 'getobject';
import { logout } from './auth';

export const getHomeEventLive = () => (dispatch, getState) => {
  if (getState().rootReducer.home.isFetchingEventLive) {
    return Promise.reject();
  }

  dispatch({
    type: TYPES.GET_HOME_EVENT_LIVE_REQUEST,
  });

  return API.home
    .getHomeEventLive()
    .then(data => {
      let payload = [];

      if (Array.isArray(data) && data.length) {
        payload = data;
      }

      dispatch({ type: TYPES.GET_HOME_EVENT_LIVE_SUCCESS, payload });

      return payload;
    })
    .catch(err => {
      if (getDeep(err, 'response.status') === 401) {
        logout()(dispatch);
      }

      dispatch({ type: TYPES.GET_HOME_EVENT_LIVE_FAILURE, payload: err });

      return Promise.reject(err);
    });
};
