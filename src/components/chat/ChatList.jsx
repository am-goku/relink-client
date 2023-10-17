import React from 'react'
import ProfilePic from '../profiles/ProfilePic';
import { useSelector } from 'react-redux';
import NameField from '../profiles/NameField';
import ChatUser from './ChatUser';

function ChatList() {

    const user = useSelector((state) => state?.user?.userData)

  return (
    <>
      <div className="w-96 h-fit bg-slate-500 p-5 flex flex-col gap-3">
        <ChatUser user={user} />
        <ChatUser user={user} />
        <ChatUser user={user} />
        <ChatUser user={user} />
        <ChatUser user={user} />
        <ChatUser user={user} />
        <ChatUser user={user} />
        <ChatUser user={user} />
        <ChatUser user={user} />
        <ChatUser user={user} />
      </div>
    </>
  );
}

export default ChatList