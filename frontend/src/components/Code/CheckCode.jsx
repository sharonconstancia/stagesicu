import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { useCreateAccountMutation } from '../../redux/Slice/userslice';
import Slide from '../Swiper/Slide';

const CheckCode = ({ username, code: code_user, passowrd, email }) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [createAccount, { isError, isSuccess, isLoading }] =
    useCreateAccountMutation();
  const [code, setCode] = useState('');
  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      const clerkId = completeSignUp.createdUserId;
      
      const res = await createAccount({
        username,
        
        password: passowrd,
        email,
        clerkId
      }).unwrap();

      if (completeSignUp.status !== 'complete') {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <div className='col-[2]'>
      <h2 className='pl-4 mt-8 text-center font-bold text-3xl py-5 tracking-wide text-indigo-700'>
        <TypeAnimation
          sequence={['', 1000, 'Code email', 1000]}
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
      <form onSubmit={onPressVerify} className='mt-10 mx-10 p-4'>
        <label
          htmlFor='true'
          className='text-indigo-800 block my-2 text-lg text-center font-semibold'
        >
          Entrez votre code
        </label>
        <div className='flex space-x-3'>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type='text'
            className='border-b  outline-none bg-transparent text-center border-b-slate-600 text-black text-xl'
          />
        </div>
        <button className='bg-indigo-700 mt-4  text-white w-full  px-5 py-2 rounded-lg'>
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default CheckCode;
