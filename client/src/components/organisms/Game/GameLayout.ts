import styled from 'styled-components';

import { breakpoints, borderSize } from '../../../styles';

export const BottomViewLayout = styled.div`
  display: flex;
`;

export const ExpandableLayout = styled.div`
  flex: 1;
  height: 100%;
`;

export const CollapsableLayout = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;

  height: ${({ height }) => height}px;
  border-left: ${borderSize.normal} solid ${({ theme }) => theme.outline};

  @media screen and (max-width: ${breakpoints.laptop}) {
    display: none;
  }
`;
