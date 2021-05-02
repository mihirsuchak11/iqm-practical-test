import React from 'react';

import './Chip.scss';

interface TagProps {
  title: string;
  onClick: () => void;
}

const Chip: React.FC<TagProps> = ({ title, onClick }) => {
  return (
    <div className='chip' onClick={onClick}>
      {title}
    </div>
  );
};

export default Chip;
