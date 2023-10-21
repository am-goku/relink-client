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
  })
})


  return (
    <>
      <div
        className={`bg-no-repeat bg-cover w-full h-[39rem] md:h-[51rem] p-5 flex flex-col gap-3 overflow-auto no-scrollbar`}
        style={{ background: `url(${theme ? theme : "blue"})` }}
        ref={chatBoxRef}
      >
        {messages.map((message, index) => {
          return message?.senderId === user?._id ? (
            <RecieverText text={message?.textMessage} key={message?._id} />
          ) : (
            <SenderText text={message?.textMessage} key={message?._id} />
          );
        })}
      </div>
    </>
  );
}

export default MessageArea