import { lighten, darken } from 'polished';

import colors from '../colors';
import { ThemeColors } from '.';

const lightThemeColors: ThemeColors = {
  primary: colors.red,
  primaryLight: lighten(0.2, colors.red),
  primaryDark: darken(0.1, colors.red),

  text: colors.black,
  textLight: lighten(0.1, colors.black),
  textLighter: lighten(0.2, colors.black),

  background: colors.grayLight,
  backgroundDark: darken(0.03, colors.grayLight),
  backgroundDarker: darken(0.05, colors.grayLight),
  backgroundDarkest: darken(0.08, colors.grayLight),
  backgroundLight: lighten(0.03, colors.grayLight),
  backgroundLighter: lighten(0.05, colors.grayLight),
  backgroundLightest: lighten(0.09, colors.grayLight),

  outline: colors.grayLighter,
  outlineLight: lighten(0.03, colors.grayLighter),
};

export default lightThemeColors;
