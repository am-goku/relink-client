import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNav from '../../components/admin/layout/AdminNav';
import AdminHeader from '../../components/admin/layout/AdminHeader';

function Admin() {
  return (
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
  );
}

export default Admin;
