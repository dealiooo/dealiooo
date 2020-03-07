import styled from 'styled-components';

import { constants } from '../../styles';

const { borderRadiuses, spaces, transition } = constants;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: ${borderRadiuses.round};
  color: ${({ theme, color }) => theme.palette[color] || color || 'currentColor'};
  padding: ${spaces.sm};
  line-height: 1;
  outline: 0;
  transition: ${transition};

  &:hover,
  &:focus,
  &:active {
    background-color: ${({ theme }) => theme.palette.background};
    & > svg {
      opacity: 0.8;
    }
  }
`;

export default IconButton;
