import styled from 'styled-components';

import { fontWeight } from '../../../styles';

const Strong = styled.div`
  color: ${({ theme }) => theme.text};
  font-weight: ${fontWeight.bold};
`;

export default Strong;
