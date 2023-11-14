import React from "react";

function Accueil() {
  return (
 
        
      <div className="mt-20 h-screen">
        <h1 className="text-center text-3xl font-bold my-4 dark:text-white">REGLEMENT INTERIEUR</h1>


       <div className="grid grid-cols-3">

        <div className=" w-full lg:pr-3 ">

          <div className="bg-slate-300 rounded-xl p-6 border ">
            <h2 className="text-2xl font-bold mb-2">1 Article:</h2>
            <div className="text-gray-800 leading-relaxed  h-[100px]">
              L'admission comme la réadmission aux cités Universitaire n'est pas
              automatique
            </div>
          </div>
        </div>
      
        <div className=" w-full lg:pr-3  ">
          <div className="bg-slate-300 rounded-xl p-6 border-blue-500 border-3">
            <h2 className="text-2xl font-bold mb-2">2 Article:</h2>
            <div className="text-gray-800 leading-relaxed  h-[100px]">
              L'attribution de logement, la permutation ou la cession d'une chambre à un autre étudiant ne peut se faire 
              que par biais des responsable S.I.C.U
          </div>
        </div>
      </div>
      
        <div className=" w-full lg:pr-3">
          <div className="bg-slate-300 rounded-xl p-6 border-blue-500 border-3">
            <h2 className="text-2xl font-bold mb-2">3 Article:</h2>
            <div className=" h-[100px]">
            Le bricolage des installations de la JIRAMA est sévèrement sanctionné
            </div>
          </div>
        </div>

        </div>
        <div className="mt-5 grid grid-cols-3">

        <div className=" w-full lg:pr-3">
          <div className="bg-slate-300 rounded-xl p-6 border-blue-500 border-3">
            <h2 className="text-2xl font-bold mb-2">4 Article:</h2>
            <div className="h-[100px]">
          La chambre attribuée et le matériel à la disposition d'étudiant ne sont pas des biens personnels, donc non cessibles
            </div>
          </div>
        </div>


        <div className=" w-full lg:pr-3">
          <div className="bg-slate-300 rounded-xl p-6 border-blue-500 border-3">
            <h2 className="text-2xl font-bold mb-2">5 Article:</h2>
            <div className="h-[100px]">
            Le non respect des délèlegues de bloc et/ou les réglements intérieur du bloc doivent etre sanctionné suivant 
            la décision commune des responsables du S.I.C.U et les membre du bloc
            </div>
          </div>
        </div>


        <div className=" w-full lg:pr-3">
          <div className="bg-slate-300 rounded-xl p-6 border-blue-500 border-3">
            <h2 className="text-2xl font-bold mb-2">6 Article:</h2>
            <div className="h-[100px]">
            Le séjour à l'université est fixé à 7ans.Tout étudiant ayant dépassé cette limite n'a plus le droit à un logement
            </div>
          </div>
        </div>
        </div>
        </div>
    
  );
}

export default Accueil;
