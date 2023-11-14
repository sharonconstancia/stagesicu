import RouterProvider from './Router/RouterProvider';
import SidebarContextProvider from './Context/SidebarContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotCode from './components/Code/ForgotCode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  SignUp,
  SignedIn,
  SignedOut,
  useClerk,
  useSignIn,
} from '@clerk/clerk-react';

import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import CircleLoader from './components/CircleLoader/CircleLoader';

const App = () => {

  const [isLoading, setisLoading] = useState(true);
 
  return (
    <>
      {/* {isLoading && (
        <div className='flex justify-center items-center h-screen'>
          {' '}
          <CircleLoader />
        </div>
      )} */}
   
      <SidebarContextProvider>
        <SignedIn>
          <RouterProvider />
        </SignedIn>
        <SignedOut>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotCode' element={<ForgotCode />} />
          </Routes>
        </SignedOut>
      </SidebarContextProvider>
      
    
     

    </>
  );
};

export default App;
