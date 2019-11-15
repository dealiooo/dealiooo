import styled, { css } from 'styled-components';

import { borderSize } from '../styles';

export const UnstyledButton = styled.button`
  color: currentColor;
  border: none;
  background-color: transparent;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

export const LinkStyle = css`
  cursor: pointer;
  color: currentColor;
  opacity: 0.8;
`;
