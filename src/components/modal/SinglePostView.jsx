import React, { useEffect, useState } from 'react'
import SaveIcn from '../icons/SaveIcn';
import Heart from '../icons/Heart';
import SendIcn from '../icons/SendIcn';
import Comment from '../comment/Comment';
import { getUser } from '../../services/apiMethods';

function SinglePostView({post, setPost}) {

    const [comments, setComments] = useState([]);
    
    const [postOwner, setPostOwner] = useState({});
    const [error, setError] = useState();

    useEffect(()=> {
        setComments(post?.comment);
        
        getUser(post.userId).then((response) => {
            setPostOwner(response.users[0]);
        }).catch((error) => {
            setError(error.message)
        })
    },[post])


  return (
    <>
      <div className="bg-[#C6C1C1] w-fit h-fit ml-auto mr-auto p-5 flex gap-10 select-none">
        <div className="postImage border-black border-y-2 border-x-2 p-2 grid gap-3 w-full">
          <div className="userInfo flex items-center gap-3">
            <div className="profilePic rounded-full aspect-square w-10">
                <img src={postOwner?.profilePic} alt="" className='rounded-full' />
            </div>
            <span className="font-medium text-lg">{postOwner?.name}</span>

          </div>
          <img
            src={post?.image}
            alt=""
            className='rounded select-none'
          />
          <div className="max-w-xl max-h-40 flex flex-col overflow-y-auto no-scrollbar">
            <span className="font-poppins">
              {post?.description}
            </span>
          </div>
          <div className="flex mt-5 ml-2 gap-8 text-center">
            <div className="">
              <Heart size={{ width: 32, height: 32 }} post={post} setPost={setPost} />
              <span className="">106</span>
            </div>
            <div className="">
              <SaveIcn size={{ width: 32, height: 32 }} />
              <span className="">72</span>
            </div>
          </div>
        </div>
        <div className="w-full h-fit mt-5 relative">
          <span className="font-medium">Comments : 36</span>
          <div className="bg-stone-400 flex gap-3 w-full h-fit rounded-lg mt-3 p-2">
            <textarea
              placeholder="Add a comment"
              type="text"
              className="bg-transparent w-full rounded-lg"
            />

            <button className="text-center w-fit h-full rounded-md items-center flex justify-center">
              <SendIcn size={{ width: 35, height: 35 }} />
            </button>
          </div>
          <div className="bg-slate-500 w-full h-[45rem] overflow-auto no-scrollbar mt-4 relative p-5 flex flex-col gap-3 rounded">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePostView