import React from 'react';
import styled from 'styled-components';

import { scaleStrokeWidth, SizeProps, scalefontSizes } from '../../../style';
import { useTheme } from '../../../../../../utils';
import { Color } from '../../../../../../styles';

type CircleSvgProps = SizeProps & { borderWidth: number; borderGradientColor: string };
const CircleSvg = styled.svg.attrs(({ width, height }) => ({
  width,
  height,
  viewBox: `0 0 ${width} ${height}`,
}))<CircleSvgProps>`
  border-style: solid;
  border-color: transparent;
  border-width: ${({ borderWidth }) => borderWidth}px;
  border-image: ${({ borderGradientColor }) => `linear-gradient(to bottom right, ${borderGradientColor})`};
  border-image-slice: 1;
`;

type CircleColorsCardProps = SizeProps & { colors: Color[] } & { name: string };

// TODO:
// currently there are a few problems with this component:
// (1) adding a fill color to the circle will break the sizing of the borders
// (2) size of the circle is not consistent with size of the Circle / Dual Color Circle even if sizes are equal
const CircleColorsCard: React.FC<CircleColorsCardProps> = ({ width, height, name, colors }) => {
  const theme = useTheme();
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
  const gradientColor = colors.map((color, index) => `${theme.palette[color]} ${incrementer * index}%`).join(', ');

  return (
    <CircleSvg width={width} height={height} borderWidth={strokeWidth} borderGradientColor={gradientColor}>
      {colors.map((color, index) => {
        return (
          <circle
            key={color}
            cx={centerX}
            cy={centerY}
            r={radius}
            stroke={theme.palette[color]}
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
        style={{ fontSize: `${scalefontSizes(height / 2)}px` }}
      >
        {name}
      </text>
    </CircleSvg>
  );
};

export default CircleColorsCard;
