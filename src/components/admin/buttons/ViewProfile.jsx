import { initFlowbite } from 'flowbite';
import React, { useEffect } from 'react'
import ProfileCard from '../../profiles/ProfileCard';

function ViewProfile({user}) {


    useEffect(()=> {
        initFlowbite();
    })




  return (
    <>
      <button
        data-modal-target="extralarge-modal"
        data-modal-toggle="extralarge-modal"
        type="button"
        className="font-medium text-[#273B4A] dark:text-blue-500 hover:underline ml-5"
      >
        View profile
      </button>

      {/* ----------------------------------------------------------------------------------------------------------------------- */}

      
    </>
  );
}

export default ViewProfile