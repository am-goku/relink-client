import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import SearchResult from './SearchResult';
import { searchUser } from '../../services/apiMethods';
import { showError } from '../../hooks/errorManagement';

function ExploreSearchBar() {

    const [searchResult, setSearchResult] = useState([]);
    const [error, setError] = useState();


    const search = (e) => {
        searchUser(e.target.value).then((response)=> {
            setSearchResult(response);
        }).catch((err) => {
            setSearchResult([])
            setError(err);
        })
    }

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
        {searchResult.length > 0 ? (
          <div className="px-12 mt-1 z-50">
            <SearchResult users={searchResult} />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default ExploreSearchBar