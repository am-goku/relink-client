import React, { useEffect, useState } from 'react'
import ProfilePic from '../profiles/ProfilePic';
import { useSelector } from 'react-redux';
import NameField from '../profiles/NameField';
import ChatUser from './ChatUser';
import { getConnections } from '../../services/apiMethods';

function ChatList({setReciever}) {

    const user = useSelector((state) => state?.user?.userData)
    const [following, setFollowing] = useState([])
    const [error, setError] = useState('')

    useEffect(()=> {
      getConnections(user?._id).then((response) =>{
        setFollowing(response?.following);
      }).catch((error) => {
        setError(error.message);
      })
    }, [user]);

  return (
    <>
      <div className="w-96 h-fit bg-slate-500 p-5 flex flex-col gap-3 rounded-lg">
        <div className='w-full h-14'>
          <span className="font-poppins text-xl font-medium">Messages</span>
        </div>
        {following.map((userId, index) => {
          return <ChatUser doFunction={setReciever} userId={userId} key={index} />;
        })}
      </div>
    </>
  );
}

export default ChatList