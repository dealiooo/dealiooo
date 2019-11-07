import { rem as pxToRem, stripUnit } from 'polished';

const BASE_FONT_VALUE = 16;

// convert px to rem
export function rem(px: string | number): ReturnType<typeof pxToRem> {
  return pxToRem(px, BASE_FONT_VALUE);
}

// convert rem to px value
export function px(rem: string | number): number {
  if (typeof rem === 'string') {
    return stripUnit(rem) * BASE_FONT_VALUE;
  }

  return rem * BASE_FONT_VALUE;
}
