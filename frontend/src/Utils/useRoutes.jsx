import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { HiUser } from 'react-icons/hi2';
import { ImUsers } from 'react-icons/im';
import { PiUsersFourFill } from 'react-icons/pi';
import { RiHome8Fill, RiCommunityFill } from 'react-icons/ri';
import { ImHome } from 'react-icons/im';
import { GiHomeGarage } from 'react-icons/gi';

import { MdSpaceDashboard, MdLightMode, MdDarkMode } from 'react-icons/md';
import { AiOutlineForm } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import {AiOutlineFileDone} from 'react-icons/ai';

const useRoutes = () => {
  const pathname = useLocation().pathname;

  const routes = useMemo(
    () => [
      {
        label: 'Dashboard',
        path: '/',
        icon: MdSpaceDashboard,
        active: pathname === '/',
      },   {
        label: 'Bloc',
        path: '/bloc',
        icon: ImHome,
        active: pathname === '/bloc',
      },

      {
        label: 'Chambre',
        path: '/chambre',
        icon: GiHomeGarage,
        active: pathname === '/chambre',
      },
   
      {
        label: 'Locateur',
        path: '/locateur',
        icon: RiCommunityFill,
        active: pathname === '/locateur',
      },

      {
        label: 'Etudiant',
        path: '/etudiant',
        icon: ImUsers,
        active: pathname === '/etudiant',
      },
      {
        label: 'Demande',
        path: '/demande',
        icon: AiOutlineFileDone,
        active: pathname === '/demande',
      },
    ],
    [pathname]
  );
  return routes;
};
export default useRoutes;
