import { TYPES } from '../types';

const INITIAL_STATE = {
  eventsLive: [],
  isFetchingEventLive: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_HOME_EVENT_LIVE_REQUEST:
      return {
        ...state,
        isFetchingEventLive: true,
      };
    case TYPES.GET_HOME_EVENT_LIVE_SUCCESS:
      return {
        ...state,
        isFetchingEventLive: false,
        eventsLive: action.payload,
      };
    case TYPES.GET_HOME_EVENT_LIVE_FAILURE:
      return {
        ...state,
        isFetchingEventLive: false,
        eventsLive: [],
      };
    // Initial state
    default:
      return state;
  }
};
