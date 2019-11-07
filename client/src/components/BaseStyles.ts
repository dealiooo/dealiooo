import styled, { css } from 'styled-components';

export const UnstyledButton = styled.button`
  color: currentColor;
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

export const LinkStyle = css`
  cursor: pointer;
  color: currentColor;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;
