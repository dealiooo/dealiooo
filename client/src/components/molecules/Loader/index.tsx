import { Loader as LoaderIcon } from 'styled-icons/feather/Loader';
import styled, { keyframes } from 'styled-components';

import { IconProps } from '../../atoms';

export type Props = Omit<IconProps, 'icon'> & {};

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export default styled(LoaderIcon)`
  animation: ${rotate} infinite 1s linear;
`;
