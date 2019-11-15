import styled from 'styled-components';

import { borderRadius, space, breakpoints } from '../../../styles';
import { Button, Box } from '../../atoms';

export const Main = styled(Box)`
  display: flex;
  flex-direction: column;

  padding: ${space.large} ${space.xLarge};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Player = styled.li`
  padding: ${space.medium} ${space.large};
  border-radius: ${borderRadius.round};
`;

export const PlayersList = styled.ul`


margin-top: ${space.xxxLarge};
  ${Player} + ${Player} {
    margin-top: 20px;
  }
`;

export const BottomArea = styled.div`
  flex: 1;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

export const GameButton = styled(Button)`
  background-color: ${({ theme, status }) => {
    if (status === 'host') {
      return theme.primary;
    }
    if (status === 'ready') {
      return theme.success;
    }

    return theme.error;
  }};
`;

export const GameRulesButton = styled(Button)`
  background-color: ${({ theme }) => theme.info};
`;

export const RuleBookWrapper = styled.div`
  height: 100vh;

  @media screen and (min-width: ${breakpoints.tablet}) {
    height: 600px;
  }
`;
