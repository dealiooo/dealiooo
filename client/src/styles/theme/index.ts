import typography from './typography';
import colors from './colors';
import themeColors, { ThemeColors } from './themeColors';

export enum ThemeColor {
  light = 'light',
  dark = 'dark',
}

type Typography = typeof typography;

export type Palette = typeof colors & ThemeColors;
export type Color = keyof Palette | string;
export type Theme = { palette: Palette } & Typography;

type ThemeOptions = {
  themeColor: keyof ThemeColor;
};

export const createTheme = (options: ThemeOptions): Theme => ({
  palette: { ...colors, ...themeColors[options.themeColor] },
  ...typography,
});
