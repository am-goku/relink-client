import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNav from '../../components/admin/layout/AdminNav';
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

        
          {/* Main Content */}
          <div className="p-5 flex-1 overflow-auto relative">
            <Outlet />
          </div>

          
      </div>
    </>
  );
}

export default Admin;
