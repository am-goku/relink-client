import React, { useEffect, useRef, useState } from 'react'
import Table from '../../../components/admin/tables/Table';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initFlowbite } from 'flowbite';
import UserData from './UserData';

function Users() {

  const navigate = useNavigate()
  const isValid = useSelector((state) => state?.admin?.validAdmin)
  useEffect(() => {
    if (!isValid) {
      navigate("/admin/login");
    }

    initFlowbite()
  })

  const [user, setUser] = useState()
  const userModal = useRef()

  useEffect(()=> {
    if(user){
      userModal.current.click()
    }
  }, [user])


  return (
    <>
      <div className="justify-center items-center self-center rounded-lg">
        <Table changeUser={setUser} />
      </div>

      {/* --------------------------------------------------------------------------------------------------------------------- */}

      <button
        data-modal-target="extralarge-modal"
        data-modal-toggle="extralarge-modal"
        ref={userModal}
        className="hidden"
        type="button"
      >
        Extra large modal
      </button>
      <div
        id="extralarge-modal"
        tabIndex="-1"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-7xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
              <button
                type="button"
                onClick={() => setUser(null)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="extralarge-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <UserData user={user} setUser={setUser} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Users