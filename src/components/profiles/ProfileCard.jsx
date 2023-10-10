import React from "react";
import SettingsIcn from "../icons/SettingsIcn";
import BackBtnIcn from "../icons/BackBtnIcn";
import { useNavigate } from "react-router-dom";
import Options from "./Options";

function ProfileCard({ user }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#C6C1C1] px-40 py-24 w-fit h-fit mr-auto ml-auto mt-10 grid grid-flow-col gap-20 relative select-none rounded">
        <div
          className="bg-gray-200 rounded w-9 h-9 absolute m-2 cursor-pointer hover:bg-slate-400"
          onClick={() => navigate(-1)}
        >
          <BackBtnIcn size={{ width: 34, height: 34 }} />
        </div>
        <div className="absolute w-5 h-5 right-0 m-8 mr-10">
          <Options user={user} />
        </div>
        <div className="rounded-full w-36 h-36 bg-gray-50 relative border-zinc-700 border-x-2 border-y-2">
          <img
            src={user?.profilePic}
            alt=""
            className="rounded-full aspect-square w-full"
          />
          <div className="w-9 h-9 rounded-full absolute bottom-0 right-0 cursor-pointer">
            <SettingsIcn size={{ width: 36, height: 36 }} />
          </div>
        </div>

        <div className="w-1 h-32 bg-black"></div>

        <div className=" w-fit h-fit">
          <div className="text-2xl font-medium">
            <span>{user?.name}</span>
          </div>
          <div className="text-sm">
            <span>@{user?.username}</span>
          </div>
          <div className="flex gap-5">
            <div className="mt-8 grid gap-1">
              <span className="text-xl font-poppins text-center">106</span>
              <span className="text-sm font-serif text-center">Followers</span>
            </div>
            <div className="mt-8 grid gap-1">
              <span className="text-xl font-poppins text-center">168</span>
              <span className="text-sm font-serif text-center">Following</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
