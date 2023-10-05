import React, { useEffect, useState } from "react";
import SinglePost from "../../components/singlePost/SinglePost";
import PostContainer from "../../components/containers/PostContainer";
import SuggestionContainer from "../../components/containers/SuggestionContainer";
import Suggestion from "../../components/profiles/Suggestion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPosts, getUser } from "../../services/apiMethods";

function Home() {

  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  // const user = useSelector((state)=> state?.user.userData);
  const isValid = useSelector((state)=> state?.user?.validUser);

  useEffect(()=>{
    if (!isValid) {
      navigate("/login");
      return;
    }
  })


  useEffect(()=>{
    getAllPosts().then((response) => {
      try {
        if (response.status === 200) {
          // console.log(response);
          setPosts(response.posts);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [])

  return (
    <>
        <div className="md:ml-auto">
          <PostContainer>
            {
              posts.map((post) => {
                return (
                  <SinglePost
                    key={post._id}
                    post={post}
                  />
                );
              })
            }
          </PostContainer>
        </div>

        <div className="hidden lg:block md:hidden mr-auto ml-auto">
          <SuggestionContainer>
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
          </SuggestionContainer>
        </div>
    </>
  );
}

export default Home;
