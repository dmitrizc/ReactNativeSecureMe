import { TYPES } from '../types';

const INITIAL_STATE = {
  eventsComingUp: [],
  isFetchingEventsComingUp: false,

  eventsPast: [],
  isFetchingEventsPast: false,

  eventDetails: null,
  isFetchingEventDetails: false,

  eventSchedules: [],
  isFetchingEventSchedules: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_EVENTS_COMING_UP_REQUEST:
      return {
        ...state,
        isFetchingEventsComingUp: true,
        eventsComingUp: [],
      };
    case TYPES.GET_EVENTS_COMING_UP_SUCCESS:
      return {
        ...state,
        isFetchingEventsComingUp: false,
        eventsComingUp: action.payload,
      };
    case TYPES.GET_EVENTS_COMING_UP_FAILURE:
      return {
        ...state,
        isFetchingEventsComingUp: false,
        eventsComingUp: [],
      };

    case TYPES.GET_EVENTS_PAST_REQUEST:
      return {
        ...state,
        isFetchingEventsPast: true,
        eventsPast: [],
      };
    case TYPES.GET_EVENTS_PAST_SUCCESS:
      return {
        ...state,
        isFetchingEventsPast: false,
        eventsPast: action.payload,
      };
    case TYPES.GET_EVENTS_PAST_FAILURE:
      return {
        ...state,
        isFetchingEventsPast: false,
        eventsPast: [],
      };

    case TYPES.GET_EVENT_DETAILS_REQUEST:
      return {
        ...state,
        isFetchingEventDetails: true,
        eventDetails: null,
      };
    case TYPES.GET_EVENT_DETAILS_SUCCESS:
      return {
        ...state,
        isFetchingEventDetails: false,
        eventDetails: action.payload,
      };
    case TYPES.GET_EVENT_DETAILS_FAILURE:
      return {
        ...state,
        isFetchingEventDetails: false,
        eventDetails: null,
      };

    case TYPES.GET_EVENT_SCHEDULES_REQUEST:
      return {
        ...state,
        isFetchingEventSchedules: true,
        eventSchedules: [],
      };
    case TYPES.GET_EVENT_SCHEDULES_SUCCESS:
      return {
        ...state,
        isFetchingEventSchedules: false,
        eventSchedules: action.payload,
      };
    case TYPES.GET_EVENT_SCHEDULES_FAILURE:
      return {
        ...state,
        isFetchingEventSchedules: false,
        eventSchedules: [],
      };
    default:
      return state;
  }
};
