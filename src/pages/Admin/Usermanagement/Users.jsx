import React, { useEffect } from 'react'
import Table from '../../../components/admin/tables/Table';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initFlowbite } from 'flowbite';

function Users() {

  const navigate = useNavigate()
  const isValid = useSelector((state) => state?.admin?.validAdmin)
  useEffect(() => {
    if (!isValid) {
      navigate("/admin/login");
    }

    initFlowbite()
  })


  return (
    <>
      
      

      <div className="justify-center items-center self-center mr-auto">
        <Table />
      </div>
    </>
  );
}

export default Users