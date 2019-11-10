import React from 'react';
import styled from 'styled-components';

import { space } from '../../../styles';

const FormError = styled(({ error, ...props }) => <div {...props}>{error.message}</div>)`
  color: ${({ theme }) => theme.error};
  text-align: center;
  margin-top: ${space.large};
`;

export default FormError;
