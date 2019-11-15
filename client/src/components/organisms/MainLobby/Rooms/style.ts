import styled from 'styled-components';
import { borderRadius, space, breakpoints } from '../../../../styles';

import { GameStatus } from '../../../../types/dealiooo';
import { CenterInline, Box, Attribute } from '../../../atoms';
import { rem } from '../../../../styles';

export const Column = styled.div`
  > :nth-child(2) {
    margin-top: 0;

    @media screen and (min-width: ${breakpoints.tablet}) {
      margin-top: ${space.medium};
    }
  }
`;

export const HostUsername = styled(CenterInline)``;

export const PlayersSize = styled(CenterInline)`
  margin-left: ${rem('6px')};
  letter-spacing: 2px;
`;

export const Room = styled(Box)`
  padding: ${space.large} ${space.xLarge};

  display: flex;
  align-items: center;

  @media screen and (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }

  > ${Column} {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: ${breakpoints.tablet}) {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;

      &:not(:last-child) {
        margin-bottom: ${space.medium};
      }

      &:last-child {
        justify-content: center;
      }
    }
  }

  > ${Column}:first-child {
    flex: 1.5;
    align-items: flex-start;
  }

  > ${Column}:last-child {
    align-items: flex-end;
  }
`;

export const Rooms = styled.div`
  /* to avoid overlap with the scrollbar */
  padding-right: ${space.medium};

  border-radius: ${borderRadius.round};
  height: 100%;
  > ${Room} + ${Room} {
    margin-top: ${space.large};
  }
`;

export const GameStatusPill = styled(Attribute).attrs(props => ({
  ...props,
  pill: true,
}))`
  color: ${({ theme, status }) => {
    if (status === GameStatus.open) return theme.success;
    if (status === GameStatus.running) return theme.info;
    if (status === GameStatus.started) return theme.warning;
    // Statuses.ENDED
    return theme.error;
  }};
  background-color: ${({ theme, status }) => {
    if (status === GameStatus.open) return theme.successAccent;
    if (status === GameStatus.running) return theme.infoAccent;
    if (status === GameStatus.started) return theme.warningAccent;
    // Statuses.ENDED
    return theme.errorAccent;
  }};
`;
