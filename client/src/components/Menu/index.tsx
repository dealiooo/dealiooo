import styled from 'styled-components';

import { constants, mixins } from '../../styles';

const { spaces } = constants;

const MenuItem = styled.li`
  ${mixins.flexRowCenter};
  width: 100%;

  & > * {
    padding: ${spaces.md} ${spaces.xl};
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.background};
  }
`;

const Menu = styled.ul`
  ${mixins.roundBox};
  ${mixins.flexColCenter};
  background-color: ${({ theme }) => theme.palette.backgroundLighter};
  padding: ${spaces.md};

  & > ${MenuItem}:nth-child(even) {
    margin-top: ${spaces.sm};
  }
`;

Menu.Item = MenuItem;

export default Menu;
