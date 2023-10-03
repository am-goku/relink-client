import React from 'react'

import img404 from "../../images/img404.png";

import "./Error.css"
import { useNavigate } from 'react-router-dom';



function Error() {

    const navigate = useNavigate()


  return (
    <>
        <div className='errorpage h-screen w-screen flex items-center justify-center'>
            <div className='fourNotFour -mt-32' />
            <div className=''>
                <button className='w-24 h-11 bg-black opacity-30 rounded-xl text-white' onClick={()=>{navigate("/posts")}}>Go Home</button>
            </div>
        </div>
    </>
  )
}

export default Error