import TYPES from '../types';

const INITIAL_STATE = {
  isPostingLogin: false,
  token: '',
  profile: null,
  isFetchingProfile: false,
  isPatchingProfile: false,
  isProfileEdited: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.LOGIN_REQUEST:
      return {
        ...state,
        isPostingLogin: true,
      };
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isPostingLogin: false,
        token: action.payload.token,
        profile: action.payload.profile,
        isProfileEdited: false,
      };
    case TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isPostingLogin: false,
        token: '',
        profile: null,
      };

    case TYPES.LOGOUT:
      return {
        ...state,
        token: '',
        profile: null,
        isProfileEdited: false,
      };

    case TYPES.GET_PROFILE_REQUEST:
      return {
        ...state,
        isFetchingProfile: true,
      };
    case TYPES.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isFetchingProfile: false,
        profile: action.payload,
        isProfileEdited: false,
      };
    case TYPES.GET_PROFILE_FAILURE:
      return {
        ...state,
        isFetchingProfile: false,
      };

    case TYPES.EDIT_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.payload.key]: action.payload.value,
        },
        isProfileEdited: true,
      };

    case TYPES.PATCH_PROFILE_REQUEST:
      return {
        ...state,
        isPatchingProfile: true,
      };
    case TYPES.PATCH_PROFILE_SUCCESS:
      return {
        ...state,
        isPatchingProfile: false,
        profile: action.payload,
        isProfileEdited: false,
      };
    case TYPES.PATCH_PROFILE_FAILURE:
      return {
        ...state,
        isPatchingProfile: false,
      };
    default:
      return state;
  }
};
