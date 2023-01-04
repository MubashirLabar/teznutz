import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export interface IModal {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  afterModalOpen?: () => void;
  afterModalClose?: () => void;
  shouldCloseOnEsc?: boolean;
  shouldFocusAfterRender?: boolean;
  shouldCloseOnOverlayClick?: boolean;
  shouldReturnFocusAfterClose?: boolean;
}

export const Modal: React.FC<IModal> = (props) => {
  const {
    open,
    children,
    onClose,
    shouldCloseOnEsc = true,
    shouldFocusAfterRender = true,
    shouldCloseOnOverlayClick = true,
    shouldReturnFocusAfterClose = true,
  } = props;

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onClose}
      className='ReactModal__Content'
      overlayClassName='ReactModal__Overlay'
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldFocusAfterRender={shouldFocusAfterRender}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldReturnFocusAfterClose={shouldReturnFocusAfterClose}
    >
      {children}
    </ReactModal>
  );
};
