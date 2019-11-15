import styled from 'styled-components';

import { FlexRowCenter } from '../../../layouts';

const FONT_SCALE_RATIO = 6;
export const scaleFontSize = (size: number) => size / FONT_SCALE_RATIO;

const STROKE_WIDTH_RATIO = 36;
export const scaleStrokeWidth = (size: number) => size / STROKE_WIDTH_RATIO;

export type SizeProp = {
  width: number;
  height: number;
};

type CircleProps = {
  size: number;
};

export const Circle = styled(FlexRowCenter)<CircleProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
`;

type BorderCircleProps = CircleProps & {
  size: number;
  color?: string;
  strokeWidth?: number;
};

// A circle with one border color
export const BorderCircle = styled(Circle)<BorderCircleProps>`
  border-width: ${({ size, strokeWidth }) => strokeWidth || scaleStrokeWidth(size)}px;
  border-style: solid;
  border-color: ${({ color }) => color};
`;

type DualColorBorderCircleProps = Omit<BorderCircleProps, 'color'> & {
  color1: string;
  color2: string;
};

// A circle with two border colors
export const DualColorBorderCircle = styled(BorderCircle)<DualColorBorderCircleProps>`
  border-color: ${({ color1, color2 }) => {
    return `${color1} ${color1} ${color2} ${color2}`;
  }};

  transform: rotate(135deg);
`;

// Any content wrapped inside a DualColorBorderCircle must use this
export const DualColorBorderCircleBody = styled.div`
  transform: rotate(-135deg);
`;
