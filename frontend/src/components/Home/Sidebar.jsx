import React, { useContext } from 'react';
import { AiFillSetting, AiOutlineLeft } from 'react-icons/ai';
import { BiLogOut, BiLogOutCircle } from 'react-icons/bi';
import { MdSpaceDashboard, MdLightMode, MdDarkMode } from 'react-icons/md';
import { IoInvertModeOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import useRoutes from '../../Utils/useRoutes';
import simpleRoutes from '../../Utils/simpleRoute';
import Navlink from './Navlink';
import { SidebarContext } from '../../Context/SidebarContext';
import { clsx } from 'clsx';
import { useUser, useAuth } from '@clerk/clerk-react';

import {
  useGetCompteByClerkQuery,
  useGetCompteQuery,
} from '../../redux/Slice/compteSlice';

import {
  SignUp,
  SignedIn,
  SignedOut,
  useClerk,
  useSignIn,
} from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const { userId } = useAuth();
  const { data: compte } = useGetCompteByClerkQuery(userId);

  const routes = useRoutes();
  const simpleRoute = simpleRoutes();
  const { size, toggleSize, toggleTheme, dark } = useContext(SidebarContext);
  const { signOut } = useClerk();
  const handleSignOut = () => {
    signOut();
  };

  return (
    <motion.div
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={clsx(
        ' h-screen bg-white dark:bg-gray-900 fixed hidden md:block col-[1] duration-500 ',
        size === 'full' ? 'w-[250px] px-8' : 'w-[80px] px-3'
      )}
    >
      <div
        className={clsx(
          'relative flex py-4  items-center',
          size === 'full' ? ' space-x-2' : 'space-x-0'
        )}
      >
        {size === 'full' && (
          <div className='
          flex w-30 h-30 justify-center mx-10' >

            <img
              src='univ.png'
              className='w-20  h-20 object-cover  '
              alt=''
            />
          </div>
          
        )}
        <div
          onClick={toggleSize}
          className={clsx(
            'w-8 h-8 rounded-full bg-slate-800  absolute  flex items-center justify-center ',
            size === 'full' ? '-right-[50px]' : '-right-[35px]'
          )}
        >
          <AiOutlineLeft className='text-2xl text-slate-50' />
        </div>
      </div>
      <div>
        {compte?.isAdmin ? (
          <div className='flex flex-col space-y-1'>
            {routes.map((route) => (
              <Navlink
                key={route.label}
                title={route.label}
                icon={route.icon}
                active={route.active}
                path={route.path}
              />
            ))}
          </div>
        ) : (
          <div className='flex flex-col space-y-1'>
            {simpleRoute.map((route) => (
              <Navlink
                key={route.label}
                title={route.label}
                icon={route.icon}
                active={route.active}
                path={route.path}
              />
            ))}
          </div>
        )}

        <div className='absolute bottom-0 pb-5'>
          <Navlink title='Parametre' icon={AiFillSetting} />

          <Navlink
            onClick={handleSignOut}
            title='Deconnecter'
            icon={BiLogOutCircle}
            path={'/'}
          />

          <div
            className={clsx(
              'flex items-center space-x-2 pl-2 my-2',
              size === 'mini' && 'pl-[10px] '
            )}
          >
            <IoInvertModeOutline className='text-slate-500 text-2xl' />
            {size === 'full' && (
              <>
                <span className='text-slate-500 dark:text-slate-100'>
                  Theme
                </span>
                <div
                  onClick={toggleTheme}
                  className='w-24 z-20 relative h-10 rounded-full bg-slate-200 dark:bg-slate-950 flex items-center space-x-2 px-3 '
                >
                  <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                    <MdLightMode className='text-2xl text-yellow-500 dark:text-slate-200' />
                  </div>
                  <div className='w-8 h-8 rounded-full   flex items-center justify-center'>
                    <MdDarkMode className='text-2xl  dark:text-yellow-500 text-slate-400 ' />
                  </div>
                  <motion.div
                    initial={{ x: dark && 0 }}
                    animate={{ x: dark ? 39 : 0 }}
                    transition={{ duration: 0.5 }}
                    className='w-8 h-8 left-1 rounded-full flex items-center justify-center bg-slate-400 dark:bg-slate-900  absolute -z-10'
                  ></motion.div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
