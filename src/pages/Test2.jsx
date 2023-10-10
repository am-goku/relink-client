import React from 'react'
import ProfileCard from '../components/profiles/ProfileCard'
import UserPosts from '../components/profiles/UserPosts';

function Test2() {





  return (
    <>
      <div className="w-full h-screen justify-center items-center overflow-scroll no-scrollbar">
        <ProfileCard />
        <div className="bg-black h-1 w-[60%] mt-20 ml-auto mr-auto"></div>
        <div className="overflow-auto h-full no-scrollbar">
          <div className="grid grid-cols-3 grid-flow-row gap-9 p-5 w-fit h-fit ml-auto mr-auto overflow-hidden ">
            <UserPosts />
          </div>
        </div>
      </div>
    </>
  );
}

export default Test2