import React, { useEffect, useRef, useState } from "react";
import { getReplies, getUser, replyToComment } from "../../services/apiMethods";
import { getTimeDifference } from "../../hooks/timeAgo";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../profiles/ProfilePic";
import NameField from "../profiles/NameField";
import { useSelector } from "react-redux";
import Replies from "./Replies";
import { showError } from "../../hooks/errorManagement";

function Comment({data}) {

  const currentUser = useSelector((state)=> state?.user?.userData)

  const navigate = useNavigate()
  const [commenter, setCommenter] = useState({});
  const [error, setError] = useState();
  const [time, setTime] = useState('just now')
  useEffect(()=> {
    getUser(data.userId).then((response)=> {
      setCommenter(response[0]);
    }).catch((error)=> {
      setError(error?.message);
    });
  },[data]);

  useEffect(() => {
    const newTime = getTimeDifference(data?.createdAt);
    setTime(newTime);
  },[data])


  const seeProfile = () => {
    navigate(`/profile/${commenter?.username}`);
  };


  //LIST REPLY SECTION
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    getReplies(data?._id).then((replies) =>{
      setReplies(replies);
    }).catch((error) =>{
      setError(error?.message);
    })
  }, [data])


  useEffect(() => {
    showError(error, setError);
  }, [error]);


  //ADD REPLY SECTION
  const [reply, setReply] = useState(null);
  const replyText = useRef()

  const addReply = () => {

    if(!reply){
      return false;
    }

    const replyData = {
      content: reply,
      userId: currentUser?._id,
      postId: data?.postId,
      commentId: data?._id
    };

    replyToComment(replyData).then((response)=> {
      setReplies((prev)=> [response, ...prev]);
      setReply(null)
      replyText.current.value = '';
    }).catch((error)=> {
      setError(error?.message)
    })
  }





  return (
    <>
      <div className="bg-[#b4b2b2] py-2 rounded">
        <div className="flex-col flex ">
          <div className="w-fit h-fit  flex gap-2 items-center rounded-lg p-5 relative">
            <div
              className="aspect-square w-8 rounded-full bg-black self-start"
              onClick={seeProfile}
            >
              <ProfilePic
                image={commenter?.profilePic}
                styleProp={"rounded-full w-8 aspect-square"}
              />
            </div>
            <div className="col-span-1">
              <NameField
                name={commenter?.username}
                doFunction={seeProfile}
                styleProp={"font-medium text-base"}
              />
              <div className="mt-2 h-fit w-full relative font-poppins self-end text-sm flex flex-col">
                <span
                  className="lg:max-w-xs max-w-[16rem] truncate"
                  style={{ whiteSpace: "wrap" }}
                >
                  {data?.content}
                </span>
                <div className="p-1 text-xs self-end bottom-0 right-0 text-gray-700">
                  <span className="">{time}</span>
                </div>
              </div>
              <div className="flex border-black border w-52 max-w-60 items-center rounded-full relative">
                <input
                  type="text"
                  placeholder="Reply"
                  ref={replyText}
                  onChange={(e) => setReply(e.target.value.trim())}
                  className="rounded-full border-0 bg-transparent mt-1 h-7 focus:ring-0 focus:border-black"
                />
                {reply && (
                  <button
                    onClick={addReply}
                    className="text-xs font-semibold focus:ring-0 focus:border-0 absolute right-2"
                  >
                    Send
                  </button>
                )}
              </div>
              <span
                className="text-xs font-semibold mt-2 cursor-pointer"
                onClick={() => {
                  setShowReply(!showReply);
                }}
              >
                {showReply ? "Hide" : `${replies.length} Replies`}
              </span>
            </div>
          </div>

          <div className="flex gap-10 px-2"></div>
        </div>

        {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}

        {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}

        {showReply && (
          <div className="ml-12 flex flex-col gap-3">
            {replies.length > 0
              ? replies.map((item, index) => {
                  return <Replies data={item} key={index} />;
                })
              : null}
          </div>
        )}
      </div>
    </>
  );
}

export default Comment;
