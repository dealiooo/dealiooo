import { createReducer } from 'typesafe-actions';

import * as actions from './actions';
import { ThemeColor } from '../../styles';

const initialState = {
  themeColor: localStorage.getItem('ThemeColor') || ThemeColor.DARK,
};

export const settingsReducer = createReducer(initialState).handleAction(actions.setThemeColor, (state, action) => {
  localStorage.setItem('ThemeColor', action.payload);

  return {
    ...state,
    themeColor: action.payload,
  };
});
