import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { adminFetchUsers } from "../../../services/admin/apiMethods";
import TableHead from "./TableHead";
import SearchBar from "./SearchBar";
import { showError } from "../../../hooks/errorManagement";

const Table = ({changeUser}) => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  const [lastPage, setLastPage] = useState(false);

  //filter options
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const perPage = 9;

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

  
  useEffect(() => {
    showError(error, setError);
  }, [error]);


  const handlePageChange =(newpage) => {
    setCurrentPage(newpage);
  };
  

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white no-scrollbar">
        <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 p-4">
          <SearchBar
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableHead />
          <tbody>
            {users.map((user, index) => {
              return (
                <TableRow
                  changeUser={changeUser}
                  userData={user}
                  key={user._id}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="gap-3 flex justify-center p-6 h-20">
        <div className="w-fit h-fit bg-[#19576B] gap-3 flex  fixed bottom-[10px] left-[40%] translate-x-[50%] p-2 rounded-full">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Prev
          </button>
          <span className="font-semibold text-white">Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={lastPage}
            className="flex items-center justify-center px-3 h-8 ml- text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Table
