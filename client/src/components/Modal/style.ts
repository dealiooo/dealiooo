import styled from 'styled-components';

import { remcalc, constants, media, mixins } from '../../styles';
import { IconButton } from '..';

const { spaces, borderRadiuses } = constants;

type BackDropProps = { open: boolean };
export const BackDrop = styled.div<BackDropProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  transform: translateZ(0);
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  ${mixins.flexRowCenter};

  ${media.tablet} {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  ${media.tablet} {
    width: auto;
    height: auto;
    min-width: ${remcalc('500px')};
    max-width: ${remcalc('800px')};
    max-height: ${remcalc('600px')};
  }

  padding: ${spaces.lg};
  background-color: ${({ theme }) => theme.palette.backgroundLightest};
  border-radius: ${borderRadiuses.round};
`;

export const ModalHeader = styled.header`
  ${mixins.flexRowCenter};
  justify-content: space-between;
  padding-bottom: ${spaces.md};
`;
