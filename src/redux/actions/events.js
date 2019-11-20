import { TYPES } from '../types';
import { API } from '../api';
import { get as getDeep } from 'getobject';

import { logout } from './auth';

export const getEventsComingUp = () => (dispatch, getState) => {
  if (getState().rootReducer.events.isFetchingEventsComingUp) {
    return Promise.reject();
  }

  dispatch({
    type: TYPES.GET_EVENTS_COMING_UP_REQUEST,
  });

  return API.events
    .getEventsComingUp()
    .then(data => {
      const payload = Array.isArray(data) ? data : [];

      dispatch({ type: TYPES.GET_EVENTS_COMING_UP_SUCCESS, payload });

      return payload;
    })
    .catch(err => {
      if (getDeep(err, 'response.status') === 401) {
        logout()(dispatch);
      }

      dispatch({ type: TYPES.GET_EVENTS_COMING_UP_FAILURE, payload: err });

      return Promise.reject(err);
    });
};

export const getEventsPast = () => (dispatch, getState) => {
  if (getState().rootReducer.events.isFetchingEventsPast) {
    return Promise.reject();
  }

  dispatch({
    type: TYPES.GET_EVENTS_PAST_REQUEST,
  });

  return API.events
    .getEventsPast()
    .then(data => {
      const payload = Array.isArray(data) ? data : [];

      dispatch({ type: TYPES.GET_EVENTS_PAST_SUCCESS, payload });

      return payload;
    })
    .catch(err => {
      if (getDeep(err, 'response.status') === 401) {
        logout()(dispatch);
      }

      dispatch({ type: TYPES.GET_EVENTS_PAST_FAILURE, payload: err });

      return Promise.reject(err);
    });
};

export const getEventDetails = eventid => (dispatch, getState) => {
  if (getState().rootReducer.events.isFetchingEventDetails) {
    return Promise.reject();
  }

  dispatch({
    type: TYPES.GET_EVENT_DETAILS_REQUEST,
  });

  return API.events
    .getEventDetails(eventid)
    .then(data => {
      dispatch({ type: TYPES.GET_EVENT_DETAILS_SUCCESS, payload: data });

      return data;
    })
    .catch(err => {
      if (getDeep(err, 'response.status') === 401) {
        logout()(dispatch);
      }

      dispatch({ type: TYPES.GET_EVENT_DETAILS_FAILURE, payload: err });

      return Promise.reject(err);
    });
};

export const getEventSchedules = eventid => (dispatch, getState) => {
  if (getState().rootReducer.events.isFetchingEventSchedules) {
    return Promise.reject();
  }

  dispatch({
    type: TYPES.GET_EVENT_SCHEDULES_REQUEST,
  });

  return API.events
    .getEventSchedules(eventid)
    .then(data => {
      const payload = data.results || [];

      dispatch({ type: TYPES.GET_EVENT_SCHEDULES_SUCCESS, payload });

      return payload;
    })
    .catch(err => {
      if (getDeep(err, 'response.status') === 401) {
        logout()(dispatch);
      }

      dispatch({ type: TYPES.GET_EVENT_SCHEDULES_FAILURE, payload: err });

      return Promise.reject(err);
    });
};
