import { TYPES } from '../types';

export const toggleMenu = isMenuOpen => ({
  type: TYPES.TOGGLE_MENU,
  payload: isMenuOpen,
});
