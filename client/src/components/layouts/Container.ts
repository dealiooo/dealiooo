import styled, { css } from 'styled-components';

import { space, breakpoints } from '../../styles';
import { NAVBAR_HEIGHT } from '../molecules/Navbar';

const tabletPadding = css`
  @media screen and (min-width: ${breakpoints.tablet}) {
    padding-left: 62.5px;
    padding-right: 62.5px;
  }
`;

type ContainerProps = {
  paddingOnTablets?: boolean;
};

export default styled.div<ContainerProps>`
  width: 100%;
  height: calc(100vh - ${NAVBAR_HEIGHT});

  padding: ${space.large};

  ${({ paddingOnTablets }) => paddingOnTablets && tabletPadding}

  @media screen and (min-width: ${breakpoints.laptop}) {
    padding-left: 125px;
    padding-right: 125px;
  }
`;
