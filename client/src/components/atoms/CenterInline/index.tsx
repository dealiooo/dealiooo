import React from 'react';
import styled, { StyledComponentProps } from 'styled-components';

import { space } from '../../../styles';

const CenterInline = styled.span<Pick<CenterInlineProps, 'left'>>`
  display: inline-block;
  vertical-align: middle;

  ${({ left }) => {
    if (left) return `margin-right: ${space.nano}`;
    return `margin-left: ${space.nano}`;
  }}
`;

export type CenterInlineProps = StyledComponentProps & {
  left?: boolean;
  children: React.ReactNode;
};

export default function({ left = false, children, ...props }: CenterInlineProps) {
  return (
    <CenterInline {...props} left={left}>
      {children}
    </CenterInline>
  );
}
