import React, { useState } from 'react';
import { useSignUp, useSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import Slide from '../Swiper/Slide';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const ForgotCode = () => {
  const { register, handleSubmit } = useForm();

  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const create = async (data) => {
    console.log(data);

    await signIn
      .create({
        strategy: 'reset_password_email_code',
        identifier: data.email,
      })
      .then(() => {
        setSuccessfulCreation(true);
      })
      .catch((err) => console.error('error', err.errors[0].longMessage));
  };

  const reset = async (data) => {
    console.log(data);
    await signIn
      .attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: data.code,
        password: data.password,
      })
      .then((result) => {
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId });
          setComplete(true);
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.error('error', err.errors[0].longMessage));
  };



    const navigate = useNavigate();

  return (
    <motion.div
      //   initial={{ opacity: 0 }}
      //   animate={{ opacity: 1 }}
      //   transition={{ delay: 0.5, ease: 'easeInOut', duration: 0.5 }}
      className=' flex justify-center items-center space-x-1 h-screen  '
    >
      <div className='flex w-[900px] border rounded-lg bg-transparent h-[500px] shadow-lg shadow-indigo-600'>
        <motion.div className=' h-full rounded-l-lg w-1/2'>
          <Slide />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: 'easeInOut', duration: 0.8 }}
          className='w-1/2'
        >
          <h2 className='pl-4 mt-8 text-center font-bold text-3xl py-5 tracking-wide text-indigo-700'>
            <TypeAnimation
              sequence={['', 1000, 'Mot de passe oublie', 1000]}
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
          <form
            onSubmit={
              !successfulCreation ? handleSubmit(create) : handleSubmit(reset)
            }
            className='mt-10 mx-10 p-4'
          >
            {!successfulCreation && !complete && (
              <>
                <label
                  htmlFor='true'
                  className='text-indigo-800 block my-2 text-lg text-center  font-semibold'
                >
                  S'il vous plait entrer votre email
                </label>
                <div className='flex space-x-3'>
                  <input
                    {...register('email')}
                    className='border-b  dark:text-white outline-none bg-transparent w-full text-center border-b-slate-600 text-black text-xl'
                  />
                </div>
                <button className='bg-indigo-700 mt-4  text-white w-full  px-5 py-2 rounded-lg'>
                  Envoyer
                </button>
              </>
            )}
            {successfulCreation && !complete && (
              <>
                <div>
                  <label
                    htmlFor='password'
                    className='text-indigo-800 block my-2 text-lg font-semibold  '
                  >
                    Nouveau mot de passe
                  </label>
                  <input
                    type='password'
                    {...register('password')}
                    className='border-b w-full outline-none bg-transparent dark:bg-transparent border-b-slate-600 text-black text-xl'
                  />
                </div>
                <div>
                  <label
                    htmlFor='true'
                    className='text-indigo-800 block my-2 font-semibold text-lg  '
                  >
                    entrez votre code
                  </label>
                  <input
                    type='text'
                    {...register('code')}
                    className='border-b w-full outline-none bg-transparent  border-b-slate-600 text-black text-xl'
                  />
                </div>
                <button className='bg-indigo-700 mt-4  text-white w-full  px-5 py-2 rounded-lg'>
                  Reinitialiser
                </button>
              </>
            )}
          </form>
          {complete && navigate('/')}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgotCode;
