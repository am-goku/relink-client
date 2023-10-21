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
import MessageArea from './MessageArea'
import EmojiPicker from 'emoji-picker-react'

function ChatBox({reciever, chatRoom}) {
  

    const user = useSelector((state)=>state?.user?.userData);

    const [messages, setMessages] = useState([])

    const [error, setError] = useState('')

    const [theme, setTheme] = useState('')
    
    const socket = io.connect("http://localhost:4000");
    useEffect(()=> {
      socket.emit("newUser", chatRoom?._id);

      return () => socket.disconnect()
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

    setTheme(
      "https://res.cloudinary.com/di9yf5j0d/image/upload/v1697622170/Relink_chat_themes/WallpaperDog-20525697_wbnnal.jpg"
    );
  },[])

  return (
    <>
      <div className="w-full h-[47rem] bg-black opacity-90 md:h-full rounded-lg relative flex flex-col md:border-white md:border-2">
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
          <MessageArea
            messages={messages}
            setMessages={setMessages}
            theme={theme}
            socket={socket}
            room={chatRoom}
          />
        ) : null}

        <div className="w-full flex rounded-b-lg h-16 bg-black opacity-70 absolute bottom-0 items-center px-3 md:px-10">
          
          <TypeBox
            chatRoom={chatRoom}
            recieverId={reciever?._id}
            messages={messages}
            setMessages={setMessages}
            socket={socket}
          />
        </div>
      </div>
    </>
  );
}

export default ChatBox