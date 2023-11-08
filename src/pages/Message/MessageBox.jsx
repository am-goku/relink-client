import React, { useEffect, useRef, useState } from 'react'
import ChatList from '../../components/chat/ChatList'
import ChatBox from '../../components/chat/ChatBox'
import { useDispatch, useSelector } from 'react-redux';
import { setUpChatRoom } from '../../services/apiMethods';
import { io } from 'socket.io-client';
import MessageIcn from '../../components/icons/MessageIcn';
import { useNavigate } from 'react-router-dom';
import { setCurrentRoom, updateReduxChatRoom } from '../../utils/reducers/userReducer';

function MessageBox() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  const [chatRoom, setChatRoom] = useState();
  const user = useSelector((state)=> state?.user?.userData);
  const isValid = useSelector((state)=> state?.user?.validUser)


  const chatRef = useRef()

  const [reciever, setReciever] = useState()

  useEffect(()=> {
    if(!isValid || !user){
      navigate("/login")
    }
  })

  useEffect(()=> {
    if(reciever){
      setUpChatRoom(user?._id, reciever?._id)
        .then((chatRoom) => {
          setChatRoom(chatRoom);
          dispatch(setCurrentRoom(chatRoom));
          console.log(chatRoom);
        })
        .catch((error) => {
          if(error.status === 401){
            navigate("/login")
          }
          setError(error);
        });
    }
  },[user, reciever, navigate, dispatch]);


  useEffect(() => {
      const socket = io.connect("http://localhost:4000");
      socket.emit("newUser", chatRoom?._id, (res) => {
        console.log("res from socketIo:", res);
      });

      socket.on("newMessage", (data, res) => {
        console.log("data recieved from socketIo:", data);
      });

  },[chatRoom]);

  return (
    <>
      <div className="w-full hidden p-5 md:flex items- gap-6">
        <ChatList setReciever={setReciever}  />
        {chatRoom && reciever ? (
          <ChatBox reciever={reciever} chatRoom={chatRoom} setChatRoom={setChatRoom} />
        ) : (
          <div className="w-full h-full flex border-2 border-white rounded-lg flex-col justify-center items-center gap-3">
            <div className="rounded-full w-40 aspect-square border-white border-2 flex justify-center items-center">
              <MessageIcn size={{ width: 70, height: 70 }} />
            </div>
            <span className="text-white font-poppins font-semibold text-4xl capitalize">
              messages
            </span>
          </div>
        )}
      </div>

      <div className="w-full h-fit p-1 flex items-center md:hidden gap-6 justify-center">
          {chatRoom && reciever ? (
            <ChatBox reciever={reciever} chatRoom={chatRoom} setChatRoom={setChatRoom} />
          ) : (
            <ChatList setReciever={setReciever}  />
          )}
      </div>
    </>
  );
}

export default MessageBox