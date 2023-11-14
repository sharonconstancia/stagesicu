import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { useCheckcodeMutation } from '../../redux/Slice/etudiantslice'

const VerifierCode = ({ setShowCode, code, setCode }) => {
  const [checkcode, { isError, isLoading, isSuccess }] = useCheckcodeMutation();
  const [numero, setNumero] = useState("")
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (numero === '') return;
    try {
      const res = await checkcode({ numero }).unwrap();
      setShowCode(false);
    } catch (error) {

    }
  };

  return (
    <div className=' col-[2]'>
      <h2 className='pl-4 mt-8 text-center font-bold text-3xl py-5 tracking-wide text-indigo-700'>
        <TypeAnimation
          sequence={['', 1000, 'Verification du numero ', 1000]}
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
      <form onSubmit={handleSubmit} className='mt-10 mx-10 p-4'>
        <div>
          <label
            htmlFor='true'
            className='text-indigo-800 block my-2 text-lg dark:text-white font-semibold'
          >
            Entrez votre code d'identification
          </label>
          <input
            type='text'
            value={numero}
            onChange={(e) =>setNumero(e.target.value)}
            className='border-b w-full dark:text-white outline-none bg-transparent border-b-slate-600 text-black text-xl'
          />
        </div>
        <button className='bg-indigo-700 mt-4  text-white w-full  px-5 py-2 rounded-lg'>
          Verifiez
        </button>
        <p className='text-black text-center dark:text-slate-400 pt-4'>
          Vous avez un compte?{' '}
          <Link to={'/'}>
            <span className='text-blue-500'>Se connecter</span>{' '}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default VerifierCode;
