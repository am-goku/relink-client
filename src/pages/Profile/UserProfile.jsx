import React, { useEffect, useState } from 'react';
import ProfileCard from '../../components/profiles/ProfileCard';
import UserPosts from '../../components/profiles/UserPosts';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';




function UserProfile() {

    const navigate = useNavigate()

    const isValid = useSelector((state) => state?.user?.validUser);
    const user = useSelector((state) => state?.user?.userData);

    const posts = useSelector((state) => state?.userPosts?.posts);

    // const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');


    useEffect(()=> {
        if(!isValid){
            navigate("/login");
        }
        console.log(posts);
        
    },[isValid, navigate, posts])



  return (
    <>
      <div className="w-full h-screen justify-center items-center overflow-scroll no-scrollbar">
        <ProfileCard user={user} />
        <div className="bg-black h-1 w-[60%] mt-20 ml-auto mr-auto"></div>
        <div className="overflow-auto h-full no-scrollbar">
          <div className="grid grid-cols-3 grid-flow-row gap-9 p-5 w-fit h-fit ml-auto mr-auto overflow-hidden ">
            {posts.map((post, index) => {
              return <UserPosts post={post} key={post?._id} />;
            })}
          </div>
          { posts?.length === 0 ?
            <div className="text-center">
              No posts to show
            </div> : error ? {error} : null
          }
        </div>
      </div>
    </>
  );
}

export default UserProfile