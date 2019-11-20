import { TYPES } from '../types';

const INITIAL_STATE = {
  isMenuOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: action.payload == null ? !state.isMenuOpen : action.payload,
      };
    default:
      return state;
  }
};
