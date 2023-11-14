import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { HiUser } from 'react-icons/hi2';
import { ImUsers } from 'react-icons/im';
import { PiUsersFourFill } from 'react-icons/pi';
import { RiHome8Fill, RiCommunityFill } from 'react-icons/ri';
import { ImHome } from 'react-icons/im';
import { GiHomeGarage } from 'react-icons/gi';
import {AiOutlineFileDone,AiOutlineCheckCircle} from 'react-icons/ai';

import { MdSpaceDashboard, MdLightMode, MdDarkMode } from 'react-icons/md';

const simpleRoutes = () => {
  const pathname = useLocation().pathname;

  const routes = useMemo(
    () => [
      {
        label: 'Dashboard',
        path: '/',
        icon: MdSpaceDashboard,
        active: pathname === '/',
      },
   
      {
        label: 'Verification',
        path: '/verification',
        icon: AiOutlineCheckCircle,
        active: pathname === '/verification',
      },
      {
        label: 'Demandes',
        path: '/demandes',
        icon: AiOutlineFileDone,
        active: pathname === '/demandes',
      },

    ],
    [pathname]
  );
  return routes;
};
export default simpleRoutes;
