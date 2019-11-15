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

export interface StatusAccentColors {
  successAccent: string;
  warningAccent: string;
  infoAccent: string;
  disabledAccent: string;
  errorAccent: string;
}

export type StatusType = 'success' | 'info' | 'disabled' | 'warning' | 'error';

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

export interface Palette extends BaseColors, StatusColors, StatusAccentColors, AppColors {}
export interface Theme extends Palette {}
