import React, { useEffect, useState } from 'react'
import Test from '../Test'
import ChatList from '../../components/chat/ChatList'
import ChatBox from '../../components/chat/ChatBox'
import { useSelector } from 'react-redux';
import { setUpChatRoom } from '../../services/apiMethods';

function MessageBox() {

  const [error, setError] = useState('')
  const [chatRoom, setChatRoom] = useState();
  const user = useSelector((state)=> state?.user?.userData);

  const [reciever, setReciever] = useState()

  useEffect(()=> {
    setUpChatRoom(user?._id, reciever?._id).then((chatRoom)=>{
      setChatRoom(chatRoom);
      console.log(chatRoom);
    }).catch((error)=>{
      setError(error);
    })
  },[user, reciever]);

  return (
    <>
      <div className="w-full p-5 flex items- gap-6">
        <ChatList setReciever={setReciever} />
        <ChatBox reciever={reciever} />
      </div>
    </>
  );
}

export default MessageBox