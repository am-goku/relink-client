import React, { useEffect, useState } from "react";
import SinglePost from "../../components/singlePost/SinglePost";
import PostContainer from "../../components/containers/PostContainer";
import SuggestionContainer from "../../components/containers/SuggestionContainer";
import Suggestion from "../../components/profiles/Suggestion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserPosts, getAllPosts,  } from "../../services/apiMethods";
import { setUserPosts } from "../../utils/reducers/postReducer";

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])

  // const user = useSelector((state)=> state?.user.userData);
  const isValid = useSelector((state)=> state?.user?.validUser);
  const user = useSelector((state)=> state?.user?.userData);

  useEffect(()=>{
    if (!isValid) {
      navigate("/login");
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


// to fetch the user posts
  useEffect(()=> {
    fetchUserPosts(user?._id).then((response) => {
      dispatch(setUserPosts(response));
    })
  })

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
