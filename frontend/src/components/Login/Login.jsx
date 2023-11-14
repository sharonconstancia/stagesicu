import React from 'react';
import { useSignIn } from '@clerk/clerk-react';

import Slide from '../Swiper/Slide';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signIn, isLoaded, setActive } = useSignIn();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await signIn.create({
        identifier: data.pseudo,
        password: data.password,
      });

      if (result.status === 'complete') {
        console.log(result);
        await setActive({ session: result.createdSessionId });
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err) {
      console.error('error', err.errors[0].longMessage);
  
    }
  };

  if (!isLoaded) {
    // Handle loading state
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, ease: 'easeInOut', duration: 0.5 }}
      className=' flex justify-center  items-center space-x-1 h-screen '
    >
      <div className='grid md:grid-cols-[400px,1fr] grid-cols-[2px,1fr] border rounded-lg bg-transparent h-[500px] shadow-lg shadow-indigo-600'>
        <motion.div
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, ease: 'easeInOut', duration: 0.8 }}
          className=' h-full rounded-l-lg col-[1] md:block hidden'
        >
          <Slide />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, ease: 'easeInOut', duration: 0.8 }}
          className=' col-[2]'
        >
          <h2 className='text-center font-bold text-4xl py-5 tracking-widest text-indigo-700'>
            <TypeAnimation
              sequence={['', 1000, 'Se Connecter ', 1000]}
              wrapper='span'
              speed={10}
              style={{
                fontSize: '',
                display: 'inline-block',
                text: 'white',
              }}
              repeat={Infinity}
            />
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-10 mx-10 p-4'>
            <div>
              <label
                htmlFor='true'
                className='text-indigo-800 block my-2 text-lg font-semibold '
              >
                Pseudo ou Email
              </label>
              <input
                type='text'
                {...register('pseudo')}
                className='border-b w-full outline-none bg-transparent dark:bg-transparent  border-b-slate-600 text-black text-xl'
              />
            </div>
            <div>
              <label
                htmlFor='true'
                className='text-indigo-800 block my-2 font-semibold text-lg '
              >
                Mot de passe
              </label>
              <input
                type='password'
                {...register('password')}
                className='border-b w-full outline-none bg-transparent border-b-slate-600 text-black text-xl'
              />
            </div>
            <div className='mt-2'>
              <Link to={'/forgotCode'}>
                <p className='text-indigo-600 dark:text-slate-400 ml-40'>
                  Mot de passe oublie?
                </p>
              </Link>
            </div>

            <button className='bg-indigo-700 mt-4  text-white w-full  px-5 py-2 rounded-lg'>
              {isLoaded ? 'connecter' : 'connexion en cours '}
            </button>
          </form>
          <p className='text-black text-center dark:text-slate-400'>
            Vous n'avez pas du compte?{' '}
            <Link to={'/register'}>
              <span className='text-indigo-900 dark:text-blue-500 border-b border-b-slate-900'>
             s'inscrire
              </span>{' '}
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
