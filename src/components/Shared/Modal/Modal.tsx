import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button/Button';

import './Modal.scss';

const Modal: React.FC<any> = ({ title, show, children, onClose, footerContent }) => {
  // return null if show props is not available so
  if (!show) {
    return null;
  }
  // Here Modal will be attached at the bottom of the document body
  return ReactDOM.createPortal(
    <div className='backdrop'>
      <div className='modal'>
        <div className='modal_header'>{title}</div>
        <div className='modal_body'>{children}</div>
        <div className='modal_footer'>
          <Button type='secondary' onClick={onClose} btnText='Close' />
          {footerContent}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
