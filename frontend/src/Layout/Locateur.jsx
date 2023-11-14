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
  useDeletelocateurMutation,
  useGetLocateurSortieQuery,
  useGetlocateurQuery,
  useUpdatelocateurMutation,
  useGetOnelocateurQuery,
  useLocateurMutation,
} from '../redux/Slice/locateurslice';
import { useGetinscriptionQuery } from '../redux/Slice/inscriptionslice';
import {
  useGetchambreQuery
} from '../redux/Slice/chambreslice';
import {useGetetudiantQuery} from '../redux/Slice/etudiantslice';

import { MoonLoader } from 'react-spinners';

import Message from '../components/Message/Message';
import Success from '../components/Success/Success';
import CircleLoader from '../components/CircleLoader/CircleLoader';
import { container, item } from '../Utils/Animate';

const Locateur = () => { 
  const {
    data: locateurSortie,
  }=useGetLocateurSortieQuery();
  console.log(locateurSortie)
  const {
    data: locateur,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetlocateurQuery();

  // const date = locateur?.[1]?.dateentre; // Prendre la première date de la liste
  const date = locateur?.map((item)=>item.dateentre)
  console.log(date);

  const [searchTerm, setSearchTerm] = useState(""); 
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [updateModal, setUpdateModal] = useState(false);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);
  const [selectedId, setSelectedId] = useState(null);
  const toggleAddModal = () => {
    setAddModal(!addModal);
  };

  const [contrat, setContrat] = useState(false)
  const currentDate = new Date()
  console.log(currentDate)
  
  useEffect(() => {
    if (locateur) { // Vérifier si la variable 'date' est définie
      locateur.forEach((item) => {
        const endDate = new Date(item.dateentre);

        console.log(endDate)
        endDate.setFullYear(endDate.getFullYear() + 7);
        const currentDate = new Date(); // Obtenez la date actuelle
  
        if (endDate < currentDate) {
          console.log(`Étudiant avec date dépassée : ${item.etudiant.nometudiant}`);
          setContrat(true); // Mettre à jour l'état si la condition est vraie pour au moins une des dates
        }
      });
    }
  }, [date]); // Écoutez les changements de 'date'
  
  return (
    <>
      <div className='dark:bg-slate-900 w-full h-screen mt-5 px-12 '>
        <div className='flex justify-between py-2'>
          <button
            className='  bg-blue-500 w-[100px]  text-white px-3 py-2 rounded-full'
            onClick={toggleAddModal}
          >
            Ajout
          </button>
          <div className="border border-slate-400 hidden md:block md: rounded-md dark:border-slate-500 w-60 rounted flex">
          <input
            type="text"
            placeholder="Rechercher par nom..."
            className=" outline-none bg-transparent w-full text-black dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      
       
          </div>
        </div>
        <div className='w-full grid grid-cols-6 mt-6 bg-blue-950 py-2 dark:bg-slate-100 text-slate-200 dark:text-slate-900  rounded-tr-xl rounded-tl-xl px-2 '>
           <p>Nom porte</p>
           <p>Nom de l'etudiant</p>
          <p>Date entrer</p>
          <p>Date Sortie</p>
          <p>Observation</p>
        
          
          <p className='pl-5 mx-auto'>Actions</p>
        </div>
        <motion.div variants={container} initial='hidden' animate='visible'>
          {isLoading && (
            <div className='flex justify-center  items-center mt-[100px]'>
              <MoonLoader color='black' />
            </div>
          )}

          {locateur?.filter((locateur) => locateur.etudiant.nometudiant.toLowerCase().includes(searchTerm.toLowerCase())).map((locateur) => (
  



            <Row
              locateur={locateur}
              key={locateur.id}
              toggleDeleteModal={toggleDeleteModal}
              toggleUpdateModal={toggleUpdateModal}
              setSelected={setSelectedId}
              contrat={contrat}
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

export default Locateur;
function Row({ locateur, setSelected, toggleDeleteModal, toggleUpdateModal,contrat }) {
  return (
    <motion.div
      variants={item}
      className='w-full grid grid-cols-6 px-2 py-2 border-b border-b-slate-500 dark:text-white last:border-b-0'
    >
      
      <p>{locateur.chambre.nom}</p>
      <p>{locateur.etudiant.nometudiant}</p>
      <p>{new Date(locateur.dateentre).toLocaleDateString()}</p>
      <p>{new Date(locateur.datesortie).toLocaleDateString()}</p>
      <p>{locateur.observation}</p>
       
    


      <div>
        <Actions
          id={locateur.id}
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
  const {data:chambre, isLoading: loadingchambre}= useGetchambreQuery();
  const {data, isLoading: loadingetudiant}= useGetinscriptionQuery();
  const [chambreId, setchambreId] = useState('');
  const [etudiantId , setetudiantId] = useState ('');
  const [dateentre, setdateentre] = useState('');
  const [datesortie, setdatesortie] = useState('');
  const [observation, setobservation] = useState('');
  const [createLocateur, { isLoading, isError, isSuccess }] = useLocateurMutation();
  const [show, setShow] = useState(true);

  const onChangeChambre = (e) => {
    setchambreId(e.target.value);
  };
  const onChange = (e) => {
    setetudiantId(e.target.value);
  };
 
  console.log(chambreId)
  const formHandler = async (e) => {
    e.preventDefault();
    setShow(false);
    try {
      const res = await createLocateur({
        chambreId,
        etudiantId,
        dateentre: new Date(dateentre).toISOString(),
        datesortie: new Date(datesortie).toISOString(),
        observation,
      });
      refetch();
    }catch (err)
    {
      
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

               <select
            onChange={onChangeChambre}
            id=''
            className='border-b w-full outline-none bg-transparent border-b-slate-600 dark-text-white '
            >
              <option>choisir chambre</option>
              {chambre && 
                chambre.map((chambre)=>(
                  <option key={chambre.id} value={chambre.id}>
                    {chambre.nom}
                  </option>
                ))
              
              }
               </select>

               <select
            onChange={onChange}
            id=''
            className='border-b w-full outline-none bg-transparent border-b-slate-600 dark-text-white '
            >
              <option>choisir etudiant</option>
              {data && 
                data.filter((item)=>item.inscrit).map((item)=>(
                  <option key={item.etudiantId} value={item.etudiantId}>
                    {item.etudiant.nometudiant}
                  </option>
                ))
              
              }
               </select>
            <Input
              label='Date entre'
              type='date'
              value={dateentre}
              setValue={setdateentre}
            />
            <Input
              label='Date sortie'
              type='date'
              value={datesortie}
              setValue={setdatesortie}
            />
               <Input
              label='Observation'
              type='text'
              value={observation}
              setValue={setobservation}
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
  
   const [dateentre, setdateentre] = useState('');
   const [datesortie, setdatesortie] = useState('');
   const [observation, setobservation] = useState('');
   const { data: locateur, isSuccess: success } = useGetOnelocateurQuery(id);
   console.log(locateur)
   const formaDate = (date) => {
    const tab = date.split("/");
    return  `${tab[2]}-${tab[1]}-${tab[0]}`
  }

   useEffect(() => {
     if (success) {
     
       setdateentre(formaDate(new Date(locateur?.dateentre).toLocaleDateString()));
       setdatesortie(formaDate(new Date(locateur?.datesortie).toLocaleDateString()));
      
       setobservation(locateur?.observation);
     }
   }, [success]);
   console.log(dateentre)
   console.log(datesortie)

  const [updateLocateur, { isLoading, isError, isSuccess }] =
    useUpdatelocateurMutation();
  const [show, setShow] = useState(true);
  const formHandler = async (e) => {
    e.preventDefault();
    setShow(false);
    try {
      const res = await updateLocateur({ dateentre:new Date(dateentre).toISOString(),datesortie:new Date(datesortie).toISOString(),observation, id }).unwrap();
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
            Modifier l'information
          </h1>
          <form onSubmit={formHandler}>
        

            <Input
              label='Date entrer'
              type='date'
              value={dateentre}
              setValue={setdateentre}
            />
            <Input
              label='Date sortie'
              type='date'
              value={datesortie}
              setValue={setdatesortie}
            />
               <Input
              label='Observation'
              type='text'
              value={observation}
              setValue={setobservation}
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
  const [deleteLocateur, { isLoading, isError, isSuccess }] =
    useDeletelocateurMutation();
  const [show, setShow] = useState(true);

  const handleClick = async () => {
    setShow(false);
    try {
      const res = await deleteLocateur(id);

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
