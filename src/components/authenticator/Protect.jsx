import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protect( {childern} ) {
  const navigate = useNavigate();
  const { userData, validUser } = useSelector((state) => state?.user);

  useEffect(() => {
    console.log(userData, validUser);
    if (!userData || !validUser) {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return <>{childern}</>;
}

export default Protect;
