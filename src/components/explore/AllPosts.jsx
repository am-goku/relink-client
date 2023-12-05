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
      <div className="w-full  md:p-5 flex md:flex gap-6 flex-wrap justify-center overflow-auto">
        {
          [...posts, ...posts, ...posts, ...posts].map((post) =>{
            return (
              <>
                <div className="bg-white w-28 md:w-72 aspect-square rounded">
                  <img src={post.image} alt="" />
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