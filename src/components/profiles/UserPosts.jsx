import { initFlowbite } from 'flowbite'
import React, { useEffect, useState } from 'react'
import SinglePostView from '../modal/SinglePostView';
import { useNavigate } from 'react-router-dom';

function UserPosts({post}) {

  const navigate = useNavigate();




  return (
    <>
      <div
        className="aspect-square rounded border-y-2 border-x-2 w-64 bg-slate-600"
        onClick={()=> navigate(`/post/${post._id}`)}
      >
        <img
          src={post?.image}
          alt=""
          className="aspect-square w-full h-full rounded"
        />
      </div>
    </>
  );
}

export default UserPosts