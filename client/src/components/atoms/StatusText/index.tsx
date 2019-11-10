import styled from 'styled-components';

import { StatusType } from '../../../styles';

interface StatusTextProps {
  status: StatusType;
}

const StatusText = styled.div<StatusTextProps>`
  color: ${({ status, theme }) => {
    if (status) return theme[status];
    return 'currentColor';
  }};
`;

export default StatusText;
