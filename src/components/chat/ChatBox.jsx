import React from 'react'
import ProfilePic from '../profiles/ProfilePic'
import { useSelector } from 'react-redux'
import NameField from '../profiles/NameField'
import TypeBox from './TypeBox'
import SenderText from './SenderText'
import RecieverText from './RecieverText'

function ChatBox() {
    const user = useSelector((state)=>state?.user?.userData)
  return (
    <>
      <div className="w-full bg-slate-400 h-full rounded-lg relative flex flex-col">
        <div className="flex bg-black w-full h-16 rounded-t-lg items-center px-5 gap-5">
          <ProfilePic
            image={user?.profilePic}
            styleProp={"w-12 h-12 rounded-full"}
          />
          <NameField
            name={user?.name || user?.username}
            styleProp={"text-white font-poppins font-semi-bold"}
          />
        </div>

        <div className="bg-violet-300 w-full h-[51rem] p-5 relative flex flex-col gap-3 overflow-auto no-scrollbar">
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
          <SenderText />
          <RecieverText />
        </div>

        <div className="w-full flex rounded-b-lg h-16 bg-gray-700 absolute bottom-0 items-center px-10">
          <TypeBox />
        </div>
      </div>
    </>
  );
}

export default ChatBox