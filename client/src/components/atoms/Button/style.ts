import styled, { css } from 'styled-components';

import { space, borderRadius, borderSize } from '../../../styles';
import { ButtonProps } from '.';
import { rem } from '../../../styles';

export const BUTTON_HEIGHT = '42px';

export const outlineStyles = ({ outline }) =>
  outline &&
  css`
    color: currentColor;
    background-color: transparent;
    border: ${borderSize.normal} solid ${({ theme }) => theme.outline};

    &:hover {
      border-width: ${borderSize.thick};
      background-color: ${({ theme }) => theme.backgroundLight};
    }
  `;

const secondaryStyles = ({ secondary }) =>
  secondary &&
  css`
    background-color: ${({ theme }) => theme.secondary};
  `;

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${BUTTON_HEIGHT};
  padding: ${space.medium} ${space.large};
  border: none;
  border-radius: ${borderRadius.round};
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.primary};
  min-width: ${rem('110px')};
  text-align: center;
  opacity: 0.8;

  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:disabled {
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.disabled};
    border-color: transparent;
    opacity: 0.6;

    &:hover {
      background-color: ${({ theme }) => theme.disabled};
    }
  }

  // TODO: customize at the property level
  ${outlineStyles}
  ${secondaryStyles}
`;
