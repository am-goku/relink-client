import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../services/apiMethods';

function AllPosts() {

  const [posts, setPosts] = useState([]);

useEffect(()=> {
  getAllPosts().then((response)=>{
    setPosts(response.posts);
  })
},[])


  return (
    <>
      <div className="w-full h-full md:p-5 grid grid-cols-3 md:grid-cols-5 gap-2">
        {
          posts.map((post) =>{
            return <div className="bg-white w-28 md:w-80 aspect-square rounded">
              <img src={post.image} alt="" />
            </div>;
          })
        }
        
      </div>
    </>
  );
}

export default AllPosts