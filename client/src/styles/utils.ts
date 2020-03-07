import { rem, stripUnit } from 'polished';

const BASE_FONT_VALUE = 16;

// convert px to rem
export function remcalc(pxValue: string | number): ReturnType<typeof rem> {
  return rem(pxValue, BASE_FONT_VALUE);
}

// convert rem to px
export function pxcalc(remValue: string | number): number {
  const baseFontValue = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
  if (typeof remValue === 'string') {
    return stripUnit(remValue) * baseFontValue;
  }

  return remValue * baseFontValue;
}
