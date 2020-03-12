import styled, { keyframes } from 'styled-components';
import { Loader as LoaderIcon } from '@styled-icons/feather/Loader';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled(LoaderIcon)`
  animation: ${rotate} infinite 2s linear;
`;

export default Loader;
