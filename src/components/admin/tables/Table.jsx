import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { adminFetchUsers } from "../../../services/admin/apiMethods";

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
    <div className="flex flex-col self-center justify-center">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>

                {
                  users.map((user, index)=>{
                    return <TableRow user={user} index={index} key={user._id} />
                  })
                }
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table
