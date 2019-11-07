import { createReducer } from 'typesafe-actions';

import * as actions from './actions';
import { ThemeColor } from '../../styles';

const initialState = {
  themeColor: ThemeColor.DARK,
};

export const settingsReducer = createReducer(initialState).handleAction(actions.setThemeColor, (state, action) => ({
  ...state,
  themeColor: action.payload,
}));
