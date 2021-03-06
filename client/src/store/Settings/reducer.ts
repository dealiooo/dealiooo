import { createReducer } from 'typesafe-actions';

import * as actions from './actions';
import { ThemeColor } from '../../styles';

const initialState = {
  themeColor: (localStorage.getItem('ThemeColor') as ThemeColor) || ThemeColor.dark,
};

export const settingsReducer = createReducer(initialState).handleAction(actions.setThemeColor, (state, action) => {
  localStorage.setItem('ThemeColor', action.payload);

  return {
    ...state,
    themeColor: action.payload,
  };
});
