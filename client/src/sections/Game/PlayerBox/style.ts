import styled from 'styled-components';

import { mixins, Color } from '../../../styles';

const FONT_SCALE_RATIO = 6;
export const scalefontSizes = (size: number) => size / FONT_SCALE_RATIO;

const STROKE_WIDTH_RATIO = 36;
export const scaleStrokeWidth = (size: number) => size / STROKE_WIDTH_RATIO;

export const borderColorFromPalette = ({ theme, color, colors }) => {
  if (color) {
    return theme.palette[color] || color;
  }

  if (colors && colors.length === 1) {
    return theme.palette[colors[0]] || colors[0];
  }

  if (colors && colors.length === 2) {
    const c1 = theme.palette[colors[0]] || colors[0];
    const c2 = theme.palette[colors[1]] || colors[1];
    return `${c1} ${c1} ${c2} ${c2}`;
  }

  return 'currentColor';
};

export type SizeProps = { width: number; height: number };
type CircleProps = { size: number };

export const Circle = styled.div<CircleProps>`
  ${mixins.flexRowCenter};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
`;

export type BorderCircleProps = CircleProps & ({ color: Color } | { color: Color[] }) & { strokeWidth?: number };

export const BorderCircle = styled(Circle)<BorderCircleProps>`
  ${mixins.flexColCenter};
  border-width: ${props => props.strokeWidth || scaleStrokeWidth(props.size)}px;
  border-style: solid;
  border-color: ${borderColorFromPalette};
`;
