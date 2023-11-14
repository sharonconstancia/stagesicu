import React from 'react';
import {
  FcReading,
  FcBusinessman,
  FcConferenceCall,
  FcTodoList,
  FcViewDetails,
  FcCustomerSupport,
  FcBusinesswoman,
  FcHome,
  FcDepartment,
} from 'react-icons/fc';


export default function CardInfo({ title, number, icon }) {
  return (
    <div className=' w-[250px] h-[100px]  dark:bg-slate-900 dark:text-white shadow-lg shadow-blue-500/50  bg-slate-100 rounded flex flex-row items-center mr-2 mb-2'>
      {icon === 'enqueteur' && <FcDepartment size={'75px'} />}
      {icon === 'beneficiaire' && <FcHome size={'75px'} />}
      {icon === 'enquete' && <FcConferenceCall size={'75px'} />}

      <div>
        <p>{title}</p>
        <p className=' text-4xl font-bold'>{number}</p>
      </div>
    </div>
  );
}
