import styled from 'styled-components';

import { mixins, media, constants, remcalc } from '../../styles';
import { Button } from '../../components';
import RuleBook from '../RuleBook';

const { spaces, borderRadiuses } = constants;

export const Main = styled.div`
  ${mixins.roundBox};
  display: flex;
  flex-direction: column;

  padding: ${spaces.lg} ${spaces.xl};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PlayerStatus = styled.li`
  padding: ${spaces.md} ${spaces.lg};
  border-radius: ${borderRadiuses.round};
`;

export const PlayerStatuses = styled.ul`
  margin-top: ${spaces.xxxl};

  & > ${PlayerStatus} + ${PlayerStatus} {
    margin-top: ${spaces.lg};
  }
`;

export const BottomArea = styled.div`
  flex: 1;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

export const LobbyRuleBook = styled(RuleBook)`
  height: 100vh;
  ${media.tablet} {
    height: ${remcalc('600px')};
  }
`;

export const LeaveLobbyButton = styled(Button).attrs({ color: 'red', outline: true })`
  ${mixins.elementHoverDisplay('svg')};
`;
