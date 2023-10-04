import React, { useEffect, useState } from "react";
import "./style.css";
import {
  FaUserAlt,
  FaRegComments,
  FaRegCompass,
  FaRegEdit,
} from "react-icons/fa";
import { IoHomeSharp, IoNotifications } from "react-icons/io5";
import logowithback from "../../images/logowithback.png";
import CreatePost from "../modal/CreatePost";
import { initFlowbite } from "flowbite";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeReduxUser } from "../../utils/reducers/userReducer";

function NavBar({ path }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isClosed, setIsClosed] = useState(true);

  useEffect(() => {
    initFlowbite();
  });

  const navs = [
    { name: "PROFILE", icon: <FaUserAlt />, path: "/profile" },
    { name: "HOME", icon: <IoHomeSharp />, path: "/" },
    { name: "EXPLORE", icon: <FaRegCompass />, path: "/explore" },
    { name: "MESSAGE", icon: <FaRegComments />, path: "/message" },
    { name: "CREATE POST", icon: <FaRegEdit />, path: "/create" },
    { name: "NOTIFICATION", icon: <IoNotifications />, path: "/notification" },
  ];

  const imgUrl =
    "https://res.cloudinary.com/di9yf5j0d/image/upload/v1695795823/om0qyogv6dejgjseakej.png";

  const name = "Gokul Krishna";




  const logout = () => {
    dispatch(removeReduxUser());
    navigate("/login");
    return;
  }


  return (
    <>
      <div className="w-72 h-screen flex flex-col bg-gradient-to-r from-black via-zinc-900 to-zinc-700 ">
        <div className="w-full h-auto cursor-pointer">
          <img src={logowithback} alt="" className="h-auto" />
        </div>
        {/* end of logo div on navbr */}

        <div
          className="w-24 h-24 mt-10 rounded-full self-center"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        ></div>
        {/* end of profile pic div  */}

        <div className="w-52 h-12 self-center flex mt-5 justify-center max-w-xs overflow-hidden ">
          <h1 className="text-white self-center font-semibold max-h-7 text-xl truncate">
            {name}
          </h1>
        </div>

        {/* listing the nav icons */}
        {navs.map((nav, index) => {
          const key = `nav-${index}`;
          return (
            <div key={key}
              className={`w-56 h-12 self-center flex mt-5 border-b border-white cursor-pointer text-center text-white navSelection rounded-md ${
                path === nav.path ? "bg-gray-500 bg-opacity-60" : ""
              }`}
              onClick={() => {
                nav.name === "CREATE POST"
                  ? setIsClosed(false)
                  : navigate(nav.path);
              }}
            >
              <div className="flex ml-6 self-center justify-end items-center h-full">
                {nav.icon}
                <h1 className="ml-4">{nav.name}</h1>
              </div>
            </div>
          );
        })}

        {/* LOG OUT BUTTON AREA */}
        <div className="mt-28 w-32 h-10 self-center flex justify-center items-end text-slate-400 text-center relative">
          <div className="absolute inset-0 flex items-center justify-center cursor-pointer hover:text-white" onClick={logout}>
            <h1>SIGN OUT</h1>
          </div>
        </div>
      </div>

      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 ${
          isClosed ? "hidden" : "modal-open"
        }  overflow-x-hidden overflow-y-auto md:inset-0 h-screen`}
      >
        <CreatePost setClose={setIsClosed} />
      </div>
    </>
  );
}

export default NavBar;
