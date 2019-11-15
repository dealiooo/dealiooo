import styled from 'styled-components';

import { fontWeight, space, borderSize } from '../../../../styles';
import { FlexRowCenter, Flex } from '../../../layouts';
import { Strong } from '../../../atoms';

export const GameGlobalsBarContainer = styled(Flex)<{ height: number }>`
  height: ${({ height }) => height}px;
  padding: ${space.small} ${space.large};
  border-bottom: ${borderSize.normal} solid ${({ theme }) => theme.outline};
`;

export const TurnTime = styled(Strong)<any>`
  color: ${({ theme }) => theme.gold};
`;

export const TurnMessage = styled.div``;

export const RightContent = styled(FlexRowCenter)`
  flex-shrink: 0;
  height: calc(100% + ${space.large} - ${borderSize.normal} * 2);
`;
