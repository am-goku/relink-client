import React, { useEffect } from "react";
import ReportIcn from "../icons/ReportIcn";
import UsersIcn from "../icons/UsersIcn";
import GalleryIcn from "../icons/GalleryIcn";
import ChatIcn from "../icons/ChatIcn";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminNav() {

  const navigate = useNavigate()
  const admin = useSelector((state)=>state?.admin?.validAdmin)

  useEffect(()=>{
    if(!admin){
      navigate("/admin/login")
    }
  },[navigate, admin])


  return (
    <>
      <div className="w-36 h-full flex flex-col bg-[#19576B] mr-auto relative">
        <div className="w-full h-auto cursor-pointer"></div>
        {/* end of logo div on navbr */}

        {/* listing the nav icons */}

        <div className="items-center w-full h-fit flex flex-col mt-24">
          <div
            className={
              "w-full h-fit aspect-square self-center flex mt-3 border-b justify-center   cursor-pointer text-center text-white navSelection rounded-md"
            }
          >
            <div className="flex self-center justify-end items-center h-fit ">
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
            className={
              "w-full h-fit self-center aspect-square flex mt-3 border-b justify-center  cursor-pointer text-center text-white navSelection rounded-md"
            }
          >
            <div className="flex self-center justify-end items-center h-fit ">
              <ChatIcn />
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
}

export default AdminNav;
