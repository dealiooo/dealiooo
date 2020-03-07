import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { mixins } from '../../styles';

export const Link = styled(RouterLink)`
  ${mixins.link};
`;
