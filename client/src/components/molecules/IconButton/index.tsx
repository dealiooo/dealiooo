import styled from 'styled-components';

import { UnstyledButton } from '../../BaseStyles';
import { borderRadius, space } from '../../../styles';
import { outlineStyles } from '../../atoms/Button/style';

export default styled(UnstyledButton)`
  border-radius: ${borderRadius.round};
  padding: ${space.small};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.backgroundLight};
  }

  ${outlineStyles};
`;
