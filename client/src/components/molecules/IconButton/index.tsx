import styled from 'styled-components';

import { UnstyledButton } from '../../BaseStyles';
import { borderRadius } from '../../../styles';

export default styled(UnstyledButton)`
  border-radius: ${borderRadius.round};

  &:hover {
    background-color: ${({ theme }) => theme.backgroundLight};
  }
`;
