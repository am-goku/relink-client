import React from "react";
import SettingsIcn from "../icons/SettingsIcn";
import Options from "./Options";

function ProfileCard({ user }) {
  return (
    <>
      <div className="bg-[#1E1E1EC4] opacity-70 lg:items-center lg:px-60 lg:py-24 w-full p-7 lg:p-0 lg:w-fit h-fit mr-auto ml-auto lg:mt-7 flex lg:grid lg:grid-flow-col lg:gap-20 gap-12 relative select-none lg:rounded">
        <div className="absolute lg:w-5 lg:h-5 right-0 top-6 lg:m-8 lg:mr-10">
          <Options user={user} />
        </div>
        <div className="rounded-full lg:w-36 lg:h-36 w-20 h-20 m-3 lg:m-0 bg-gray-50 relative border-white border-x-2 border-y-2 lg:-ml-20">
          <img
            src={user?.profilePic}
            alt=""
            className="rounded-full aspect-square w-full"
          />
          <div className="lg:w-9 lg:h-9 hidden lg:block rounded-full absolute bottom-0 right-0 cursor-pointer">
            <SettingsIcn size={{ width: 36, height: 36 }} />
          </div>
        </div>

        <div className="w-1 h-32 bg-black hidden lg:block"></div>

        <div className=" w-fit h-fit text-white self-center mt-3 lg:mt-0">
          <div className="text-lg lg:text-2xl font-medium">
            <span>{user?.name}</span>
          </div>
          <div className="text-sm">
            <span>@{user?.username}</span>
          </div>
          <div className="flex gap-5">
            <div className="mt-8 grid gap-1">
              <span className="lg:text-xl font-poppins text-center">106</span>
              <span className="lg:text-sm font-serif text-center">Followers</span>
            </div>
            <div className="mt-8 grid gap-1">
              <span className="lg:text-xl font-poppins text-center">168</span>
              <span className="lg:text-sm font-serif text-center">Following</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
