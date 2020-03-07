import styled from 'styled-components';

import withForwardedRef from '../withForwardedRef';
import { constants, mixins } from '../../styles';

const { spaces, borderRadiuses } = constants;

type InputProps = {
  error?: boolean;
};

const Input = styled.input<InputProps>`
  width: 100%;
  padding: ${spaces.sm} ${spaces.md};
  line-height: 1;
  outline: 0;
  ${mixins.border};
  border-color: ${({ theme, error }) => error && theme.palette.red};
  border-radius: ${borderRadiuses.round};
  background-color: transparent;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover,
  &:focus,
  &:active {
    background-color: ${({ theme }) => theme.palette.backgroundLighter};
    &:disabled {
      background-color: ${({ theme }) => theme.palette.gray};
    }
  }
  &:disabled {
    background-color: ${({ theme }) => theme.palette.gray};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    caret-color: ${({ theme }) => theme.palette.outlineLight};
    border-color: ${({ theme }) => theme.palette.outlineLight};
    -webkit-text-fill-color: ${({ theme }) => theme.palette.text};
    box-shadow: 0 0 0px 1000px ${({ theme }) => theme.palette.backgroundLighter} inset;
  }
`;

export default styled(withForwardedRef(Input))``;
