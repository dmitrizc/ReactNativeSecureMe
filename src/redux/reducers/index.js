import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import home from './home';
import events from './events';

export default combineReducers({
  app,
  auth,
  home,
  events,
});
