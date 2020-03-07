import styled from 'styled-components';

import { mixins, constants } from '../../styles';
import ScrollBar from '../ScrollBar';

const { spaces } = constants;

export const Log = styled(ScrollBar)`
  flex: 1;
  margin-bottom: ${spaces.lg};
`;

export const Container = styled.div`
  ${mixins.roundBox};
  padding: ${spaces.lg};

  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Username = styled.span`
  color: ${({ theme }) => theme.palette.primary};
`;

export const Message = styled.span`
  margin-left: ${spaces.sm};
`;
