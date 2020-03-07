import styled from 'styled-components';

import { constants, mixins } from '../../styles';

const { spaces } = constants;

const Menu = styled.ul`
  ${mixins.roundBox};
  ${mixins.flexColCenter};
  background-color: ${({ theme }) => theme.palette.backgroundLighter};
  padding: ${spaces.md};
`;

const MenuItem = styled.li`
  padding: ${spaces.md} ${spaces.xl};
  &:hover {
    background-color: ${({ theme }) => theme.palette.background};
  }
`;

Menu.Item = MenuItem;

export default Menu;
