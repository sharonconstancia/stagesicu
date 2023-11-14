import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import {BiUserCheck} from 'react-icons/bi';
import {BiUserX} from 'react-icons/bi';
import { MdDeleteSweep } from 'react-icons/md';
import { RiDeleteBinFill } from 'react-icons/ri';
import { FcFullTrash } from 'react-icons/fc';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, useAuth } from '@clerk/clerk-react';
import Input from '../../components/Input/Input';
import { PiPlusFill } from 'react-icons/pi';
 import {
  useGetinscriptionQuery,
  useGetOneinscriptionQuery,
} from '../../redux/Slice/inscriptionslice';
import {
    useGetCompteByClerkQuery,
    useGetCompteQuery,
  } from '../../redux/Slice/compteSlice';
import { MoonLoader } from 'react-spinners';
import Message from '../../components/Message/Message';
import Success from '../../components/Success/Success';
import CircleLoader from '../../components/CircleLoader/CircleLoader';
import { container, item } from '../../Utils/Animate';

const Demande = () => {
    const { userId } = useAuth();
    const { data: compte } = useGetCompteByClerkQuery(userId);
    const etudiantID = compte?.etudiant.id
  const {
    data: inscription,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetinscriptionQuery();

  const [selectedId, setSelectedId] = useState(null);
  return (
    <>
      <div className='dark:bg-slate-900 w-full h-screen mt-5 px-12 '>
        <div className=' w-[100%]  grid grid-cols-[4fr,4fr,4fr] mt-7 bg-blue-950 py-2 dark:bg-slate-100 text-slate-200 dark:text-slate-900  rounded-tr-xl rounded-tl-xl px-2 '>
          <p>Nom</p>
          <p>Prenom</p>
          <p>Demande</p>
        </div>
        {inscription?.filter((item)=> item.etudiantId===etudiantID).map((inscription) => (
            <Row
              inscription={inscription}
              key={inscription.id}
              setSelected={setSelectedId}
            />
          ))}
          
      </div>
    </>
  );
};

export default Demande;
function Row({ inscription, setSelected }) {

  return (
    <motion.div
      variants={item}
      className='w-full grid grid-cols-[4fr,4fr,4fr] px-2 py-2 border-b border-b-slate-500 dark:text-white last:border-b-0'
    >
      <p>{inscription.etudiant.nometudiant}</p>
      <p>{inscription.etudiant.prenom}</p>
      <p>{inscription.inscrit ===false ?"en attente":  "accepter" }</p>
      {/* <div>
        <Actions
          id={inscription.id}
          setSelected={setSelected}
          toggleDeleteModal={toggleDeleteModal}
          toggleUpdateModal={toggleUpdateModal}
        />{' '}
      </div> */}
    </motion.div>
  );
}

