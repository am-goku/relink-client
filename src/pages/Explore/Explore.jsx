import React from 'react'
import ExploreSearchBar from '../../components/search/ExploreSearchBar'
import AllPosts from '../../components/explore/AllPosts';

function Explore() {
  
  return (
    <>
      <div className='w-screen h-full p-7 flex flex-col gap-5'>
        <ExploreSearchBar />

        <AllPosts />
        
      </div>
    </>
  );
}

export default Explore