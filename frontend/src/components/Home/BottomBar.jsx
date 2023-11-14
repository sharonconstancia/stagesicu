import React, { useContext } from 'react';
import { AiFillSetting, AiOutlineLeft } from 'react-icons/ai';
import { BiLogOut, BiLogOutCircle } from 'react-icons/bi';
import { MdSpaceDashboard, MdLightMode, MdDarkMode } from 'react-icons/md';
import { IoInvertModeOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import useRoutes from '../../Utils/useRoutes';
import Navlink from './Navlink';
import { SidebarContext } from '../../Context/SidebarContext';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

const BottomBar = () => {
  const routes = useRoutes();
  return (
    <>
      <div className='bottom-0  w-full  py-2 fixed z-20 bg-slate-700'>
        <div className='flex flex-row space-x-5 justify-center  md:hidden'>
          {routes.map((route) => (
            <Link to={route.path} key={route.path}>
              <p className= {`text-2xl dark:text-white ${route.active ? 'bg-red-900 ':'bg-blue-600'} ` } > {<route.icon />}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BottomBar;
