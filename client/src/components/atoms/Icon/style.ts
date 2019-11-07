import styled from 'styled-components';

import { IconProps } from '.';

export const Icon = styled.span<Omit<IconProps, 'icon'>>`
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
