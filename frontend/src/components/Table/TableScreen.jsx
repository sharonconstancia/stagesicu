import React from 'react';

import Button from '../Components/Button/Button';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Modal from '../Components/Modal/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Input from '../Components/Input/Input';


const etudiants = [
  {
    id: 'E045',
    fullname: 'Fuljosh',
    birth: '2026-03-12T18:56:12.000Z',
    moyenne: 12,
  },
  {
    id: 'E044',
    fullname: 'Ful',
    birth: '2026-03-12T18:56:12.000Z',
    moyenne: 12,
  },
  {
    id: 'E047',
    fullname: 'Hasina',
    birth: '2026-03-12T18:56:12.000Z',
    moyenne: 15,
  },
  {
    id: 'E049',
    fullname: 'Letoto',
    birth: '2026-03-12T18:56:12.000Z',
    moyenne: 12,
  },
  {
    id: 'E050',
    fullname: 'Tahina',
    birth: '2026-03-12T18:56:12.000Z',
    moyenne: 10,
  },
];

const TableScreen = () => {
  const [addModal, setAddModal] = useState(false);
  const toggleAddModal = () => {
    setAddModal(!addModal);
  };
  return (
    <div className='bg-slate-100 w-full h-screen px-12'>
      <h1 className='text-center text-2xl py-5 font-bold'>Crud React</h1>
      <div className='flex justify-end'>
        <Button 
         onClick={toggleAddModal}
          text='Ajout etudiant'
          color='bg-slate-950'
        />
      </div>
      <div className='w-full grid grid-cols-5 mt-5 bg-slate-950 py-2 text-white rounded-tr-xl rounded-tl-xl px-2 '>
        <p>Id</p>
        <p>FullName</p>
        <p>Birth</p>
        <p>Moyenne</p>

        <p className='pl-5 mx-auto' >Actions</p>
      </div>
      <div>
        {etudiants.map((etudiant) => (
          <Row etudiant={etudiant} key={etudiant.id} />
        ))}
      </div>
      <AnimatePresence>{addModal && <AddModalComponent toggleAddModal={toggleAddModal} />}</AnimatePresence>
    </div>
  );
};

export default TableScreen;
function Row({ etudiant }) {
  return (
    <div className='w-full grid grid-cols-5 px-2 py-2 border-b border-b-slate-500 last:border-b-0'>
      <p>{etudiant.id}</p>
      <p>{etudiant.fullname}</p>
      <p>{new Date(etudiant.birth).toLocaleDateString()}</p>
      <p>{etudiant.moyenne}</p>
      <p>
        {' '}
        <Actions id={etudiant.id} />{' '}
      </p>
    </div>
  );
}
function Actions({ id }) {
  return (
    <div className='flex justify-center space-x-3'>
      <span>
        <Button
          icon={AiOutlineEdit}
          color='bg-green-500 px-0 py-0 w-10 h-10 flex items-center justify-center text-2xl'
        />
      </span>
      <span>
        <Button
          icon={AiOutlineDelete}
          color='bg-red-500 px-0 py-0 w-10 h-10 flex items-center justify-center text-2xl'
        />
      </span>
    </div>
  );
}
function AddModalComponent({toggleAddModal}) {
    const [fullname, setFullname]= useState('')
    const[birth, setBirth]= useState('')
    const [moyenne, setMoyenne]= useState(0)
  return (
    <Modal options='w-[500px]' closeModal={toggleAddModal}>
      <h1 className='text-center text-white text-2xl'>Ajout X</h1>
      <form>
        <Input
          label='Nom'
          type='text'
          id='Nom'
          value={fullname}
          setValue={setFullname}
        />
        <Input
          label='Date de naissance'
          type='date'
          id='Birth'
          value={birth}
          setValue={setBirth}
        />
        <Input
          label='Moyenne'
          type='text'
          id='Moyenne'
          value={moyenne}
          setValue={setMoyenne}
        />
        {/* button */}
        <div className='w-full flex justify-center space-x-6 py-2'>
          <Button text='Ajouter' color='bg-sky-700' />
          <Button onClick={toggleAddModal} text='Annuler' color='bg-red-700' />
        </div>
      </form>
    </Modal>
  );
}
