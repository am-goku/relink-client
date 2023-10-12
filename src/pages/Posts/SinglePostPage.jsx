import React, { useEffect, useState } from 'react'
import SinglePostView from '../../components/modal/SinglePostView'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAPost } from '../../services/apiMethods';
import { useSelector } from 'react-redux';

function SinglePostPage() {

  const isValid = useSelector((state)=> state?.user?.validUser)
  const navigate = useNavigate()

  const {postId} = useParams();
  const [post, setPost] = useState({});
  const [error, setError] = useState('');



  useEffect(()=> {
    if(!isValid){
      navigate("/login");
    }
    
  },[navigate, isValid])

  useEffect(()=> {
    fetchAPost(postId).then((response) => {
      setPost(response);
      // console.log(response);
    }).catch((error) => {
      setError(error);
      navigate("/NotFound");
    })
  },[postId, navigate]);


  return (
    <>
      <div className="h-screen bg-[#C6C1C1] md:w-full w-full items-center flex md:p-20 lg:p-5 overflow-auto">
        <SinglePostView post={post} postId={postId} setPost={setPost} />
      </div>
    </>
  );
}

export default SinglePostPage