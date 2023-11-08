import React from 'react'

function RepoFilter({setTarget}) {


  return (
    <>
      <div className="">
        <button
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          <span className="sr-only">Action button</span>
          Report Types
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {/* <!-- Dropdown menu --> */}
        <div
          id="dropdownAction"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownActionButton"
          >
            <li>
              <button onClick={() => setTarget("POST")} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Post Reports
              </button>
            </li>
            <li>
              <button onClick={() => setTarget("USER")} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                User Reports
              </button>
            </li>
          </ul>
          
        </div>
      </div>
    </>
  );
}

export default RepoFilter