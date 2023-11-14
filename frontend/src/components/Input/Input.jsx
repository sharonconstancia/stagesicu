import React from 'react';

const Input = ({ label, value, setValue, type, id }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='text-black dark:text-white block my-2 text-lg'
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='border-b w-full outline-none bg-transparent border-b-slate-600 dark:text-white text-gray-900 text-xl'
      />
    </div>
  );
};

export default Input;
