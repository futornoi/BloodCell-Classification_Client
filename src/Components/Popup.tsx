import React, { ReactNode } from 'react';

interface Popup {
  children?: ReactNode;
  active: boolean;
  toggleModal: () => void;
}

const Popup: React.FC<Popup> = ({ children, active, toggleModal }) => (
  <div className={`popup ${active ? 'active' : ''}`} onClick={toggleModal}>
    <div onClick={(e) => {
      e.stopPropagation()
    }} className="popup__content">
      {children}
    </div>
  </div>
);


export default Popup;
