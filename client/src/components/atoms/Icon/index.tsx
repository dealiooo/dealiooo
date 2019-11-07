import React from 'react';
import styled from 'styled-components';

export type IconProps = {
  icon: string;
  color?: string;
  size?: number;
};

export const IconWrapper = styled.span<Omit<IconProps, 'icon'>>`
  display: inline-block;
  vertical-align: middle;

  color: ${({ color }) => color || 'currentColor'};
  width: ${({ size }) => `${size || 1}rem`};
  height: ${({ size }) => `${size || 1}rem`};

  & > svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    stroke: currentColor;
  }
`;

export default function({ icon, ...props }: IconProps) {
  const svg = require(`!raw-loader!./icons/${icon}.svg`);
  return <IconWrapper {...props} dangerouslySetInnerHTML={{ __html: svg.default }}></IconWrapper>;
}
