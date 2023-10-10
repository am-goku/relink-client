import { initFlowbite } from "flowbite";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Options({user}) {

  const [ownProfile, setOwnProfile] = useState(false);

  const currentUser = useSelector((state) => state?.user?.userData)

  useEffect(() => {
    initFlowbite();

    if(currentUser?.userName === user?.username){
        setOwnProfile(true);
    }
  },[currentUser, user]);

  return (
    <>
      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      <div
        id="dropdownDots"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconButton"
        >
          {ownProfile ? (
            <li>
              <button className="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Edit profile
              </button>
            </li>
          ) : (
            <li>
              <button className="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Edit profile
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Options;
