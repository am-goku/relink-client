import React, { useEffect } from 'react'
import ReportTable from '../../../components/admin/reports/ReportTable';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ReportPage() {


  const navigate = useNavigate();
  const validAdmin = useSelector((state) => state?.admin?.validAdmin);
  const adminData = useSelector((state) => state?.admin?.adminData);

  useEffect(() => {
    if (!adminData || !validAdmin) {
      navigate("/admin/login");
    }
  },[navigate, adminData, validAdmin]);





  return (
    <>
      <div className="h-fit">
        <ReportTable />
      </div>
    </>
  );
}

export default ReportPage