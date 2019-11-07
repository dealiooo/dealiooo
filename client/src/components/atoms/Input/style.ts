import styled from 'styled-components';

import { space, borderRadius, borderSize } from '../../../styles';
import { InputProps } from '.';

// Warning: changing this can affect how other reusable elements get positioned
export const INPUT_HEIGHT = '42px';

export const Input = styled.input<InputProps>`
  width: 100%;
  height: ${INPUT_HEIGHT};
  padding: ${space.medium};

  border-radius: ${borderRadius.round};
  background-color: ${({ theme }) => theme.backgroundLight};
  outline: none;

  border-width: ${borderSize.normal};
  border-style: solid;
  border-color: ${({ theme, error }) => (error ? theme.error : theme.outline)};

  &:focus {
    border-width: ${borderSize.thick};
  }

  &:disabled {
    cursor: not-allowed;
  }

  // TODO: change design of color/background-color
  // normalize the autofill style for chrome autocomplete
  // for now it just keeps the color & background-color the same
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
    -webkit-transition-delay: 9999s;
  }
`;
