import React, { useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import ListePersonne from './Personne/ListePersonne';
import AjoutPersonne from './Personne/AjoutPersonne';
AjoutPersonne;

const Personne = () => {
  const { id } = useParams();
  const [active, setActive] = useState(true);

  return (
    <>
      <div className='dark:bg-slate-900 w-full h-[100%]  mt-2 px-2'>
        <div className='flex space-x-2'>
          <Link to={`/personne/${id}`}>
            <div onClick={(e) => setActive(active)} className=' w-max'>
              <h3
                className={`text-xl  dark:text-white ${
                  active && 'border-b border-b-black'
                } dark:border-b-white`}
              >
                Liste des personnes
              </h3>
            </div>
          </Link>
          <Link to={`/personne/${id}/ajout`}>
            <div className=' w-max' onClick={(e) => setActive(!active)}>
              <h3
                className={`text-xl  dark:text-white ${
                  !active && 'border-b border-b-black'
                } dark:border-b-white`}
              >
                Ajout des personnes
              </h3>
            </div>
          </Link>
        </div>
        <div className=''>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Personne;
