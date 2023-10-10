import React, { useEffect } from "react";
import { initFlowbite } from "flowbite";
import icon from "../../../images/relink.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeReduxAdmin } from "../../../utils/reducers/adminReducer";


function AdminHeader() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const adminData = useSelector((state)=>state?.admin?.adminData)
  const isValid = useSelector((state) => state?.admin?.validAdmin);

  useEffect(()=>{
    if(!isValid){
      navigate("/admin/login")
    }
  }, [isValid, navigate])


  const signOut = () => {
    dispatch(removeReduxAdmin())
    navigate("/admin/login")
  }


  useEffect(()=>{
    initFlowbite()
  })


  return (
    <>
      <div className="bg-[#676768] w-full h-24 flex fixed mt-auto pr-56">
        <div className="logo ml-10 w-fit h-full flex justify-center items-center">
          <img src={icon} alt="" className="w-60" />
        </div>

        <div className="logo ml-auto w-fit h-full mr-7 flex justify-center items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-black">
            <img
              className="rounded-lg"
              src={adminData?.profilePic}
              alt=""
            />
          </div>

          <div
            id="dropdownInformationButton"
            data-dropdown-toggle="dropdownInformation"
            className="text-white  hover:bg-[#19576B] cursor-pointer border-x-2 border-y-2 border-stone-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            {adminData?.name}
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
          </div>

          {/* <!-- Dropdown menu --> */}
          <div
            id="dropdownInformation"
            className="z-auto hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <div className="px-4 text-center py-3 text-sm text-gray-900 dark:text-white">
              <div>{adminData?.name}</div>
              <div className="font-medium truncate">{adminData?.email}</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownInformationButton"
            >
              <li>
                <button
                  href="#"
                  className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </button>
              </li>
            </ul>
            <div className="py-2">
              <button
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onClick={signOut}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
