import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNav from '../../components/admin/layout/AdminNav';
import AdminHeader from '../../components/admin/layout/AdminHeader';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { adminAuthenticator } from '../../utils/reducers/adminReducer';

function Admin() {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(adminAuthenticator());
  })
  return (
    <>
    <ToastContainer />
      <div className="flex h-screen bg-[#C6C1C1]">
        {/* Sidebar */}
        <div className="">
          <AdminNav />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gray-200">
            <AdminHeader />
          </div>

          {/* Main Content */}
          <div className="pt-32 p-2 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
