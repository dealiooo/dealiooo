import styled, { StyledComponentProps } from 'styled-components';

import { borderRadius, borderSize } from '../../../styles';
import { INPUT_HEIGHT } from '../Input/style';
import { FlexRowCenter } from '../../layouts';

type TabProps = StyledComponentProps & {
  active?: boolean;
};

type TabsProps = StyledComponentProps & {
  autoHeight?: boolean;
};

const BORDER_RADIUS = borderRadius.round;
export const TABS_HEIGHT = INPUT_HEIGHT;

const Tab = styled(FlexRowCenter)<TabProps>`
  flex: 1 1 0;
  align-self: center;

  height: 100%;

  border: none;
  border-radius: 0;

  background-color: ${({ theme, active }) => (active ? theme.backgroundLight : theme.background)};
  text-align: center;
`;

const Tabs = styled.div<TabsProps>`
  flex: 1;
  display: flex;

  height: ${({ autoHeight }) => (autoHeight ? 'auto' : TABS_HEIGHT)};

  border: ${borderSize.normal} solid ${({ theme }) => theme.outline};
  border-radius: ${BORDER_RADIUS};

  > ${Tab} {
    padding: ${borderSize.normal};

    &:hover {
      cursor: pointer;
    }
    &:focus {
      padding: ${borderSize.thick};
      border: ${borderSize.thick} solid ${({ theme }) => theme.outlineDark};
    }
  }

  > ${Tab}:first-child {
    border-radius: ${BORDER_RADIUS} 0 0 ${BORDER_RADIUS};
  }

  > ${Tab}:last-child {
    border-radius: 0 ${BORDER_RADIUS} ${BORDER_RADIUS} 0;
  }

  > ${Tab}:not(:last-child) {
    border-right: ${borderSize.normal} solid ${({ theme }) => theme.outline};

    &:focus {
      border-right-width: ${borderSize.thick};
    }
  }
`;

export default {
  Root: Tabs,
  Tab: Tab,
};
