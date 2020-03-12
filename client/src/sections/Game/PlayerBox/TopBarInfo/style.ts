import styled from 'styled-components';

import { constants } from '../../../../styles';
import { BorderCircle, Circle, scalefontSizes } from '../style';

const { spaces, borderSizes } = constants;
export const BAR_PADDING = spaces.sm;

type TopBarProps = { height: number };
export const TopBar = styled.div<TopBarProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: ${({ height }) => height}px;
  padding: ${BAR_PADDING};
  border-bottom: ${borderSizes.thin} solid ${({ theme }) => theme.palette.outline};

  & > ${BorderCircle} {
    margin-left: ${spaces.xxl};
  }
`;

type StatCirclesProps = { size: number };
export const StatCircles = styled.div<StatCirclesProps>`
  display: flex;
  font-size: ${({ size }) => scalefontSizes(size)}px;

  & > .trigger {
    cursor: pointer;

    &:hover > ${Circle} {
      background-color: ${({ theme }) => theme.palette.backgroundLighter};
    }
  }

  & > .trigger + .trigger {
    margin-left: ${spaces.sm};
  }
`;

export const Money = styled.div`
  color: ${({ theme }) => theme.palette.gold};
`;
