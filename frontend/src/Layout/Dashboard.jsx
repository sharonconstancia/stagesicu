import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import CardInfo from '../components/Card/Card';
import { useCountBeneficiaireQuery } from '../redux/Slice/beneficiaireslice';
import {useCountEnqueteurQuery} from '../redux/Slice/userslice';
import LineChart from '../Components/Chart/LineChart';
import { lineChartOptions } from '../utils/ChartOptions';
import {useGetlocateurNombreQuery,useGetlocateurQuery} from '../redux/Slice/locateurslice'
import {toast, ToastContainer} from 'react-toastify';
 

//  const lineChartData = [
//   {
//     name: 'Nombres des étudiants qui ont eu la moyenne',
//     data: [10, 15, 12, 174, 14, 12, 10, 15, 12, 174, 141, 123],
//     color: '#87CEEB',
//   },
// ]; 


const Dashboard = () => {

  const {
    data: getlocateur,
  }=useGetlocateurQuery();
  console.log(getlocateur)

 // const date=getlocateur?.map((item)=> (item?.dateentre))
// console.log(date)

  const currentDate = new Date()
  console.log(currentDate)

  const { data:locateur ,isLoading:loadings,isSuccess} = useGetlocateurNombreQuery();
  const nombre =locateur?.nombre
  const nom = locateur?.nom
  console.log(locateur)
  const { data, isLoading } = useCountBeneficiaireQuery();

  const date = getlocateur?.[0]?.dateentre; // Prendre la première date de la liste
  console.log(date);

  const { data:enqueteurs, isLoading:loading } = useCountEnqueteurQuery();

  const [contrat, setContrat] = useState(false)

  
  // useEffect(() => {
  //  const endDate = new Date(date);
  //  endDate.setFullYear(endDate.getFullYear() +7);
 
  //  if (endDate < currentDate ) {
  //    setcontrat(true)
  //  }
  // },[currentDate])

  useEffect(() => {
    if (getlocateur) { // Vérifier si la variable 'date' est définie
      getlocateur.forEach((item) => {
        const endDate = new Date(item.dateentre);

        console.log(endDate)
        endDate.setFullYear(endDate.getFullYear() + 7);
        const currentDate = new Date(); // Obtenez la date actuelle
  
        if (endDate < currentDate) {
          console.log(`Étudiant avec date dépassée : ${item.etudiant.nometudiant}`);
          setContrat(true); // Mettre à jour l'état si la condition est vraie pour au moins une des dates
          toast.info(`Étudiant avec date dépassée : ${item.etudiant.nometudiant}`);
        }
      });
    }
  }, [date]); // Écoutez les changements de 'date'
  
  
  useEffect(() => {
    if (contrat ) {
    }
  },[contrat])
  
  return (
    <>
    {/* <div>
      {contrat? (
        <div>
          <p>votre contrat de location a expiré </p>
        </div>
      ):(
        <p>votre contrat de location est validé</p>
      )
    }
    </div> */}


      <div className='dark:bg-slate-900 w-full h-screen mt-5 px-12'>
        <div className=' mx-4 flex flex-wrap mt-4 '>
          <CardInfo
            title={'Nombre des blocs'}
            number={locateur?.nombreBloc}
            icon='enqueteur'
            
          />
          <CardInfo
            title={'Nombre des chambres'}
            number={locateur?.nombreChambre}
      
            icon='beneficiaire'
          />
          <CardInfo title={'Nombre des locateurs'} number={locateur?.total} icon='enquete' />

          <CardInfo title={'Nombre des demandes'} number={locateur?.nombreInscription} icon='enquete' />
        </div>
        <div
        className='ml-10 hidden md:block w-full mt-10'
      >
        {
          isSuccess && <LineChart options={nom} series={nombre} />
        }
           <ToastContainer />
      </div>
        
      </div>
    </>
  );
};

export default Dashboard;
