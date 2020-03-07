import styled from 'styled-components';

import { constants } from '../../styles';
const { spaces } = constants;

export const FormGroup = styled.div`
  margin-bottom: ${spaces.xxl};
`;

export const Label = styled.label`
  display: inline-block;
  margin-bottom: ${spaces.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Error = styled.div`
  color: ${({ theme }) => theme.palette.red};
  margin: ${spaces.xxxs} 0 0 ${spaces.xxxs};
`;
