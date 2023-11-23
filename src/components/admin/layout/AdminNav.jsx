import React, { useEffect } from "react";
import ReportIcn from "../icons/ReportIcn";
import UsersIcn from "../icons/UsersIcn";
import GalleryIcn from "../icons/GalleryIcn";
import ChatIcn from "../icons/ChatIcn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearAdmin } from "../../../services/admin/apiCalls";

import icon from "../../../images/relinkicon.png"

function AdminNav() {

  const navigate = useNavigate()
  const admin = useSelector((state)=>state?.admin?.validAdmin)
  const adminData = useSelector((state) => state?.admin?.adminData);

  useEffect(()=>{
    if(!admin || !adminData){
      navigate("/admin/login")
    }
  },[navigate, admin, adminData])


    const signOut = () => {
      clearAdmin();
    };


  return (
    <>
      <div className="w-36 h-full flex flex-col bg-[#19576B] items-center relative py-3">
        <div className="w-full h-auto flex justify-center items-center">
          <img src={icon} alt="" className="w-20 h-20" />
        </div>
        {/* end of logo div on navbr */}




        {/* listing the nav icons */}

        <div className="items-center w-full h-fit flex flex-col">
          <div
            onClick={()=> navigate("/admin")}
            className={
              "w-full h-fit aspect-square self-center flex mt-3 border-b justify-center   cursor-pointer text-center text-white navSelection rounded-md"
            }
          >
            <div className="flex self-center justify-end items-center h-fit " >
              <ReportIcn />
            </div>
          </div>

          <div
            className={
              "w-full h-fit self-center aspect-square flex mt-3 border-b justify-center  cursor-pointer text-center items-center text-white navSelection rounded-md"
            }
            onClick={() => navigate("/admin/users")}
          >
            <div className="flex self-center justify-end items-center h-fit">
              <UsersIcn />
            </div>
          </div>

          <div
            className={
              "w-full h-fit self-center aspect-square flex mt-3 border-b  justify-center  cursor-pointer text-center text-white navSelection rounded-md"
            }
            onClick={() => navigate("/admin/posts")}
          >
            <div className="flex self-center justify-end items-center h-fit ">
              <GalleryIcn />
            </div>
          </div>

          <div
            onClick={()=> navigate("/admin/reports")}
            className={
              "w-full h-fit self-center aspect-square flex mt-3 border-b justify-center  cursor-pointer text-center text-white navSelection rounded-md"
            }
          >
            <div className="flex self-center justify-end items-center h-fit " >
              <ChatIcn />
            </div>
          </div>



        </div>
          <button onClick={signOut} className="h-10 bg-slate-500 m-3 bottom-5 rounded-lg right-1 left-1 absolute hover:bg-slate-600 hover:text-white">Logout</button>

        
      </div>
    </>
  );
}

export default AdminNav;
