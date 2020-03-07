import light from './light';
import dark from './dark';

const themeColors = {
  light,
  dark,
};

export default themeColors;

export type ThemeColors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;

  text: string;
  textLight: string;
  textLighter: string;

  background: string;
  backgroundDark: string;
  backgroundDarker: string;
  backgroundDarkest: string;
  backgroundLight: string;
  backgroundLighter: string;
  backgroundLightest: string;

  outline: string;
  outlineLight: string;
};
