import { lighten, darken } from 'polished';

import colors from '../colors';
import { ThemeColors } from '.';

const darkThemeColors: ThemeColors = {
  primary: colors.red,
  primaryLight: lighten(0.2, colors.red),
  primaryDark: darken(0.1, colors.red),

  text: colors.white,
  textLight: lighten(0.1, colors.white),
  textLighter: lighten(0.2, colors.white),

  background: colors.navy,
  backgroundDark: darken(0.03, colors.navy),
  backgroundDarker: darken(0.05, colors.navy),
  backgroundDarkest: darken(0.08, colors.navy),
  backgroundLight: lighten(0.03, colors.navy),
  backgroundLighter: lighten(0.05, colors.navy),
  backgroundLightest: lighten(0.09, colors.navy),

  outline: colors.blueDark,
  outlineLight: lighten(0.03, colors.blueDark),
};

export default darkThemeColors;
