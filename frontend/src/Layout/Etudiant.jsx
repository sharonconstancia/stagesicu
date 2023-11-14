import React, { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';
import { RiDeleteBinFill } from 'react-icons/ri';

import { FcFullTrash } from 'react-icons/fc';
import Modal from '../components/Modal/Modal';
import { motion, AnimatePresence } from 'framer-motion';

import Input from '../components/Input/Input';

import { PiPlusFill } from 'react-icons/pi';
import {
  useDeleteetudiantMutation,
  useGetetudiantQuery,
  useUpdateetudiantMutation,
  useGetOneetudiantQuery,
  useEtudiantMutation,
} from '../redux/Slice/etudiantslice';

import { MoonLoader } from 'react-spinners';

import Message from '../components/Message/Message';
import Success from '../components/Success/Success';
import CircleLoader from '../components/CircleLoader/CircleLoader';
import { container, item } from '../Utils/Animate';

const Etudiant = () => {
  const {
    data: etudiant,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetetudiantQuery();
  console.log(etudiant)

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
        <div className='flex justify-end py-2'>
          <button
            className='  bg-indigo-500 w-[100px]  text-white px-3 py-2 rounded-full'
            onClick={toggleAddModal}
          >
            Ajout
          </button>
        </div>
        <div className='w-full grid grid-cols-9 mt-9 bg-blue-950 py-2 dark:bg-slate-100 text-slate-200 dark:text-slate-900  rounded-tr-xl rounded-tl-xl px-2 '>
          
          <p>Nom </p>
          <p>Prenom</p>
          <p>numero</p>
          <p>niveau</p>
          <p>parcour</p>
          <p>téléphone</p>
          <p>association</p>
          <p>date d'inscription</p>
          <p className='pl-5 mx-auto'>Actions</p>
        </div>
        <motion.div variants={container} initial='hidden' animate='visible'>
          {isLoading && (
            <div className='flex justify-center  items-center mt-[100px]'>
              <MoonLoader color='black' />
            </div>
          )}

          {etudiant?.map((etudiant) => (
            <Row
              etudiant={etudiant}
              key={etudiant.id}
              toggleDeleteModal={toggleDeleteModal}
              toggleUpdateModal={toggleUpdateModal}
              setSelected={setSelectedId}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {addModal && (
            <AddModalComponent
              refetch={refetch}
              toggleAddModal={toggleAddModal}
            />
          )}
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

export default Etudiant;
function Row({ etudiant, setSelected, toggleDeleteModal, toggleUpdateModal }) {
  return (
    <motion.div
      variants={item}
      className='w-full grid grid-cols-9 px-2 py-2 border-b border-b-slate-500 dark:text-white last:border-b-0'
    >
  
      <p>{etudiant.nometudiant}</p>
      <p>{etudiant.prenom}</p>
      <p>{etudiant.numero}</p>
      <p>{etudiant.niveau}</p>
      <p>{etudiant.parcour}</p>
      <p>{etudiant.tel}</p>
      <p>{etudiant.association}</p>
      <p>{etudiant.dateinscription}</p>

      <div>
        <Actions
          id={etudiant.id}
          setSelected={setSelected}
          toggleDeleteModal={toggleDeleteModal}
          toggleUpdateModal={toggleUpdateModal}
        />{' '}
      </div>
    </motion.div>
  );
}
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
        <FiEdit />
      </div>
      <div
        onClick={deleteFunc}
        className='bg-red-500  h-10 w-10  rounded-full flex text-white cursor-pointer px-0 py-0 items-center justify-center'
      >
        <RiDeleteBinFill />
      </div>
    </div>
  );
}
function AddModalComponent({ toggleAddModal, refetch }) {
  const [numero, setnumero] = useState('');
  const [nometudiant, setnometudiant] = useState('');
  const [prenom, setprenom] = useState('');
  const [niveau, setniveau] = useState('');
  const [parcour, setparcour] = useState('');
  const [tel, settel] = useState('');
  const [association, setassociation] = useState('');
  const [dateinscription, setdateinscription] = useState('');
  const [createEtudiant, { isLoading, isError, isSuccess }] = useEtudiantMutation();
  const [show, setShow] = useState(true);
  const formHandler = async (e) => {
    e.preventDefault();
    setShow(false);
    try {
      const res = await createEtudiant({
        nometudiant,
        prenom,
        numero,
        niveau,
        parcour,
        tel:parseInt(tel, 10),
        association,
        dateinscription:new Date(dateinscription).toISOString()
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        toggleAddModal();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <Modal options='w-[500px]' closeModal={toggleAddModal}>
      {show && (
        <div>
          <form onSubmit={formHandler}>
            <Input
              label='nom'
              type='text'
              id='code'
              value={nometudiant}
              setValue={setnometudiant}
            />
            <Input
              label='prenom'
              type='text'
              value={prenom}
              setValue={setprenom}
            />
            <Input
              label='Numero'
              type='text'
              value={numero}
              setValue={setnumero}
            />
            <Input
              label='niveau'
              type='text'
              value={niveau}
              setValue={setniveau}
            />
            <Input
              label='parcour'
              type='text'
              value={parcour}
              setValue={setparcour}
            />
            <Input
              label='téléphone'
              type='number'
              value={tel}
              setValue={settel}
            />
            <Input
              label='association'
              type='text'
              value={association}
              setValue={setassociation}
            />
            <Input
              label='dateinscription'
              type='date'
              value={dateinscription}
              setValue={setdateinscription}
            />
            {/* button */}
            <div className='w-full flex justify-center space-x-6 py-2'>
              <Button text='Ajouter' color='bg-sky-700' />
              <Button
                onClick={toggleAddModal}
                text='Annuler'
                color='bg-red-700'
              />
            </div>
          </form>
        </div>
      )}
      {!show && isLoading ? (
        <Message message='Patientez...' icon={<CircleLoader />} />
      ) : isSuccess ? (
        <Message message='Ajout effectue' icon={<Success />} />
      ) : (
        isError && <Message message="Une erreur s'est produite" icon={''} />
      )}
    </Modal>
  );
}
function UpdateModalComponent({ toggleUpdateModal, refetch, id }) {
   const [nometudiant, setnometudiant] = useState('');
   const [prenom, setprenom] = useState('');
   const [numero, setnumero] = useState('');
   const [niveau, setniveau] = useState('');
   const [parcour, setparcour] = useState('');
   const [tel, settel] = useState('');
   const [association, setassociation] = useState('');
   const [dateinscription, setdateinscription] = useState('');

   const { data: createEtudiant, isSuccess: success } = useGetOneetudiantQuery(id);

   useEffect(() => {
     if (success) {
       setnometudiant(Etudiant?.nometudiant);
       setprenom(Etudiant?.prenom);
       setnumero(Etudiant?.numero);
       setniveau(Etudiant?.niveau);
       setparcour(Etudiant?.parcour);
       settel(Etudiant?.tel);
       setassociation(Etudiant?.association);
       setdateinscription(Etudiant?.dateinscription);
     }
   }, [success]);

  const [updateEtudiant, { isLoading, isError, isSuccess }] =
    useUpdateetudiantMutation();
 
 
  const [show, setShow] = useState(true);
  const formHandler = async (e) => {
    e.preventDefault();
    setShow(false);
    try {
      const res = await updateEtudiant({ nometudiant,
        prenom,
        numero,
        niveau,
        parcour,
        tel :parseInt(tel, 10),
        association,
        dateinscription:new Date(dateinscription).toISOString(),
         id });
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

  return (
    <Modal options='w-[500px]' closeModal={toggleUpdateModal}>
      {show && (
        <div>
          <h1 className='text-center dark:text-white text-gray-900 text-2xl'>
            ModifierEtudiant
          </h1>
          <form onSubmit={formHandler}>
            <Input
              label='Nom'
              type='text'
              id='code'
              value={nometudiant}
              setValue={setnometudiant}
            />
            <Input
              label='prenom'
              type='text'
              value={prenom}
              setValue={setprenom}
            />
            <Input
              label='Numero'
              type='text'
              value={numero}
              setValue={setnumero}
            />
            <Input
              label='niveau'
              type='text'
              value={niveau}
              setValue={setniveau}
            />
            <Input
              label='Parcour'
              type='text'
              value={parcour}
              setValue={setparcour}
            />
            <Input
              label='Téléphone'
              type='number'
              value={tel}
              setValue={settel}
            />
             <Input
              label='Association'
              type='text'
              value={association}
              setValue={setassociation}
            />
             <Input
              label='Date inscription'
              type='date'
              value={dateinscription}
              setValue={setdateinscription}
            />

            {/* button */}
            <div className='w-full flex justify-center space-x-6 py-2'>
              <Button text='Modifier' color='bg-sky-700' />
              <Button
                onClick={toggleUpdateModal}
                text='Annuler'
                color='bg-red-700'
              />
            </div>
          </form>
        </div>
      )}
      {!show && isLoading ? (
        <Message message='Patientez...' icon={<CircleLoader />} />
      ) : isSuccess ? (
        <Message message='Ajout effectue' icon={<Success />} />
      ) : (
        isError && <Message message="Une erreur s'est produite" icon={''} />
      )}
    </Modal>
  );
}
function DeleteModalComponent({ toggleDeleteModal, refetch, id }) {
  const [deleteEtudiant, { isLoading, isError, isSuccess }] =
    useDeleteetudiantMutation();
  const [show, setShow] = useState(true);

  const handleClick = async () => {
    setShow(false);
    try {
      const res = await deleteEtudiant(id);

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
    <Modal options='w-[500px] text-white' closeModal={toggleDeleteModal}>
      {show && (
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <h1 className='text-center my-2 text-2xl text-gray-900 dark:text-white'>
            Voulez vous vraiment supprimer ?
          </h1>
          <FcFullTrash className='text-[175px]' />
          <div className='btn-container w-full flex justify-center space-x-5'>
            <Button
              onClick={handleClick}
              text='Oui supprimer'
              color='bg-rose-500'
            />
            <Button
              onClick={toggleDeleteModal}
              text='Fermer'
              color='bg-sky-500'
            />
          </div>
        </div>
      )}
      {!show && isLoading ? (
        <Message message='Suppression en cours' icon={<CircleLoader />} />
      ) : isSuccess ? (
        <Message message='Suppression réussi' icon={<Success />} />
      ) : (
        isError && <Message message="Une erreur s'est produite" icon={''} />
      )}
    </Modal>
  );
}
