import styled from 'styled-components';
import { rem } from '../../../styles';

import { breakpoints, space } from '../../../styles';
import { IconButton } from '../../molecules';
import { BackDropProps } from '.';

export const BackDrop = styled.div<BackDropProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  transform: translateZ(0);
  background-color: rgba(0, 0, 0, 0.3);

  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
`;

export const Modal = styled.div`
  // fill entire space of screen
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  // fill space at the center of screen
  @media screen and (min-width: ${breakpoints.tablet}) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    height: auto;
    // width and height constraints for the children
    max-width: ${rem('800px')};
    max-height: calc(100% - ${space.xxxLarge});
  }
`;

export const ModalBody = styled.div`
  height: 100%;

  background-color: ${({ theme }) => theme.backgroundLightest};
  padding: ${space.large};
  @media screen and (min-width: ${breakpoints.tablet}) {
    padding: ${space.xxxLarge};
  }
`;

export const ModalHeader = styled.div``;

export const ModalContent = styled.div`
  margin-top: ${space.xxxLarge};

  @media screen and (min-width: ${breakpoints.tablet}) {
    margin-top: ${space.medium};
  }
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: ${space.small};
  right: ${space.small};
  padding: ${space.small};
`;
