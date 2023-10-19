import React, { useEffect, useRef, useState } from 'react'
import ProfilePic from '../profiles/ProfilePic'
import { useSelector } from 'react-redux'
import NameField from '../profiles/NameField'
import TypeBox from './TypeBox'
import SenderText from './SenderText'
import RecieverText from './RecieverText'
import MessageIcn from '../icons/MessageIcn'
import Info from '../icons/Info'

function ChatBox({reciever}) {
    const chatBoxRef = useRef();
    const user = useSelector((state)=>state?.user?.userData);

    const [theme, setTheme] = useState('')

    const [chat, setChat] = useState([])

    const [text, setText] = useState('')

    const submit = () => {
      setText? setChat([...chat, text]): alert('empty')
      setText('');
    }

  useEffect(()=> {
    if(chatBoxRef.current){
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  })


  useEffect(()=> {
    setTheme(
      "https://res.cloudinary.com/di9yf5j0d/image/upload/v1697622170/Relink_chat_themes/WallpaperDog-20525697_wbnnal.jpg"
    );
  },[])

  return (
    <>
      <div className="w-full bg-black opacity-90 h-full rounded-lg relative flex flex-col border-white border-2">
        {reciever ? (
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
              <div className='ml-auto'>
                <Info size={{width:26, height:26}} color={'#fff'} />
              </div>
            </div>

            {/* chat box area */}
            <div
              className={`bg-no-repeat bg-cover w-full h-[51rem] p-5 relative flex flex-col justify-end gap-3 overflow-auto no-scrollbar`}
              style={{ background: `url(${theme ? theme : "blue"})` }}
              ref={chatBoxRef}
            >
              {chat.map((item, index) => {
                return index === 0 ? (
                  <RecieverText text={item} />
                ) : index % 2 === 0 ? (
                  <RecieverText text={item} />
                ) : (
                  <SenderText text={item} />
                );
              })}
            </div>

            <div className="w-full flex rounded-b-lg h-16 bg-black opacity-70 absolute bottom-0 items-center px-10">
              <TypeBox setText={setText} sendText={submit} />
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-full flex flex-col justify-center items-center gap-3">
              <div className='rounded-full w-40 aspect-square border-white border-2 flex justify-center items-center'>
                <MessageIcn size={{ width: 70, height: 70 }} />
              </div>
              <span className='text-white font-poppins font-semibold text-4xl capitalize'>messages</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ChatBox