import React, { useCallback, useEffect, useState } from 'react'
import BlockUnblock from '../buttons/BlockUnblock';
import ViewProfile from '../buttons/ViewProfile';

function TableRow({ userData, index, key, changeUser }) {

  const [error, setError] = useState('')
  const [user, setUser] = useState(userData);

  

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={user?.profilePic}
            alt=""
          />
          <div className="pl-3">
            <div className="text-base font-semibold">{user?.name}</div>
            <div className="font-normal text-gray-500">@{user?.username}</div>
          </div>
        </th>
        <td className="px-6 py-4">{user?.email}</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full bg-${
                user?.blocked ? "red-500" : "green-500"
              } mr-2`}
            ></div>{" "}
            {user?.blocked ? "Blocked" : "Online"}
          </div>
        </td>
        <td className="px-6 py-4">
          <BlockUnblock user={user} setUser={setUser} setError={setError} />
          {/* <ViewProfile user={userData} /> */}
          <button
            onClick={()=> changeUser(user)}
            className="font-medium text-[#273B4A] dark:text-blue-500 hover:underline ml-5"
          >
            View profile
          </button>

          {/* here change user is passing and thinking topo change the div \vie profile */}
        </td>
      </tr>
    </>
  );
}

export default TableRow