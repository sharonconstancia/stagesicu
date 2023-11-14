import React, { useContext } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarContext } from '../../Context/SidebarContext';

import { Link } from 'react-router-dom';

const Navlink = ({ icon: Icon, title, active, path,onClick }) => {
  
  const handleClick = () => {
    if(onClick){
      onClick()
    }
  }
  const { size, dark } = useContext(SidebarContext);
  const overlay = {
    hidden: {
      width: '0%',
    },
    visible: {
      width: '100%',
      backgroundColor: active
        ? !dark
          ? 'rgb(226 232 240)'
          : 'rgb(2 6 23)'
        : '',
      transition: {
        ease: 'easeInOut',
        duration: 0.7,
      },
    },

    exit: {
      width: '0%',
    },
  };
  return (
    <Link to={path} onClick={handleClick}>
      <div
        className={clsx(
          ' flex relative z-10 rounded-lg p-2 items-center dark:text-white cursor-pointer space-x-2',
          active ? ' text-blue-950 ' : 'text-blue-950',
        )}
      >
        <Icon className='text-2xl' />
        {size === 'full' && (
          <span className='text-base dark:text-slate-100'>{title}</span>
        )}
        <AnimatePresence>
          {active && (
            <motion.div
              variants={overlay}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='w-full h-full -z-10 absolute rounded-lg -left-2'
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
};

export default Navlink;
