import styled from 'styled-components';

import { HorizontalLine } from '../../../../../../../components';
import { constants, mixins } from '../../../../../../../styles';
import { SizeProps } from '../../../../style';

const { borderRadiuses } = constants;

type CardProps = SizeProps & {
  color: string;
};

export const Card = styled.div<CardProps>`
  ${mixins.flexRowCenter};
  color: ${({ theme }) => theme.palette.grayLight};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin: 0 auto;
  background-color: ${({ theme, color }) => theme.palette[color] || theme.palette.backgroundLight};
  border-radius: ${borderRadiuses.round};
`;

export const Table = styled.table`
  table-layout: fixed;
  width: 33vw;
  flex: 1;
`;

export const Money = styled.div`
  ${mixins.flexRowCenter};
  color: ${({ theme }) => theme.palette.gold};
`;

export const FullSet = styled.div`
  ${mixins.flexRowCenter};

  & > ${HorizontalLine} {
    flex-grow: 1;
  }
`;
