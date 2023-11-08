import React, { useEffect, useState } from 'react'
import { getUser } from '../../services/apiMethods'
import ProfilePic from '../profiles/ProfilePic'
import NameField from '../profiles/NameField'
import { useNavigate } from 'react-router-dom'
import { getTimeDifference } from '../../hooks/timeAgo'

function Replies({data}) {

    //hooks
    const navigate = useNavigate()

    //variables
    const [commenter, setCommenter] = useState()
    const [time, setTime] = useState(null)

    //error handling
    const [error, setError] = useState(null)

useEffect(()=> {
    getUser(data?.userId).then((user) => {
        setCommenter(user[0]);
    }).catch((error) => {
        setError(error?.message);
    })
}, [data])

useEffect(()=> {
    const diff = getTimeDifference(data?.createdAt)
    setTime(diff)
}, [data])




const seeProfile = () => {
    navigate(`/profile/${commenter?.username}`)
}

  return (
    <>
      <div className="">
        {/* for profile */}
        <div className="profile flex gap-3">
          <ProfilePic
            image={commenter?.profilePic}
            styleProp={"rounded-full w-7 h-7 aspect-square"}
          />
          <div className="flex flex-col gap-2">
            <NameField
              name={commenter?.username}
              doFunction={seeProfile}
              styleProp={"font-medium text-"}
            />
            <div className="content pr-2 text-sm flex relative gap-10">
              <span>{data?.content}</span>
              <div className="p-1 text-xs self-end bottom-0 right-0 text-gray-700">
                <span className="">{time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Replies