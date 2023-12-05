import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { searchUser } from '../../services/apiMethods';
import { showError } from '../../hooks/errorManagement';

function ExploreSearchBar({setUsers, setLoading}) {

    const [error, setError] = useState();

    const [key, setKey] = useState('')


    const search = (e) => {
      setKey(e.target.value.trim());
    }

    useEffect(() => {
      setLoading(true);
      setTimeout(() =>{
        if (key) {
          searchUser(key)
            .then((response) => {
              setUsers(response)
              setLoading(false);
            })
            .catch((err) => {
              setUsers([])
              setError(err);
              setLoading(false);
            });
        } else {
          setUsers(null)
          setLoading(false)
        }
      }, 2000)
    }, [key, setUsers, setLoading])


    useEffect(() => {
      showError(error, setError);
    }, [error]);

  return (
    <>
      <div className="grid">
        <div className="w-full mr-auto ml-auto rounded-2xl p-2 h-fit bg-slate-500 opacity-60 flex items-center gap-3">
          <FaSearch size={20} className="ml-3" />
          <input
            type="text"
            className="w-full bg-transparent focus:ring-transparent focus:border-0"
            onChange={(e)=>{search(e)}}
          />
        </div>
      </div>
    </>
  );
}

export default ExploreSearchBar