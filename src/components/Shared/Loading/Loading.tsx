import React from 'react';

import './Loading.scss';

interface LoadingProps {
  skeltonCount?: number;
}

const Loading: React.FC<LoadingProps> = ({ skeltonCount = 10 }) => {
  return (
    <ul className='skelton_loaders'>
      {Array(skeltonCount)
        .fill(skeltonCount)
        .map((item, index) => {
          return (
            <li className='skelton_loaders__wrapper' key={index}>
              <div className='skelton_loaders__wrapper__summary'>
                <span className='skelton_loaders__wrapper__summary__question skeleton-loader'></span>
                <div className='skelton_loaders__wrapper__summary__chips'>
                  <span className='skelton_loaders__wrapper__summary__chips__chip skeleton-loader'></span>
                  <span className='skelton_loaders__wrapper__summary__chips__chip skeleton-loader'></span>
                  <span className='skelton_loaders__wrapper__summary__chips__chip skeleton-loader'></span>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Loading;
