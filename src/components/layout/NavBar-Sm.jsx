import React from 'react'
import { FaRegComments, FaRegCompass, FaUserAlt } from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import "./style.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBarSm() {

  const navigate = useNavigate()

  const user = useSelector((state)=> state?.user?.userData)

    const navs = [
      {
        name: "HOME",
        icon: <IoHomeSharp className="w-5 h-5" fill="white" />,
        path: "/",
      },
      {
        name: "EXPLORE",
        icon: <FaRegCompass className="w-5 h-5" fill="white" />,
        path: "/explore",
      },
      {
        name: "MESSAGE",
        icon: <FaRegComments className="w-5 h-5" fill="white" />,
        path: "/message",
      },
      {
        name: "PROFILE",
        icon: <FaUserAlt className="w-5 h-5" fill="white" />,
        path: `/profile/${user?.username}`,
      },
    ];




  return (
    <>
      <div className="flex left-0 bottom-0 fixed">
        <div className="bg-black w-screen h-16 flex items-center justify-center px-4">
          {
            navs.map((nav, index)=> {
              const key = `navSm-${index}`;
                return (
                  <div key={key} onClick={()=> navigate(nav.path)} className="m-auto w-12 h-12 flex justify-center items-center minNavSelection rounded-2xl">
                    {nav.icon}
                  </div>
                );
            })
          }
        </div>
      </div>
    </>
  );
}

export default NavBarSm