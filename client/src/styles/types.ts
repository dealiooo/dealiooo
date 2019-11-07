export enum ThemeColor {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export type ThemeColors = ThemeColor.LIGHT | ThemeColor.DARK;

export interface BaseColors {
  white: string;
  black: string;
  gold: string;
  purple: string;
  orange: string;
}

export interface StatusColors {
  success: string;
  warning: string;
  info: string;
  disabled: string;
  error: string;
}

export interface AppColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;

  secondary: string;
  secondaryLight: string;
  secondaryDark: string;

  text: string;
  textLight: string;
  textLighter: string;

  outline: string;
  outlineLight: string;
  outlineDark: string;

  background: string;

  backgroundDark: string;
  backgroundDarker: string;
  backgroundDarkest: string;

  backgroundLight: string;
  backgroundLighter: string;
  backgroundLightest: string;
}

export interface Palette extends BaseColors, StatusColors, AppColors {}
export interface Theme extends Palette {}
