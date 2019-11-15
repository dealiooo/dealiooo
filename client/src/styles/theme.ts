import { ThemeContext } from 'styled-components';
import { useContext } from 'react';

import * as palette from './palette';
import { ThemeColor, Theme } from './types';

/**
 * Helper to get theme from the theme color
 * @param themeColor
 */
export const fromThemeColor = (themeColor: ThemeColor): Theme => ({
  ...palette.baseColors,
  ...palette.statusColors,
  ...palette.statusColorsAccentFromThemeColor(themeColor),
  ...palette.appColorsFromThemeColor(themeColor),
});

export const useTheme = () => useContext(ThemeContext);
