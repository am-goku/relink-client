import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import RecieverText from './RecieverText';
import SenderText from './SenderText';

function MessageArea({messages, setMessages, theme, socket, room}) {

const user = useSelector((state)=> state?.user?.userData);

const chatBoxRef = useRef();





useEffect(() => {
  if (chatBoxRef.current) {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }
}, [messages]);

useEffect(()=> {
  socket.on("recieveMessage", (newMessage, callback) => {
    setMessages((prevMessage)=>[...prevMessage, newMessage])
    // dispatch(updateReduxChatRoom(newMessage?.senderId))
  })
})


  return (
    <>
      <div
        className={`bg-no-repeat bg-cover w-full h-[39rem] md:h-[51rem] px-5 py-16 bg-[#000000a8] flex flex-col gap-3 overflow-auto no-scrollbar`}
        // style={{ background: `url(${theme ? theme : "blue"})` }}
        ref={chatBoxRef}
      >
        {messages.map((message, index) => {
          return message?.senderId === user?._id ? (
            <RecieverText message={message} key={message?._id} />
          ) : (
            <SenderText message={message} key={message?._id} />
          );
        })}
      </div>
    </>
  );
}

export default MessageArea