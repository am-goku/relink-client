import React, { useEffect, useRef, useState } from "react";

import "./SinglePost.css";


import Dropdown from "../options/Dropdown";
import CaptionWithShowMore from "../options/Caption";
import { getUser } from "../../services/apiMethods";
import Heart from "../icons/Heart";
import SaveIcn from "../icons/SaveIcn";
import CommentIcn from "../icons/CommentIcn";
import { useSelector } from "react-redux";
import ConnectionBtn from "../icons/ConnectionBtn";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../profiles/ProfilePic";
import NameField from "../profiles/NameField";
import { toast } from "react-toastify";
import EditPost from "../modal/EditPost";
import PostSkelt from "../skeletons/PostSkelt";




function SinglePost({postData, setSelectedPost, openEditor, setLikePost, likeModal}) {

  const navigate = useNavigate()
  const user = useSelector((state)=> state?.user?.userData)

  const [owner, setOwner] = useState(false);

  const [post, setPost] = useState(postData);

  const [likes, setLikes] = useState([]);

  const [postUser, setPostUser] = useState(null);

  const [error, setError] = useState('');


  useEffect(()=>{
    getUser(post?.userId).then((response)=>{
        setPostUser(response[0]);
        user?._id === postUser?._id ? setOwner(true) : setOwner(false);
    }).catch((error)=>{
      setError(error.message)
    })
    
    setLikes(post?.likes)
  },[post, user, postData, postUser?._id])
  


  useEffect(()=> {
    if(error){
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setError('')
    };
  }, [error]);


  const seeProfile = () => {
    navigate(`/profile/${postUser?.username}`);
  }


  const showLikes = () => {
    setLikePost(post);
    likeModal.current.click();
  }


  //edit section


  return (
    <>
      <div className="p-4 mt-5 w-full select-none">
        {/* Parent div with padding */}
        <div className="p-2 rounded-md relative lg:w-[40rem] flex flex-col bg-black bg-opacity-75 border-2 border-black">
          <div className="w-full h-16 flex p-2 gap-3 self-center">
            <div
              className="bg-white ml-1 w-11 h-11 rounded-full self-center cursor-pointer"
              onClick={seeProfile}
            >
              <ProfilePic
                styleProp={"rounded-full"}
                image={postUser?.profilePic}
              />
            </div>
            <div
              className="text-white font-semibold text-lg self-center cursor-pointer"
              onClick={seeProfile}
            >
              <NameField name={postUser?.name || postUser?.username} />
            </div>
            {!owner ? (
              <div className="font-thin font-mono self-center rounded-lg w-16 h-5">
                <ConnectionBtn
                  user={postUser}
                  width={20}
                  height={5}
                  color={"white"}
                />
              </div>
            ) : null}

            <div className="self-center ml-auto cursor-pointer">
              <Dropdown
                post={post}
                postUser={postUser}
                openEditor={openEditor}
                setSelectedPost={setSelectedPost}
              />
            </div>
          </div>

          {/* Larger square div for image */}
          <div className="max-w-full min-w-full mt-2 aspect-square bg-gray-300 rounded-lg overflow-hidden">
            {/* You can add your image here */}
              <img
                src={post.image}
                alt=""
                className="object-cover w-full h-full"
                draggable={false}
              />
          </div>
          {/* show more funtion */}
          <div className="m-2">
            <CaptionWithShowMore text={post.description} />
          </div>
          <div className="mt-1">
            {likes?.length > 0 ? (
              <span onClick={showLikes} className="pl-2 text-white text-sm font-light select-none">
                {likes?.includes(user?._id)
                  ? `You ${
                      likes.length > 1 ? `and ${likes?.length - 1} other` : ""
                    } liked this post`
                  : likes?.length === 1
                  ? `One person liked this post`
                  : `${likes?.length} people liked this post`}
              </span>
            ) : null}

            <div className="p-2 text-xl flex gap-5 mt-5 font-bold">
              <Heart
                size={{ width: 34, height: 36 }}
                post={post}
                setPost={setPost}
              />

              <CommentIcn size={{ width: 33, height: 31 }} post={post} />

              {user?._id !== post?.userId ? (
                <SaveIcn
                  size={{ width: 36, height: 37 }}
                  post={post}
                  setError={setError}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePost;
