import React, { useEffect } from 'react'
import SinglePostView from '../../components/modal/SinglePostView'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SinglePostPage() {

  const isValid = useSelector((state)=> state?.user?.validUser)
  const navigate = useNavigate()

  const {postId} = useParams();

  useEffect(()=> {
    if(!isValid){
      navigate("/login");
    }
    
  })


  return (
    <>
      {postId? 

      <div className="h-screen md:w-full w-full items-center flex md:p-20 lg:p-5 overflow-auto">
        <SinglePostView postId={postId} />
      </div> : null

      }
    </>
  );
}

export default SinglePostPage