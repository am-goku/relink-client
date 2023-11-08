import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { adminFetchUsers } from "../../../services/admin/apiMethods";
import TableHead from "./TableHead";
import SearchBar from "./SearchBar";
import UserFilter from "./UserFilter";

const Table = ({changeUser}) => {
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
      setError(error?.message);
    })
  },[currentPage, searchTerm]);


  const handlePageChange =(newpage) => {
    setCurrentPage(newpage);
  };
  

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[40rem] bg-white no-scrollbar">
        <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 p-4">
          <UserFilter />
          <SearchBar setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableHead />
          <tbody>
            {users.map((user, index) => {
              return <TableRow changeUser={changeUser} userData={user} key={user._id} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="gap-3 flex justify-center p-6">
        
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </button>
        <span className="font-semibold">Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={lastPage}
          class="flex items-center justify-center px-3 h-8 ml- text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
        
      </div>
    </>
  );
}

export default Table
