import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Dashboard() {

  const navigate = useNavigate();

  
  

  const isValid = useSelector((state)=>state?.admin?.validAdmin)
  const adminData = useSelector((state) => state?.admin?.adminData);


  useEffect(()=>{
    if (!isValid || !adminData) {
      navigate("/admin/login");
    }
  },[isValid, navigate, adminData])

  

  

  return (
    <>
      <div className="w-screen h-screen bg-[#C6C1C1]">
        {/* <AdminNav /> */}
      </div>
    </>
  );
}

export default Dashboard