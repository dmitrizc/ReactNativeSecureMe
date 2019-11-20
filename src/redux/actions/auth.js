import { TYPES } from '../types';
import { API } from '../api';
import setApiAuthHeader from '../../utils/setApiAuthHeader';

import { storeToken, clearToken, storeProfile, clearProfile } from '../../utils/storage';
import { get as getDeep } from 'getobject';

export const login = credentials => (dispatch, getState) => {
  if (getState().rootReducer.auth.isPostingLogin) {
    return Promise.reject();
  }

  dispatch({ type: TYPES.LOGIN_REQUEST });

  return API.auth
    .login(credentials)
    .then(async data => {
      const payload = data;

      if (!payload.token) {
        return Promise.reject(payload);
      } else {
        try {
          await storeToken(payload.token);
          await storeProfile(payload.profile);
        } catch (e) {
          return Promise.reject(e);
        }

        setApiAuthHeader(payload.token);
        dispatch({ type: TYPES.LOGIN_SUCCESS, payload });

        return payload;
      }
    })
    .catch(err => {
      dispatch({ type: TYPES.LOGIN_FAILURE, payload: err });

      return Promise.reject(err);
    });
};

export const logout = () => async dispatch => {
  setApiAuthHeader();
  await clearToken();
  await clearProfile();

  dispatch({ type: TYPES.LOGOUT });
};

export const loginWithStoredToken = (token, profile) => dispatch => {
  setApiAuthHeader(token);
  dispatch({ type: TYPES.LOGIN_SUCCESS, payload: { token, profile } });
};

export const getProfile = () => (dispatch, getState) => {
  if (getState().rootReducer.auth.isFetchingProfile) {
    return Promise.reject();
  }

  const userId = getState().rootReducer.auth.profile.id;

  dispatch({
    type: TYPES.GET_PROFILE_REQUEST,
  });

  return API.auth
    .getProfile(userId)
    .then(async data => {
      let payload = data;

      await storeProfile(payload);

      dispatch({ type: TYPES.GET_PROFILE_SUCCESS, payload });

      return payload;
    })
    .catch(err => {
      if (getDeep(err, 'response.status') === 401) {
        logout()(dispatch);
      }

      dispatch({ type: TYPES.GET_PROFILE_FAILURE, payload: err });

      return Promise.reject(err);
    });
};

export const editProfile = (key, value) => (dispatch, getState) => {
  if (!getState().rootReducer.auth.profile) {
    return false;
  }

  dispatch({
    type: TYPES.EDIT_PROFILE,
    payload: { key, value },
  });

  return true;
};

export const patchProfile = profile => (dispatch, getState) => {
  if (getState().rootReducer.auth.isPatchingProfile) {
    return Promise.reject();
  }

  const userId = getState().rootReducer.auth.profile.id;

  dispatch({
    type: TYPES.PATCH_PROFILE_REQUEST,
  });

  return API.auth
    .patchProfile(userId, profile)
    .then(async data => {
      let payload = data;

      await storeProfile(payload);

      dispatch({ type: TYPES.PATCH_PROFILE_SUCCESS, payload });

      return payload;
    })
    .catch(err => {
      if (getDeep(err, 'response.status') === 401) {
        logout()(dispatch);
      }

      dispatch({ type: TYPES.PATCH_PROFILE_FAILURE, payload: err });

      return Promise.reject(err);
    });
};
