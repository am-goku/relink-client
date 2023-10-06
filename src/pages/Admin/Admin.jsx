import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNav from '../../components/admin/layout/AdminNav'

function Admin() {
  return (
    <>
      <div className="w-screen h-screen bg-[#C6C1C1]">
        <div className="flex justify-center">
          <AdminNav />
          <div className='justify-center self-center mr-auto w-fit'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin