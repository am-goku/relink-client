import React, { useEffect, useRef, useState } from 'react'
import ProfilePic from '../profiles/ProfilePic'
import { useSelector } from 'react-redux'
import NameField from '../profiles/NameField'
import TypeBox from './TypeBox'
import SenderText from './SenderText'
import RecieverText from './RecieverText'
import MessageIcn from '../icons/MessageIcn'
import Info from '../icons/Info'
import { getMessages } from '../../services/apiMethods'

import { io }  from 'socket.io-client'

function ChatBox({reciever, chatRoom}) {
  
  const socket = io.connect("http://localhost:4000");
  
  const chatBoxRef = useRef();

    const user = useSelector((state)=>state?.user?.userData);

    const [messages, setMessages] = useState([])

    const [error, setError] = useState('')

    const [theme, setTheme] = useState('')
    
    
    
    useEffect(()=>{
      if(reciever && chatRoom){
        socket.emit("joinPrivateRoom", reciever?._id);
      }
    });


    useEffect(()=> {
      if(reciever && chatRoom){
        socket.on("newPrivateMessage", (message)=> {
          setMessages([...messages, message])
        })
      }
    })




    useEffect(()=> {
      try {
        if(reciever && chatRoom){
          getMessages(chatRoom?._id)
            .then((messages) => {
              setMessages(messages);
              console.log("messages:", messages);
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      } catch (error) {
        setError(error.message)
      }
    },[chatRoom, reciever]);



  useEffect(()=> {
    if(chatBoxRef.current){
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  },[messages])


  useEffect(()=> {
    setTheme(
      "https://res.cloudinary.com/di9yf5j0d/image/upload/v1697622170/Relink_chat_themes/WallpaperDog-20525697_wbnnal.jpg"
    );
  },[])

  return (
    <>
      <div className="w-full bg-black opacity-90 h-full rounded-lg relative flex flex-col border-white border-2">
        {reciever && chatRoom ? (
          <>
            <div className="flex bg-black w-full h-16 rounded-t-lg items-center px-5 gap-5">
              <ProfilePic
                image={reciever?.profilePic}
                styleProp={"w-12 h-12 rounded-full"}
              />
              <NameField
                name={reciever?.name || user?.username}
                styleProp={"text-white font-poppins font-semi-bold"}
              />
              <div className="ml-auto">
                <Info size={{ width: 26, height: 26 }} color={"#fff"} />
              </div>
            </div>

            {/* chat box area */}
            {messages?.length > 0 ? (
              <div
                className={`bg-no-repeat bg-cover w-full h-[51rem] p-5 flex flex-col justify-end gap-3 overflow-auto no-scrollbar`}
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
            ) : null}

            <div className="w-full flex rounded-b-lg h-16 bg-black opacity-70 absolute bottom-0 items-center px-10">
              <TypeBox
                chatRoom={chatRoom}
                recieverId={reciever?._id}
                messages={messages}
                setMessages={setMessages}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-full flex flex-col justify-center items-center gap-3">
              <div className="rounded-full w-40 aspect-square border-white border-2 flex justify-center items-center">
                <MessageIcn size={{ width: 70, height: 70 }} />
              </div>
              <span className="text-white font-poppins font-semibold text-4xl capitalize">
                messages
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ChatBox