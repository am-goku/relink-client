import React, { useEffect, useState } from 'react'
import ProfilePic from '../profiles/ProfilePic';
import NameField from '../profiles/NameField';
import { getUser } from '../../services/apiMethods';

function ChatUser({userId, doFunction}) {

    const [online, setOnline] = useState(true);
    const [user, setUser] = useState();

    useEffect(()=> {
      try {
        getUser(userId)
          .then((user) => {
            setUser(user[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },[userId])


  return (
    <div className="flex items-center gap-5 border-2 p-2 rounded-lg select-none bg-slate-400 opacity-70 cursor-pointer" onClick={()=>doFunction(user)}>
      <div className="relative rounded-full w-fit h-fit">
        <ProfilePic
          image={user?.profilePic}
          styleProp={"h-12 w-12 rounded-full"}
        />
        {online ? (
          <div className="rounded-full absolute bottom-0 right-0 w-3 h-3 ml-auto bg-green-500"></div>
        ) : null}
      </div>
      <NameField name={user?.name} styleProp={"font-poppins font-semi-bold"} />
    </div>
  );
}

export default ChatUser