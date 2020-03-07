import styled from 'styled-components';

import { media, constants, remcalc } from '../styles';

const { spaces, navbarHeight } = constants;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - ${navbarHeight});
  padding: ${spaces.lg};

  ${media.desktop} {
    padding-left: ${remcalc('125px')};
    padding-right: ${remcalc('125px')};
  }
`;

export default Container;
