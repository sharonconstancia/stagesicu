import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider, ClerkLoading, ClerkLoaded } from '@clerk/clerk-react';
import {ClipLoader,MoonLoader} from 'react-spinners'


const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <ClerkLoading>
        <SkeletonTheme color='#202020' highlightColor='#444'>
          <div className='flex justify-center  items-center mt-[300px]'>
            <MoonLoader/>
          </div>
        </SkeletonTheme>
      </ClerkLoading>
      <ClerkLoaded>
        
        <Router>
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
      </ClerkLoaded>
    </ClerkProvider>
  </React.StrictMode>
);
