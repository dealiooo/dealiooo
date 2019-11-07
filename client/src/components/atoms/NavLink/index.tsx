import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { LinkStyle } from '../../BaseStyles';
const activeClassName = 'active';

export default styled(NavLink).attrs({
  activeClassName,
})`
  ${LinkStyle}

  color: ${({ theme }) => theme.disabled};

  :hover {
    color: ${({ theme }) => theme.primary};
  }

  &.${activeClassName} {
    color: ${({ theme }) => theme.primary};
  }
`;
