import React from 'react';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Shared/Button/Button';
import './NotFound.scss';

export const NotFound: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Helmet>
        <title>Stackoverflow&apos;s Questions | Not Found</title>
      </Helmet>

      <div className='not_found'>
        <div className='not_found__404'>
          <h2>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h2>
        </div>
        <p>
          we are sorry, but the page you <br /> requested was not found go to{' '}
        </p>
        <Button
          onClick={() => {
            history.push('/');
          }}
          btnText='Go Home'
        />
      </div>
    </>
  );
};

export default NotFound;
