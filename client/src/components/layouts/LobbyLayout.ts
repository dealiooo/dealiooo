import styled from 'styled-components';

import { space, breakpoints } from '../../styles';
import Container from './Container';

export default styled(Container)`
  display: flex;

  > {
    // Main Content
    &:nth-child(1) {
      flex: 7;
      height: 100%;

      margin-right: 0;
      @media screen and (min-width: ${breakpoints.tablet}) {
        margin-right: ${space.large};
      }
      @media screen and (min-width: ${breakpoints.laptop}) {
        margin-right: ${space.xxxLarge};
      }
    }

    // Chat
    &:nth-child(2) {
      flex: 4;
      height: 100%;

      // TODO: have another method of opening chat
      // display: none;

      @media screen and (min-width: ${breakpoints.laptop}) {
        display: block;
      }
    }
  }
`;
