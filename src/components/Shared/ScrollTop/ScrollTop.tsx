import { useEffect, useRef } from 'react';

import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button/Button';

import './ScrollTop.scss';

const ScrollTop: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        divRef.current?.classList.add('visible');
        divRef.current?.classList.remove('hidden');
      } else {
        divRef.current?.classList.add('hidden');
        divRef.current?.classList.remove('visible');
      }
    });
  });

  return (
    <div className='scroll_top__wrapper hidden' ref={divRef}>
      <Button icon={faArrowAltCircleUp} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} />
    </div>
  );
};

export default ScrollTop;
