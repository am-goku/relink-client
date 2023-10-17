import React from 'react'
import Test from '../Test'
import ChatList from '../../components/chat/ChatList'
import ChatBox from '../../components/chat/ChatBox'

function MessageBox() {
  return (
    <>
      <div className="w-full p-5 flex items-center gap-6">
        <ChatList />
        <ChatBox />
      </div>
    </>
  );
}

export default MessageBox