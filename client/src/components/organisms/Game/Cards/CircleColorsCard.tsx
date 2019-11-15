import React from 'react';

import { scaleStrokeWidth, SizeProp, scaleFontSize } from './Core';
import styled from 'styled-components';

type CircleColorsCardProps = SizeProp & {
  name: string;
  colors: string[];
};

const CircleSvg = styled.svg.attrs(({ width, height, ...props }) => ({
  width,
  height,
  viewBox: `0 0 ${width} ${height}`,
  ...props,
}))`
  border-style: solid;
  border-color: transparent;
  border-width: ${({ borderWidth }) => `${borderWidth}px`};
  border-image: ${({ borderGradientColor }) => `linear-gradient(to bottom right, ${borderGradientColor})`};
  border-image-slice: 1;
`;

// TODO:
// currently there are a few problems with this component:
// (1) adding a fill color to the circle will break the sizing of the borders
// (2) size of the circle is not consistent with size of the Circle / Dual Color Circle even if sizes are equal
const CircleColorsCard = ({ width, height, name, colors }: CircleColorsCardProps) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = centerY / 2;
  const strokeWidth = scaleStrokeWidth(centerY);

  const calculateStrokeDashArray = (index: number) => {
    if (index === 0) return undefined;
    const firstDash = radius * (colors.length - index);
    const secondDash = radius * index;
    return `${firstDash}, ${secondDash}`;
  };

  const incrementer = 100 / (colors.length - 1);
  const gradientColor = colors
    .map((color, index) => {
      const part = `${color} ${incrementer * index}%`;
      return part;
    })
    .join(', ');

  return (
    <CircleSvg width={width} height={height} borderWidth={strokeWidth} borderGradientColor={gradientColor}>
      {colors.map((color, index) => {
        return (
          <circle
            key={color}
            cx={centerX}
            cy={centerY}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeOpacity={1}
            fill="transparent"
            strokeDasharray={calculateStrokeDashArray(index)}
          />
        );
      })}
      <text
        x="50%"
        y="50%"
        dy="0.3em"
        textAnchor="middle"
        fill="currentColor"
        style={{ fontSize: `${scaleFontSize(height / 2)}px` }}
      >
        {name}
      </text>
    </CircleSvg>
  );
};

export default CircleColorsCard;
