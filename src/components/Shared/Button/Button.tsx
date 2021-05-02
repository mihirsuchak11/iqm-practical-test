import React, { ReactNode } from 'react';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Button.scss';

interface ButtonProps {
  onClick: () => void;
  btnText: string | ReactNode | any;
  className?: string;
  type?: string;
  icon?: IconDefinition;
}

const Button: React.FC<ButtonProps> = ({ onClick, btnText, type, className, icon }) => {
  if (type && type !== 'secondary') {
    throw new Error("Only type 'secondary' allowed!");
  }
  return (
    <button className={`button${type ? ` ${type}` : ' primary'}${className ? ` ${className}` : ''}`} onClick={() => onClick()}>
      {btnText} {icon && <FontAwesomeIcon icon={icon} />}
    </button>
  );
};
export default Button;
