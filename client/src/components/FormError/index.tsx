import React from 'react';
import styled from 'styled-components';

import { constants } from '../../styles';
const { spaces } = constants;

const FormError = styled(({ error, ...props }) => <div {...props}>{error.message}</div>)`
  color: ${({ theme }) => theme.palette.red};
  text-align: center;
  margin-top: ${spaces.lg};
`;

export default FormError;
