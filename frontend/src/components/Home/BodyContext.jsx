import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import {
  useGetCompteByClerkQuery,
  useGetCompteQuery,
} from '../../redux/Slice/compteSlice';

const BodyContext = () => {
  const user = useUser();
  const { userId } = useAuth();
  const { data: compte } = useGetCompteByClerkQuery(userId);
  const [image, setImage] = useState('');
  
  // setImage(compte?.enqueteur?.image)

  let pathname = useLocation().pathname.split('/')[1];
  pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  // console.log(pathname)
  return (
    <div className=' md:pl-8 col-[2] dark:bg-zinc-900 w-100wh  bg-slate-200 ease-in-out duration-300'>
      <div
        className='header md:mt-5 sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30 h-[60px] flex items-center justify-between px-10
      bg-white dark:bg-gray-900 dark:text-white  ease-in-out duration-300'
      >
        <div>
          <h2 className='text-xl font-bold tracking-whide'>
            {' '}
            {pathname === '' ? 'Accueil' : pathname}{' '}
          </h2>
        </div>
      

        <div className='flex space-x-3 justify-center items-center mt-1'>
          
          <span className='text-lg font-semibold'>{compte?.pseudo}</span>
        </div>
      </div>

      <div className='md:px-1 '>
        <Outlet />
      </div>
    </div>
  );
};

export default BodyContext;
