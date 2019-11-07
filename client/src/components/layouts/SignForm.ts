import styled from 'styled-components';

import { space, breakpoints } from '../../styles';

export default styled.form`
  margin: ${space.xxxLarge} auto;
  width: 100%;

  @media screen and (min-width: ${breakpoints.tablet}) {
    width: 300px;
  }
`;
