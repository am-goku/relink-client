import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Protect({children}) {

    const navigate = useNavigate()
    const isValid = useSelector((state)=> state?.user?.validUser);

    useEffect(()=> {
        if(!isValid){
            navigate("/login");
        }
    })



  return (
    <>
        {children}
    </>
  )
}

export default Protect