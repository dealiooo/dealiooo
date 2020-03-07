import styled from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';

import { mixins } from '../../styles';

const activeClassName = 'active';

const NavLink = styled(RouterNavLink).attrs({
  activeClassName,
})`
  ${mixins.link};
  width: auto;

  &.${activeClassName} {
    color: ${({ theme }) => theme.palette.primary};
  }
`;

export default NavLink;
