import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import VerifierCode from '../Code/VerifierCode';
import CheckCode from '../Code/CheckCode';
import Slide from '../Swiper/Slide';
import { useForm } from 'react-hook-form';
import { useSignUp } from '@clerk/clerk-react';
const Register = () => {
  const [pendingVerification, setPendingVerification] = useState(false);

  const [showCode, setShowCode] = useState(true);
  const [code, setCode] = useState('');
  const { isLoaded, signUp, setActive } = useSignUp();
  const { register, handleSubmit, getValues } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    if (!isLoaded) {
      // Handle loading state
      return null;
    }
    if (data.password !== data.confirmPassword) {
   
      return;
    } else {
      try {
        await signUp.create({
          emailAddress: data.email,
          password: data.password,
          username: data.username,
        });

        // send the email.
        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });

        // change the UI to our pending section.
        setPendingVerification(true);
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
    }
  };

  return (
    <>
      <motion.div className=' flex justify-center items-center space-x-1 h-screen  '>
        <div className='grid md:grid-cols-[400px,1fr] grid-cols-[2px,1fr] border rounded-lg bg-transparent h-[500px] shadow-lg shadow-indigo-600'>
          <motion.div className=' h-full rounded-l-lg col-[1] md:block hidden'>
            <Slide />
          </motion.div>
          {!pendingVerification && (
            <>
              {showCode && (
                <VerifierCode
                  setShowCode={setShowCode}
                  code={code}
                  setCode={setCode}
                />
              )}
              {!showCode && (
                <motion.div
                  initial={{ opacity: 0, y: -500 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, ease: 'easeInOut', duration: 0.8 }}
                  className=' col-[2]'
                >
                  <h2 className='text-center font-bold text-4xl  tracking-wide text-indigo-700'>
                    <TypeAnimation
                      sequence={['', 1000, 'Creez un compte ', 1000]}
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
                    onSubmit={handleSubmit(onSubmit)}
                    className='mt-10 mx-10 p-4'
                  >
                    <div>
                      <label
                        htmlFor='true'
                        className='text-indigo-800 block my-2 text-lg font-semibold dark:text-white'
                      >
                        Pseudo
                      </label>
                      <input
                        {...register('username')}
                        type='text'
                        className='border-b dark:text-white w-full outline-none bg-transparent border-b-slate-600 text-black text-xl'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='true'
                        className='text-indigo-800 block my-2 text-lg dark:text-white font-semibold'
                      >
                        Email
                      </label>
                      <input
                        {...register('email', { required: true })}
                        type='email'
                        className='border-b dark:text-white w-full outline-none bg-transparent border-b-slate-600 text-black text-xl'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='password'
                        className='text-indigo-800 block my-2 dark:text-white font-semibold text-lg'
                      >
                        Mot de passe
                      </label>
                      <input
                        {...register('password', { required: true })}
                        type='password'
                        className='border-b dark:text-white w-full outline-none bg-transparent border-b-slate-600 text-black text-xl'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='password'
                        className='text-indigo-800 block my-2 dark:text-white font-semibold text-lg'
                      >
                        Confirmez votre mot de passe
                      </label>
                      <input
                        {...register('confirmPassword', { required: true })}
                        type='password'
                        className='border-b dark:text-white w-full outline-none bg-transparent border-b-slate-600 text-black text-xl'
                      />
                    </div>

                    <button className='bg-indigo-700 mt-4  text-white w-full  px-5 py-2 rounded-lg'>
                      Creer
                    </button>
                  </form>
                  <p className='text-black text-center dark:text-slate-400'>
                    Vous avez un compte?{' '}
                    <Link to={'/'}>
                      <span className='text-indigo-900'>Se connecter</span>{' '}
                    </Link>
                  </p>
                </motion.div>
              )}
            </>
          )}
          {pendingVerification && (
            <CheckCode
              code={code}
              email={getValues('email')}
              passowrd={getValues('password')}
              username={getValues('username')}
            />
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Register;
