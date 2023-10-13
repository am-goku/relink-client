import React, { useEffect } from 'react'
import NavBar from '../../components/layout/NavBar'
import ExploreSearchBar from '../../components/search/ExploreSearchBar'
import { initFlowbite, Modal } from 'flowbite'

function Explore() {
  
  return (
    <>
      <div className='w-screen h-full p-7'>
        <ExploreSearchBar />

        
      </div>
    </>
  );
}

export default Explore