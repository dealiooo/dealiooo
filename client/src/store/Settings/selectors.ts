import { createSelector } from 'reselect';

import { RootState } from '../types';

const selectSettings = (state: RootState) => state.settings;

export const selectThemeColor = createSelector(
  selectSettings,
  settings => settings.themeColor,
);
