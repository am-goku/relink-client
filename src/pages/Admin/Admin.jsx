import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminNav from '../../components/admin/layout/AdminNav';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';

function Admin() {
  const navigate = useNavigate()
  const validAdmin = useSelector((state)=> state?.admin?.validAdmin);
  const adminData = useSelector((state)=> state?.admin?.adminData);

  useEffect(()=> {
    if(!adminData || !validAdmin){
      navigate("/admin/login")
    }
  }, [adminData, validAdmin, navigate])
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
