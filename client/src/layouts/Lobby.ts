import styled from 'styled-components';

import { media, constants } from '../styles';
import Container from './Container';

const { spaces } = constants;

const Lobby = styled(Container)`
  display: flex;

  > {
    /* Main Content */
    &:nth-child(1) {
      flex: 7;
      height: 100%;

      margin-right: 0;
      ${media.desktop} {
        margin-right: ${spaces.md};
      }
    }

    /* Chat */
    &:nth-child(2) {
      flex: 4;
      height: 100%;

      display: none;
      ${media.desktop} {
        display: flex;
      }
    }
  }
`;

export default Lobby;
