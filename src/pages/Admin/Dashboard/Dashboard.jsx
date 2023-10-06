import React, { useEffect } from 'react'
import AdminNav from '../../../components/admin/layout/AdminNav';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Dashboard() {

  const navigate = useNavigate();

  
  

  const isValid = useSelector((state)=>state?.admin?.validAdmin)

  useEffect(()=>{
    if (!isValid) {
      navigate("/admin/login");
    }
  },[isValid, navigate])

  

  

  return (
    <>
      <div className="w-screen h-screen bg-[#C6C1C1]">
        {/* <AdminNav /> */}
      </div>
    </>
  );
}

export default Dashboard