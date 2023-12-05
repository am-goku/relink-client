import React, { useState } from 'react'
import ExploreSearchBar from '../../components/search/ExploreSearchBar'
import AllPosts from '../../components/explore/AllPosts';
import SearchResult from '../../components/search/SearchResult';
import { FaSpinner } from 'react-icons/fa';

function Explore() {


  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false);
  
  return (
    <>
      <div className="w-screen md:p-7 p-3 flex flex-col gap-5 md:h-[40rem] relative">
        <ExploreSearchBar setUsers={setUsers} setLoading={setLoading} />

        <div className="w-full h-screen p-0 text-center">
          {!loading &&
            (users ? (
              <SearchResult users={users} />
            ) : (
              <AllPosts />
            ))}
          {loading && (
            <FaSpinner
              size={16}
              icon="spinner"
              spin={true}
              className="ml-auto mr-auto rotating-spinner"
            />
          )}

          {
            users?.length === 0 && (
              !loading && <span className="self-center font-medium font-poppins">No users found !</span>
            )
          }
        </div>
      </div>
    </>
  );
}

export default Explore