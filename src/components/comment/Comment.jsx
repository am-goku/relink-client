import React, { useEffect, useState } from "react";
import { getUser } from "../../services/apiMethods";
import { getTimeDifference } from "../../hooks/timeAgo";
import { useNavigate } from "react-router-dom";

function Comment({data}) {
  const navigate = useNavigate()
  const [commenter, setCommenter] = useState({});
  const [error, setError] = useState();
  const [time, setTime] = useState('just now')
  useEffect(()=> {
    getUser(data.userId).then((response)=> {
      console.log("comment user:", response);
      setCommenter(response[0]);
    }).catch((error)=> {
      setError(error.message);
    });
  },[data]);

  useEffect(() => {
    const newTime = getTimeDifference(data?.createdAt);
    setTime(newTime);
  },[data])


  const seeProfile = () => {
    navigate(`/profile/${commenter?.username}`);
  };


  return (
    <>
      <div className="w-fit h-fit bg-slate-400 flex gap-2 items-center rounded-lg p-5 relative">
        <div className="aspect-square w-8 rounded-full bg-black self-start" onClick={seeProfile}>
          <img
            src={commenter?.profilePic}
            alt=""
            className="rounded-full w-8 aspect-square"
          />
        </div>
        <div className="col-span-1">
          <span className="font-medium text-base" onClick={seeProfile}>{commenter?.name}</span>
          <div className="mt-2 h-fit font-poppins text-sm flex ">
            <span className="max-w-lg overflow-auto no-scrollbar">
              {data?.content}
            </span>
          </div>
        </div>
        <div className="p-1 text-xs absolute bottom-0 right-0 text-gray-700"><span className="">{time}</span></div>
      </div>
    </>
  );
}

export default Comment;
