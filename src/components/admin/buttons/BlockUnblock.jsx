import React from 'react'
import { blockUnblockUser } from '../../../services/admin/apiMethods';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BlockUnblock({user, setUser, setError}) {



    const changeBlockStatus = () => {
        blockUnblockUser(user?._id, !user?.blocked).then((response)=> {
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
        }).catch((error) => {
            setError(error?.message);
        });
    }

   


  return (
    <>
      <button
        className={`font-medium text-${
          user?.blocked ? "blue-600" : "red-600"
        } dark:text-blue-500 hover:underline`}
        onClick={changeBlockStatus}
      >
        {user?.blocked ? "Unblock" : "Block user"}
      </button>
    </>
  );
}

export default BlockUnblock