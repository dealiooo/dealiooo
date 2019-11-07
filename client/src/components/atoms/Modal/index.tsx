import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { Close as CloseIcon } from 'styled-icons/evil/Close';
import noop from 'lodash/noop';

import { BackDrop, Modal, ModalBody, ModalHeader, ModalContent, CloseButton } from './style';
import { ClickEvent, ClickHandler } from '../../../types';

export type Props = {
  open?: boolean;
  onClose?: VoidFunction;
  children: React.ReactNode;
};

export type BackDropProps = {
  open: boolean;
  onClick: ClickHandler;
};

export default function({ open = false, onClose = noop, children }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const container = document.body;

  if (open) {
    // Disable overflow from outside
    container.style.overflow = 'hidden';
  } else {
    container.style.overflow = 'visible';
  }

  const handleBackDropClick = (event: ClickEvent) => {
    if (modalRef.current && modalRef.current.contains(event.target as Node)) return;
    onClose();
  };
  const handleCloseClick = (event: ClickEvent) => onClose();

  return createPortal(
    <BackDrop open={open} onClick={handleBackDropClick}>
      {open && (
        <Modal ref={modalRef}>
          <ModalBody>
            <ModalHeader>
              <CloseButton onClick={handleCloseClick}>
                <CloseIcon size={30} />
              </CloseButton>
            </ModalHeader>
            <ModalContent>{children}</ModalContent>
          </ModalBody>
        </Modal>
      )}
    </BackDrop>,
    container,
  );
}