import styled from 'styled-components';

import { borderRadius, borderSize } from '../../../styles';

type BoxProps = {};

const Box = styled.div<BoxProps>`
  border: ${borderSize.normal} solid ${({ theme }) => theme.outline};
  border-radius: ${borderRadius.round};
`;

export default Box;
