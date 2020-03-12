import { rem, stripUnit } from 'polished';

const BASE_FONT_VALUE = 16;

// convert px to rem
export function remcalc(pxValue: string | number): ReturnType<typeof rem> {
  return rem(pxValue, BASE_FONT_VALUE);
}

// convert rem to px
export function pxcalc(remValue: string | number): number {
  const baseFontValue = window
    ? parseFloat(window.getComputedStyle(document.documentElement).fontSize as string)
    : BASE_FONT_VALUE;
  if (typeof remValue === 'string') {
    return stripUnit(remValue) * baseFontValue;
  }

  return remValue * baseFontValue;
}
