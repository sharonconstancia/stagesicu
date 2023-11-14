import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';
import { useContext } from 'react';
import BottomBar from '../components/Home/BottomBar';
import { MoonLoader } from 'react-spinners';
import ProgressBar from '@ramonak/react-progress-bar';

import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Home/Sidebar';
import { SidebarContext } from '../Context/SidebarContext';
import Dashboard from '../Layout/Dashboard';
// import District from '../Layout/District';
import Locateur from '../Layout/Locateur';
import Chambre from '../Layout/Chambre';
import Bloc from '../Layout/Bloc';
import BodyContext from '../components/Home/BodyContext';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login'
import { useUser, useAuth } from '@clerk/clerk-react';
import {
  useGetCompteByClerkQuery,
  useGetCompteQuery,
} from '../redux/Slice/compteSlice';
import Accueil from '../Layout/simpleUser/Accueil';
import Demandes from '../Layout/simpleUser/Demandes';
import Verification from '../Layout/simpleUser/Verification';
//import Accueil from '../Layout/simpleUser/Accueil';
import Etudiant from '../Layout/Etudiant';
import Demande from '../Layout/Demande';
const RouterProvider = () => {
  const { userId } = useAuth();
  const { data: compte , isLoading} = useGetCompteByClerkQuery(userId);

  console.log(compte)
  const { size } = useContext(SidebarContext);
  return (
    <div
      className={clsx(
        '  h-100vh  md:grid ',
        size === 'full' ? 'grid-cols-[250px,1fr]' : 'grid-cols-[80px,1fr]'
      )}
    >
     

      {/* <div className='w-full  top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30 h-[40px]  fixed'></div> */}
      {isLoading? (
        <div className='flex justify-center w-[1500px] h-screen items-center'>
          <MoonLoader/>
        </div>
        
      ): (
        <> 
         <Sidebar />
      {/* <BottomBar /> */}
      {compte?.isAdmin &&(
           <Routes>
           <Route path='' element={<BodyContext />}>
             <Route path='/' element={<Dashboard />} />
             <Route path='/bloc' element={<Bloc />} />
             <Route path='/locateur' element={<Locateur />} />
             <Route path='/etudiant' element={<Etudiant />} />
             <Route path='/chambre' element={<Chambre />} />
             <Route path='/demande' element={<Demande />} />
           </Route>
         </Routes>
      )}
     
        <>
          {!compte?.isAdmin && (
            <Routes>
              <Route path='' element={<BodyContext />}>
                <Route path='/' element={<Accueil />} />
                <Route path='/demandes' element={<Demandes />} />
                <Route path='/verification' element={<Verification />} />
              </Route>
            </Routes>
          )}
        </>
        
        
         </> 
        
      )
      }
    
    </div>
  );
};

export default RouterProvider;
