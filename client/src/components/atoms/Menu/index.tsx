import styled from 'styled-components';

import { borderRadius, space, borderSize } from '../../../styles';

export const Menu = styled.ul`
  background-color: ${({ theme }) => theme.backgroundLightest};
  border: ${borderSize.normal} solid ${({ theme }) => theme.outline};
  padding: ${space.large} 0;
  border-radius: ${borderRadius.round};
`;

export const MenuItem = styled.li`
  padding: ${space.medium};

  text-align: start;
  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
`;
