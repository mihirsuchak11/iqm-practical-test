import React from 'react';

import { QuestionsApiErrorProps } from '../../../utils/types';

import './Alert.scss';

interface AlertProps {
  error: QuestionsApiErrorProps;
}

const Alert: React.FC<AlertProps> = ({ error }) => {
  return (
    <div className='error_container'>
      <div className='error_container__icon'>
        <svg height='30' id='close' viewBox='0 0 30 30' width='30' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M4.7,4.092a15,15,0,0,0-.61,21.2q.15.159.3.313A15,15,0,1,0,4.7,4.092ZM7.58,10.548l2.969-2.969L15,12.033l4.454-4.454,2.97,2.969L17.973,15l4.454,4.453-2.97,2.97L15,17.971,10.55,22.426,7.58,19.456,12.034,15Z'
            data-name='Path 4'
            fill='#723036'
            id='Path_4'
            transform='translate(-0.001 0)'
          ></path>
        </svg>
      </div>
      <div>
        <h3 className='error_container__title'>{error?.error_name.split('_').join(' ')}</h3>
        <p className='error_container__message'>{error?.error_message}, Please try again after sometime </p>
      </div>
    </div>
  );
};
export default Alert;
