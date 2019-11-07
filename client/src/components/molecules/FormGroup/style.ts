import styled from 'styled-components';

import { space } from '../../../styles';

export const FormGroup = styled.div`
  margin-bottom: ${space.xxLarge};
`;

export const Label = styled.label`
  display: inline-block;
  margin: 0 0 ${space.mini} ${space.mini};
`;

export const Error = styled.div`
  color: ${({ theme }) => theme.error};
  margin: ${space.mini} 0 0 ${space.mini};
`;
