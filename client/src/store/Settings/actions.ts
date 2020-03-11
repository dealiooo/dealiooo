import { createAction } from 'typesafe-actions';

import { ThemeColor } from '../../styles';

export const setThemeColor = createAction('SET_THEME_COLOR', (themeColor: ThemeColor) => themeColor)();
