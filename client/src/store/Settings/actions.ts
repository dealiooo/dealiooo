import { createAction } from 'typesafe-actions';

import { ThemeColor } from '../../styles';

export const setThemeColor = createAction('SET_THEME_COLOR', action => {
  return (themeColor: ThemeColor) => action(themeColor);
});
