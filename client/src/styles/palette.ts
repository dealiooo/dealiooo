import { lighten, darken } from 'polished';

import { AppColors, BaseColors, StatusColors, ThemeColor } from './types';
import { CardColor } from '../types/dealiooo';

export const baseColors: BaseColors = {
  white: '#fff',
  black: '#000',
  gold: '#ffbf00',
  orange: 'orange',
  purple: 'mediumpurple',
};

export const statusColors: StatusColors = {
  success: '#71E055',
  info: '#17A8E5',
  warning: '#FFCF23',
  error: '#E44242',
  disabled: '#999',
};

const mainColors = {
  primary: '#da3d3d',
  secondary: '#407088',

  lightBackground: '#eaeaea',
  darkBackground: '#1a2631',

  lightOutline: '#d3d3d3',
  darkOutline: '#3d5a79',
};

export const appColorsFromThemeColor = (themeColor: ThemeColor): AppColors => {
  const isLightThemeColor = themeColor === ThemeColor.LIGHT;
  const textColor = isLightThemeColor ? baseColors.black : baseColors.white;
  const backgroundColor = isLightThemeColor ? mainColors.lightBackground : mainColors.darkBackground;
  const outlineColor = isLightThemeColor ? mainColors.lightOutline : mainColors.darkOutline;

  return {
    primary: mainColors.primary,
    primaryLight: lighten(0.2, mainColors.primary),
    primaryDark: darken(0.1, mainColors.primary),

    secondary: mainColors.secondary,
    secondaryLight: lighten(0.2, mainColors.secondary),
    secondaryDark: darken(0.1, mainColors.secondary),

    text: textColor,
    textLight: lighten(0.1, textColor),
    textLighter: lighten(0.2, textColor),

    outline: outlineColor,
    outlineDark: darken(0.1, outlineColor),
    outlineLight: lighten(0.1, outlineColor),

    background: backgroundColor,

    backgroundDark: darken(0.03, backgroundColor),
    backgroundDarker: darken(0.05, backgroundColor),
    backgroundDarkest: darken(0.08, backgroundColor),

    backgroundLight: lighten(0.03, backgroundColor),
    backgroundLighter: lighten(0.05, backgroundColor),
    backgroundLightest: lighten(0.09, backgroundColor),
  };
};

export const CardColorsMap: { [key in CardColor]: string } = {
  [CardColor.red]: '#f32407',
  [CardColor.green]: '#70c45c',
  [CardColor.yellow]: '#fffa7e',
  [CardColor.orange]: '#f87618',
  [CardColor.purple]: '#814bf3',
  [CardColor.brown]: '#603a40',
  [CardColor['light-blue']]: '#7cc7df',
  [CardColor['dark-blue']]: '#0085ff',
  [CardColor.railroad]: '#1a191d',
  [CardColor.utility]: '#c3d9b2',
};
