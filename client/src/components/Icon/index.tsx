import React from 'react';
import styled from 'styled-components';

import { Color } from '../../styles';

type IconWrapperProps = { color?: Color; size?: number };
type IconProps = IconWrapperProps & { icon: string };

export const IconWrapper = styled.span<IconWrapperProps>`
  display: inline-block;
  vertical-align: middle;
  width: ${({ size }) => `${size || 1}rem`};
  height: ${({ size }) => `${size || 1}rem`};
  color: ${({ theme, color }) => theme.palette[color] || color || 'currentColor'};

  & > svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    stroke: currentColor;
  }
`;

const Icon = styled(({ icon, ...props }: IconProps) => {
  const svg = require(`!raw-loader!./icons/${icon}.svg`);
  return <IconWrapper {...props} dangerouslySetInnerHTML={{ __html: svg.default }} />;
})``;

export default Icon;
