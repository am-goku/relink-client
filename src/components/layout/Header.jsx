import React, { useEffect, useState } from 'react'

//imported react icons
import { FaPlus } from 'react-icons/fa';

//imported styles
import "./style.css"


function Header() {



    
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.scrollY || window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos);
        setPrevScrollPos(currentScrollPos);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [prevScrollPos]);



  return (
    <>
      <div
        className={`${visible ? "translate-y-0" : "-translate-y-full"} transform transition-transform duration-300 fixed top-0 left-0 z-10 no-scrollbar`}
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