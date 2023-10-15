import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { adminFetchUsers } from "../../../services/admin/apiMethods";
import TableHead from "./TableHead";
import SearchBar from "./SearchBar";
import UserFilter from "./UserFilter";

const Table = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  const [lastPage, setLastPage] = useState(false);

  //filter options
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const perPage = 7;

  useEffect(()=>{
    adminFetchUsers(currentPage, perPage, searchTerm).then((response)=>{
        setUsers(response);
        if(response.length < perPage){
          setLastPage(true)
        } else {
          setLastPage(false)
        }
    }).catch((error)=>{
      setError(error.message);
    })
  },[currentPage, searchTerm]);


  const handlePageChange =(newpage) => {
    const nextPage = searchTerm? 1 : newpage
    setCurrentPage(nextPage);
  };
  

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 p-4">
          <UserFilter />
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableHead />
          <tbody>
            {users.map((user, index) => {
              return <TableRow userData={user} key={user._id} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="mr-20 ml-auto flex gap-3 absolute bottom-3 right-0">
        <button
          className="w-20 h5 bg-red-500 rounded-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          className="w-20 h-5 bg-blue-400 rounded-lg"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={lastPage}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Table
