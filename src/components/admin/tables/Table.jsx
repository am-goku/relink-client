import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { adminFetchUsers } from "../../../services/admin/apiMethods";
import TableHead from "./TableHead";
import SearchBar from "./SearchBar";
import UserFilter from "./UserFilter";

const Table = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(()=>{
    adminFetchUsers().then((response)=>{
      if(response.status === 200) {
        setUsers(response.users);
        console.log(response);
      } else {
        console.log(response);
      }
    }).catch((error)=>{
      setError(error.message);
    })
  },[])

  return (

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 p-4">
        <UserFilter />
        <SearchBar />
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHead />
        <tbody>
          
            {
              users.map((user, index)=>{
                return (
                  <TableRow userData={user} key={user._id} />
                )
              })
            }

        </tbody>
      </table>
    </div>
  );
}

export default Table
