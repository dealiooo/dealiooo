import styled from 'styled-components';

import { constants } from '../../styles';
import PlayerBox from './PlayerBox';
import { Chat, Button, IconButton } from '../../components';

const { borderSizes, borderRadiuses, spaces } = constants;

export const Detail = styled.div`
  border-radius: ${borderRadiuses.round};
  background-color: ${({ theme }) => theme.palette.backgroundLighter};
  padding: ${spaces.sm};
`;

export const PlayerBoxes = styled.div`
  display: flex;

  & > ${PlayerBox} + ${PlayerBox} {
    border-left: ${borderSizes.normal} solid ${({ theme }) => theme.palette.outline};
  }
`;

export const BottomViewLayout = styled.div`
  display: flex;
`;

export const ExpandableLayout = styled.div`
  flex: 1;
  height: 100%;
`;

export const CancelButton = styled(Button).attrs({ color: 'red' })`
  margin: 0 auto;
`;

type CollapsableLayoutProps = { height: number };
export const CollapsableLayout = styled.div<CollapsableLayoutProps>`
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height}px;

  border-left: ${borderSizes.normal} solid ${({ theme }) => theme.palette.outline};
`;

type CollapseTopBarProps = { collapsed: boolean };
export const CollapseTopBar = styled.div<CollapseTopBarProps>`
  display: flex;
  flex-direction: ${props => (props.collapsed ? 'column' : 'row')};
  justify-content: space-between;
  height: ${props => (props.collapsed ? '100%' : 'auto')};

  & > ${IconButton} {
    border-radius: 0;
  }
`;

export const CollapseChat = styled(Chat)`
  height: calc(100% - 40px);
  border: none;
`;
