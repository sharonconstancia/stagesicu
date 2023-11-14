import clsx from 'clsx';
import React from 'react';

const Button = ({ text, color, icon: Icon, onClick,width }) => {
  const handleClick = () => {
    if (onClick) onClick();
  };
  return (
    <button
      onClick={handleClick}
      className={clsx(
        ' flex space-x-2  w-max text-slate-200 px-3 py-2 rounded-full',
        color,width
      )}
    >
      {Icon && <Icon  className=' text-2xl'/>}
      
      {text}
    </button>
  );
};

export default Button;
