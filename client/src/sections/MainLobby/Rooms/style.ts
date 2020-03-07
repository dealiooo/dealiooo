import styled from 'styled-components';

import { constants, media, mixins } from '../../../styles';
import { Button } from '../../../components';

const { borderRadiuses, spaces } = constants;

export const RoomButton = styled(Button).attrs({ color: 'blue', outline: true })`
  ${mixins.elementHoverDisplay('svg')};
`;

export const Column = styled.div`
  & > *:nth-child(2) {
    margin-top: 0;

    ${media.tablet} {
      margin-top: ${spaces.md};
    }
  }
`;

export const Room = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.tablet} {
    flex-direction: row;
  }

  ${mixins.roundBox};
  padding: ${spaces.lg} ${spaces.xl};

  & > ${Column} {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: ${spaces.md};

    ${media.tablet} {
      flex-direction: column;
    }

    &:first-child {
      flex: 1.5;
      align-items: flex-start;
    }

    &:last-child {
      margin-bottom: 0;
      justify-content: center;
      align-items: flex-end;
    }
  }
`;

export const Rooms = styled.div`
  border-radius: ${borderRadiuses.round};
  height: 100%;
  & > ${Room} + ${Room} {
    margin-top: ${spaces.lg};
  }
`;
