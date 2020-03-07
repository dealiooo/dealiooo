import styled from 'styled-components';

import { constants, media, mixins } from '../../styles';

const { navbarHeight, spaces } = constants;

export const Navbar = styled.nav`
  ${mixins.flexRowCenter};
  height: ${navbarHeight};
  padding: 0 ${spaces.xxxl};

  ${media.tablet} {
    padding: 0 ${spaces.lg};
  }
`;

const NavMenu = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const SectionBaseLayout = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  & > * {
    margin-left: ${spaces.sm};
    margin-right: ${spaces.sm};
  }

  & > :first-child {
    margin-left: 0;
  }

  & > :last-child {
    margin-right: 0;
  }
`;

const NavBegin = styled(SectionBaseLayout)``;

const NavMiddle = styled(SectionBaseLayout)`
  justify-content: center;
`;

const NavEnd = styled(SectionBaseLayout)`
  justify-content: flex-end;
`;

Navbar.Menu = NavMenu;
Navbar.Begin = NavBegin;
Navbar.Middle = NavMiddle;
Navbar.End = NavEnd;

export default Navbar;
