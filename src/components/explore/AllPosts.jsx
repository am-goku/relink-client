import React, { useEffect, useState } from 'react'
import { getEveryPosts } from '../../services/apiMethods';
import { useNavigate } from 'react-router-dom';

function AllPosts() {

  const [posts, setPosts] = useState([]);

  const navigate = useNavigate()

useEffect(()=> {
  getEveryPosts(1).then((response)=>{
    setPosts(response);
  })
},[])


  return (
    <>
      <div className="w-full h-screen md:p-5 flex md:flex md:gap-6 gap-2 flex-wrap justify-center overflow-auto no-scrollbar">
        {
          [...posts, ...posts, ...posts, ...posts].map((post) =>{
            return (
              <>
                <div
                  className="bg-white w-20 md:w-72 aspect-square rounded"
                  onClick={() => navigate(`/post/${post?._id}`)}
                >
                  <img src={post.image} alt="" className="rounded" />
                </div>
              </>
            );
          })
        }
        
      </div>
    </>
  );
}

export default AllPosts