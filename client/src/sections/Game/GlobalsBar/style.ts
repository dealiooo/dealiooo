import styled from 'styled-components';

import { constants, mixins } from '../../../styles';
import { Strong } from '../../../components';
import { transparentize } from 'polished';

const { spaces, borderSizes, transition } = constants;

type ContainerProps = { height: number };
export const Container = styled.div<ContainerProps>`
  ${mixins.flexRowCenter};
  justify-content: space-between;

  height: ${({ height }) => height}px;
  padding: ${spaces.sm} 0;
  border-bottom: ${borderSizes.normal} solid ${({ theme }) => theme.palette.outline};
`;

export const TurnTime = styled(Strong)`
  color: ${({ theme }) => theme.palette.gold};
`;

export const RightContent = styled.div`
  ${mixins.flexRowCenter}
  flex-shrink: 0;
  height: calc(100% + ${spaces.lg} - ${borderSizes.normal} * 2);
`;

const BaseSection = styled.div`
  ${mixins.flexRowCenter};
  height: 100%;

  padding-left: ${spaces.sm};
  padding-right: ${spaces.sm};
  cursor: pointer;
  transition: ${transition};
`;

export const Deck = styled(BaseSection)`
  color: ${({ theme }) => theme.palette.green};
  &:hover {
    background-color: ${({ theme }) => transparentize(0.9, theme.palette.green)};
  }
`;

export const Discard = styled(BaseSection)`
  color: ${({ theme }) => theme.palette.red};
  &:hover {
    background-color: ${({ theme }) => transparentize(0.9, theme.palette.red)};
  }
`;

export const TurnCount = styled(BaseSection)`
  color: ${({ theme }) => theme.palette.blue};
  &:hover {
    background-color: ${({ theme }) => transparentize(0.9, theme.palette.blue)};
  }
`;
