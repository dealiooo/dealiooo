import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Close as CloseIcon } from 'styled-icons/evil/Close';

import * as S from './style';
import { Title, IconButton } from '..';

export type ModalProps = {
  open?: boolean;
  title?: string;
  onClose?: (event) => void;
};

const Modal: React.FC<ModalProps> = ({ open = false, title = '', onClose = event => undefined, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const handleCloseClick = event => onClose(event);
  const handleBackgroundClick = event => {
    if (modalRef.current && modalRef.current.contains(event.target)) {
      return;
    }
    handleCloseClick(event);
  };

  useEffect(() => {
    // disable scrolling when modal is open
    document.body.style.overflow = open ? 'hidden' : 'unset';
  }, [open]);

  return createPortal(
    <S.BackDrop open={open} onClick={handleBackgroundClick}>
      {open && (
        <S.Modal ref={modalRef}>
          <S.ModalBody>
            <S.ModalHeader>
              <Title marginless>{title}</Title>
              <IconButton onClick={handleCloseClick}>
                <CloseIcon size={20} />
              </IconButton>
            </S.ModalHeader>
            {children}
          </S.ModalBody>
        </S.Modal>
      )}
    </S.BackDrop>,
    document.body,
  );
};

export default Modal;
