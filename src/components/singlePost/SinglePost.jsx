import React, { useEffect, useState } from "react";

import "./SinglePost.css";


import Dropdown from "../options/Dropdown";
import CaptionWithShowMore from "../options/Caption";
import { getUser } from "../../services/apiMethods";
import Heart from "../icons/Heart";
import SaveIcn from "../icons/SaveIcn";
import CommentIcn from "../icons/CommentIcn";




function SinglePost({postData}) {

  const [isRed, setIsRed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [post, setPost] = useState(postData);

  const [postUser, setPostUser] = useState(null);

  useEffect(()=>{
    getUser(post.userId).then((response)=>{
      if(response.status === 200) {
        setPostUser(response.users[0]);
      } else {
        console.log(response);
      }
    }).catch((error)=>{
      console.log(error);
    })
  },[post])
  

  const saveOrUnsave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <>
      <div className="p-4 mt-5 w-full">
        {/* Parent div with padding */}
        <div className="p-2 rounded-md relative w-full bg-black bg-opacity-75">
          <div className="w-full h-16 flex p-2 gap-3 self-center">
            <div className="bg-white ml-1 w-11 h-11 rounded-full self-center">
              <img src={postUser?.profilePic} alt="" className="rounded-full" />
            </div>
            <div className="text-white font-semibold text-lg self-center">
              {postUser?.name}
            </div>
            <button className="text-white font-thin text-xs font-mono self-center bg-slate-400 rounded-lg w-16 h-5">
              Follow
            </button>

            <div className="self-center ml-auto cursor-pointer">
              <Dropdown />
            </div>
          </div>

          {/* Larger square div for image */}
          <div
            className="max-w-xl mt-2 aspect-square bg-gray-300 rounded-lg overflow-hidden"
            // onDoubleClick={likeOrUnlike}
          >
            {/* You can add your image here */}
            <img
              src={post.image}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          {/* show more funtion */}
          <div className="m-2">
            <CaptionWithShowMore text={post.description} />
          </div>
          <div className="mt-1">
            <span className="pl-2 text-white text-sm font-light select-none">{`You and ${2483} others liked this post`}</span>

            <div className="p-2 text-xl flex gap-5 mt-5 font-bold">
              
              <Heart size={{width: 34, height:36}} post={post} setPost={setPost} />

              
              <CommentIcn size={{width:33, height:31}} post={post} />

              <SaveIcn size={{width:36, height:37}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePost;
