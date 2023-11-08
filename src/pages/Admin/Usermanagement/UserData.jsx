import React, { useEffect, useState } from 'react'
import ProfileCard from '../../../components/profiles/ProfileCard';
import { blockUnblockUser } from '../../../services/admin/apiMethods';
import { toast } from 'react-toastify';

function UserData({user, setUser}) {

    const [error, setError] = useState();

    


    const changeBlockStatus = () => {
      blockUnblockUser(user?._id, !user?.blocked)
        .then((response) => {
          setUser(response.user);
          toast.warn(response.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        })
        .catch((error) => {
          setError(error?.message);
        })
    };


  return (
    <>
      <div className="p-6 space-y-6 overflow-auto">
        <ProfileCard user={user} admin={true} />

        <div className="w-full bg-slate-600 h-3 grid grid-cols-3"></div>
      </div>
      <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        {user?.blocked ? (
          <button
            type="button"
            onClick={changeBlockStatus}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Unblock
          </button>
        ) : (
          <button
            data-modal-hide="extralarge-modal"
            type="button"
            onClick={changeBlockStatus}
            className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Block
          </button>
        )}
        <button
          onClick={() => setUser(null)}
          data-modal-hide="extralarge-modal"
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Close
        </button>
      </div>
    </>
  );
}

export default UserData