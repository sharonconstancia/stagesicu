import React, { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import {BiUserCheck} from 'react-icons/bi';
import {BiUserX} from 'react-icons/bi';

import { MdDeleteSweep } from 'react-icons/md';
import { RiDeleteBinFill } from 'react-icons/ri';

import { FcFullTrash } from 'react-icons/fc';
import Modal from '../components/Modal/Modal';
import { motion, AnimatePresence } from 'framer-motion';

import Input from '../components/Input/Input';

import { PiPlusFill } from 'react-icons/pi';
import {
  useDeleteinscriptionMutation,
  useGetinscriptionQuery,
  useUpdateinscriptionMutation,
  useGetOneinscriptionQuery,
  
} from '../redux/Slice/inscriptionslice';

import { MoonLoader } from 'react-spinners';
import Message from '../components/Message/Message';
import Success from '../components/Success/Success';
import CircleLoader from '../components/CircleLoader/CircleLoader';
import { container, item } from '../Utils/Animate';

const Demande = () => {
  const {
    data: inscription,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetinscriptionQuery();

  
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [updateModal, setUpdateModal] = useState(false);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);
  const [selectedId, setSelectedId] = useState(null);
  const toggleAddModal = () => {
    setAddModal(!addModal);
  };
 
  return (
    <>
      <div className='dark:bg-slate-900 w-full h-screen mt-5 px-12 '>

        <div className=' w-[100%]  grid grid-cols-[2fr,2fr,2fr,2fr,2fr,2fr,2fr,2fr,2fr,2fr,2fr,2fr,2fr] mt-7 bg-blue-950 py-2 dark:bg-slate-100 text-slate-200 dark:text-slate-900  rounded-tr-xl rounded-tl-xl px-2 '>
          <p>Nom</p>
          <p>Prenom</p>
          <p>Père</p>
          <p>Mère</p>
          <p>Date</p>
          <p>Lieux</p>
          <p>Niveau</p>
          <p>Filiere</p>
          <p>Association</p>
          <p>Adresse</p>
          <p>Téléphone</p>
          <p>Acceptation</p>
          <p className='pl-5 mx-auto'>Actions</p>
        </div>
        <motion.div variants={container} initial='hidden' animate='visible'>
          {isLoading && (
            <div className='flex justify-center  items-center mt-[100px]'>
              <MoonLoader color='black' />
            </div>
          )}

          {inscription?.map((inscription) => (
            <Row
              inscription={inscription}
              key={inscription.id}
              toggleDeleteModal={toggleDeleteModal}
              toggleUpdateModal={toggleUpdateModal}
              setSelected={setSelectedId}
            />
          ))}
        </motion.div>
        <AnimatePresence>
          {deleteModal && (
            <DeleteModalComponent
              refetch={refetch}
              toggleDeleteModal={toggleDeleteModal}
              id={selectedId}
            />
          )}
          {updateModal && (
            <UpdateModalComponent
              refetch={refetch}
              toggleUpdateModal={toggleUpdateModal}
               id={selectedId}
            />
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default Demande;
function Row({ inscription, setSelected, toggleDeleteModal, toggleUpdateModal }) {

  return (
    <motion.div
      variants={item}
      className='w-full grid grid-cols-[2fr,2fr,2fr,2fr,2fr,2fr,2fr,2fr,2fr,2fr,2fr,2fr,2fr] px-2 py-2 border-b border-b-slate-500 dark:text-white last:border-b-0'
    >
      <p>{inscription.etudiant.nometudiant}</p>
      <p>{inscription.etudiant.prenom}</p>
      <p>{inscription.pere}</p>
      <p>{inscription.mere}</p>
      <p>{new Date(inscription.date).toLocaleDateString()}</p>
      <p>{inscription.lieux}</p>
      <p>{inscription.etudiant.niveau}</p>
      <p>{inscription.etudiant.parcour}</p>
      <p>{inscription.etudiant.association}</p>
      <p>{inscription.adresse}</p>
      <p>{inscription.etudiant.tel}</p>
      <p>{inscription.inscrit ===false ?"en attente":  "accepter" }</p>
      <div>
        <Actions
          id={inscription.id}
          setSelected={setSelected}
          toggleDeleteModal={toggleDeleteModal}
          toggleUpdateModal={toggleUpdateModal}
        />{' '}
      </div>
    </motion.div>
  );
  function Actions({ id, setSelected, toggleDeleteModal, toggleUpdateModal }) {
    const deleteFunc = () => {
      setSelected(id);
      toggleDeleteModal();
    };
    const updateFunc = () => {
      setSelected(id);
      toggleUpdateModal();
    };
    return (
      <div className='flex justify-center space-x-3 pl-10'>
        <div
          onClick={updateFunc}
          className='bg-green-500 h-10 w-10 flex rounded-full text-white cursor-pointer px-0 py-0 text-2xl text-center items-center  justify-center'
        >
          <BiUserCheck />
        </div>
        <div
          onClick={deleteFunc}
          className='bg-red-500  h-10 w-10  rounded-full flex text-white cursor-pointer px-0 py-0 items-center justify-center'
        >
          <BiUserX />
        </div>
      </div>
    )
  };

}

function UpdateModalComponent({ toggleUpdateModal, refetch, id }) {

  // const { data: inscription, isSuccess: success } = useGetOneinscriptionQuery(id);
  const[inscrit, setInscrit]=useState(true)

  console.log(id)
  const [updateInscription, { isLoading, isError, isSuccess }] =
    useUpdateinscriptionMutation();

    const [show, setShow] = useState(true);
    const formHandler = async (e) => {
    
    e.preventDefault();
    setShow(false);
    
    
      try {
        const res = await updateInscription({
          inscrit,id
          
          
        }).unwrap();
        console.log(inscrit)
        refetch();
      } catch (error) {
        console.log(error);
      }

    
  };
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        toggleUpdateModal();
      }, 2000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (inscrit) {
     
    }
  }, [inscrit]);

  return (
    <Modal options="w-[500px]" closeModal={toggleUpdateModal}>
      {show && (
        <div>
          <h1 className="text-center dark:text-white text-gray-900 text-2xl">
            Voulez-vous accepeter cette demande?
          </h1>
        
        </div>
      )}
      {!show && isLoading ? (
        <Message message="Patientez..." icon={<CircleLoader />} />
      ) : isSuccess ? (
        <Message message="Ajout effectue" icon={<Success />} />
      ) : (
        isError && <Message message="Une erreur s'est produite" icon={""} />
      )}

<div className="w-full flex justify-center mt-20 space-x-6 py-2">
              {/* <Button text="Oui" color="bg-sky-700" />
              <Button
                onClick={toggleUpdateModal}
                text="Non"
                color="bg-red-700"
              /> */}
              
              <button onClick={(e)=>{ formHandler(e)}}  className='flex space-x-2 bg-blue-500 py-5 justify-center text-2xl w-[120px] text-slate-200 px-3 py-2 rounded-full' >Oui</button>
              <button onClick={toggleUpdateModal} className='flex space-x-2  bg-red-500 py-5 justify-center text-2xl w-[120px] text-slate-200 px-3 py-2 rounded-full' >Non</button>
            </div>
    </Modal>
    
  );
}
function DeleteModalComponent({ toggleDeleteModal, refetch, id }) {
  const [deleteRegion, { isLoading, isError, isSuccess }] =
    useDeleteinscriptionMutation();
  const [show, setShow] = useState(true);

  const handleClick = async () => {
    setShow(false);
    try {
      const res = await deleteRegion(id);

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        toggleDeleteModal();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <Modal options="w-[500px] text-white" closeModal={toggleDeleteModal}>
      {show && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-center my-2 text-2xl text-gray-900 dark:text-white">
            Voulez vous vraiment supprimer ?
          </h1>
          <FcFullTrash className="text-[175px]" />
          <div className="btn-container w-full flex justify-center space-x-5">
            <Button
              onClick={handleClick}
              text="Oui supprimer"
              color="bg-rose-500"
            />
            <Button
              onClick={toggleDeleteModal}
              text="Fermer"
              color="bg-sky-500"
            />
          </div>
        </div>
      )}
      {!show && isLoading ? (
        <Message message="Suppression en cours" icon={<CircleLoader />} />
      ) : isSuccess ? (
        <Message message="Suppression réussi" icon={<Success />} />
      ) : (
        isError && <Message message="Une erreur s'est produite" icon={""} />
      )}
    </Modal>
  );
}