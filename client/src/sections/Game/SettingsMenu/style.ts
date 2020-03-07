import styled from 'styled-components';

import { constants, mixins } from '../../../styles';
import { Button } from '../../../components';

const { spaces } = constants;

export const ForfeitButton = styled(Button).attrs({ color: 'red' })`
  ${mixins.elementHoverDisplay('svg')}

  margin-top: ${spaces.lg};
`;
