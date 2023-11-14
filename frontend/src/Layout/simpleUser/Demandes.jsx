import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";

import { FcFullTrash } from "react-icons/fc";
import Modal from "../../components/Modal/Modal";
import { motion, AnimatePresence } from "framer-motion";

import Input from "../../components/Input/Input";
import Confetti from 'react-confetti';

import { PiPlusFill } from "react-icons/pi";
import {
  useGetinscriptionQuery,
  useGetOneinscriptionQuery,
  useInscriptionMutation,
} from "../../redux/Slice/inscriptionslice";
import {useGetetudiantQuery} from '../../redux/Slice/etudiantslice';

import { MoonLoader } from "react-spinners";
import { useUser, useAuth } from '@clerk/clerk-react';
import Message from "../../components/Message/Message";
import Success from "../../components/Success/Success";
import CircleLoader from "../../components/CircleLoader/CircleLoader";
import { container, item } from "../../Utils/Animate";

import {
  useGetCompteByClerkQuery,
  useGetCompteQuery,
} from '../../redux/Slice/compteSlice';


const Inscription = () => {
  const { userId } = useAuth();
  const { data: compte } = useGetCompteByClerkQuery(userId);
  const etudiantID = compte?.etudiant?.id
  console.log(etudiantID)

  const {data, isLoading: loadingetudiant,refetch}= useGetetudiantQuery();
  const [etudiantId, setetudiantId] = useState('');
  const [date, setdate] = useState("");
  const [lieux, setlieux] = useState("");
  const [pere, setpere] = useState("");
  const [mere, setmere] = useState("");
  const [adresse, setAdresse] = useState("");
  const [createInscription, { isLoading, isError, isSuccess }] = useInscriptionMutation();
  const onChange = (e) => {
    setetudiantId(e.target.value);
  };
    const formHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await createInscription({
          etudiantId:etudiantID,
          date:new Date(date).toISOString(),
          lieux,
          pere,
          mere,
          adresse,
        });
        refetch();
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
     setetudiantId(''),
      setdate(''),
      setlieux(''),
      setmere(''),
      setpere(''),
     setAdresse('')
    }, [isSuccess]);
  return (
    <>
      <div className="container mx-auto h-screen bg-slate-200">
        {
          isSuccess && <Confetti/>
        }
        <div className="w-8/12  py-5 flex items-center bg-slate-200 h-[600px] justify-center  rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className=" w-full mx-4 bg-slate-200">
            <div className=" w-full bg-slate-200">
           
              <form onSubmit={formHandler}>
                <div className="">
                  <div className="grid grid-cols-2 py-5 gap-5 ">
                  
               <select
            // onChange={onChange}
            id=''
            className='border-b w-full outline-none bg-transparent border-b-slate-600 dark-text-white '
            >
              <option>Nom</option>
              {data && 
                data?.filter((item)=> item.id===etudiantID).map((etudiant)=>(
                  <option key={etudiant.id} value={etudiant.id}>
                    {etudiant.nometudiant}
                  </option>
                ))
              
              }
               </select>
                
               <select
            onChange={onChange}
            id=''
            className='border-b w-full outline-none bg-transparent border-b-slate-600 dark-text-white '
            >
              <option>Prenom</option>
              {data && 
                data?.filter((item)=> item.id===etudiantID).map((etudiant)=>(
                  <option key={etudiant.id} value={etudiant.id}>
                    {etudiant.prenom}
                  </option>
                ))
              
              }
               </select>
                  </div>
                  <div className="grid grid-cols-2 py-8 gap-5">
                    <input
                     className="border bg-slate-200 border-gray-400 py-1 px-2"
                     placeholder="date de naissance"
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setdate(e.target.value)}
                    />
                    <input
                     className="border bg-slate-200 border-gray-400 py-1 px-2"
                     placeholder="lieux de naissance"
                      type="text"
                      id="lieux"
                      value={lieux}
                      onChange={(e) => setlieux(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <input
                     className="border bg-slate-200 border-gray-400 py-1 px-2"
                     placeholder="Père"
                      type="text"
                      id="pere"
                      value={pere}
                      onChange={(e) => setpere(e.target.value)}
                    />
                    <input
                     className="border bg-slate-200 border-gray-400 py-1 px-2"
                     placeholder="mère"
                      type="text"
                      id="mere"
                      value={mere}
                      onChange={(e) => setmere(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="grid grid-cols-2 gap-5">
               
                  <select
            onChange={onChange}
            id=''
            className='border-b w-full outline-none bg-transparent border-b-slate-600 dark-text-white '
            >
              <option>Filière</option>
              {data && 
                data?.filter((item)=> item.id===etudiantID).map((etudiant)=>(
                  <option key={etudiant.id} value={etudiant.id}>
                    {etudiant.parcour}
                  </option>
                ))
              
              }
               </select>
                
               <select
            onChange={onChange}
            id=''
            className='border-b w-full outline-none bg-transparent border-b-slate-600 dark-text-white '
            >
              <option>Niveau</option>
              {data && 
                data?.filter((item)=> item.id===etudiantID).map((etudiant)=>(
                  <option key={etudiant.id} value={etudiant.id}>
                    {etudiant.niveau}
                  </option>
                ))
              
              }
               </select>
                  </div>
              
                    <div className="mt-5">
             
                    <select
            onChange={onChange}
            id=''
            className='border-b w-full outline-none bg-transparent border-b-slate-600 dark-text-white '
            >
              <option>Association</option>
              {data && 
                data?.filter((item)=> item.id===etudiantID).map((etudiant)=>(
                  <option key={etudiant.id} value={etudiant.id}>
                    {etudiant.association}
                  </option>
                ))
              
              }
               </select>

                  </div>
                  <div className="grid grid-cols-2 py-5 gap-5">
              
                    <input
                     className="border  bg-slate-200 border-gray-400 py-1 px-2"
                     placeholder="adresse"
                      type="text"
                      id="adresse"
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)}
                    />
                  </div>

                  <div className="mt-5">
             
                  <select
            onChange={onChange}
            id=''
            className='border-b w-full outline-none bg-transparent border-b-slate-600 dark-text-white '
            >
              <option>Téléphone</option>
              {data && 
                data?.filter((item)=> item.id===etudiantID).map((etudiant)=>(
                  <option key={etudiant.id} value={etudiant.id}>
                    {etudiant.tel}
                  </option>
                ))
              
              }
               </select>
               
                  </div>
                </div>
                <div className="flex justify-center mt-4">

                <button
                  type="submit"
                  
                  className="border-2 border-white bg-blue-500 text-white  rounded-full px-12 py-2"
                >
                   {isLoading ? "Ajout en cours...":"Ajouter Inscription"} 
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inscription;
