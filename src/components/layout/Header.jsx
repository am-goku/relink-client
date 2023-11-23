import React, {} from 'react'

//imported react icons
import { FaPlus } from 'react-icons/fa';

//imported styles
import "./style.css"


function Header() {


  return (
    <>
      <div
        className={`sticky top-0 left-0 z-10 no-scrollbar`}
      >
        <div className="bg-black w-screen h-16 flex justify-center px-5 overflow-hidden">
          <div className="w-56 h-32 self-center -ml-16 cursor-pointer headerLogo" />

          <div className="ml-auto w-fit h-12 flex self-center justify-center items-center ">
            <FaPlus className="w-5 h-7 fill-slate-300" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header