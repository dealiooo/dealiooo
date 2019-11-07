import styled from 'styled-components';

import { space, breakpoints } from '../../../styles';

export const NAVBAR_HEIGHT = '64.5px';

export const NavRoot = styled.nav`
  display: flex;
  align-items: center;

  padding: 0 ${space.xxxLarge};

  @media screen and (max-width: ${breakpoints.tablet}) {
    // horizontally: same as 'Container' padding
    padding: 0 ${space.large};
  }

  height: ${NAVBAR_HEIGHT};
`;

export const NavMenu = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const NavMenuBaseChild = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  > * {
    margin-left: ${space.small};
    margin-right: ${space.small};
  }

  > :first-child {
    margin-left: 0;
  }

  > :last-child {
    margin-right: 0;
  }
`;

export const NavBegin = styled(NavMenuBaseChild)``;

// May not be true center, if only has single sibling [NavBegin | NavEnd]
// to get around this: create empty pseudo ::before/after element or empty sibling
export const NavMiddle = styled(NavMenuBaseChild)`
  justify-content: center;
`;

export const NavEnd = styled(NavMenuBaseChild)`
  justify-content: flex-end;
`;

const Navbar = {
  Root: NavRoot,
  Menu: NavMenu,
  Begin: NavBegin,
  Middle: NavMiddle,
  End: NavEnd,
};

export default Navbar;
