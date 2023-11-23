import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminProtect({ children }) {
  const navigate = useNavigate();
  const validAdmin = useSelector((state) => state?.admin?.validAdmin);
  const adminData = useSelector((state) => state?.admin?.adminData);
  useEffect(() => {
    if (!adminData || !validAdmin) {
      navigate("/admin/login");
    }
  }, [adminData, validAdmin, navigate]);

  if(validAdmin && adminData){
    return children
  } else {
    navigate("/admin/login");
  }
}

export default AdminProtect;
