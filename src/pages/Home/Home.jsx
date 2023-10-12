import React, { useEffect, useState } from "react";
import SinglePost from "../../components/singlePost/SinglePost";
import PostContainer from "../../components/containers/PostContainer";
import SuggestionContainer from "../../components/containers/SuggestionContainer";
import Suggestion from "../../components/profiles/Suggestion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserPosts, getAllPosts,  } from "../../services/apiMethods";
import { setUserPosts } from "../../utils/reducers/postReducer";
import { removeReduxUser } from "../../utils/reducers/userReducer";

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])

  // const user = useSelector((state)=> state?.user.userData);
  const isValid = useSelector((state)=> state?.user?.validUser);
  const user = useSelector((state)=> state?.user?.userData);

  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
  })


  useEffect(() => {
    getAllPosts()
      .then((response) => {
        setPosts(response.posts);
      })
      .catch((error) => {
        console.log(error);
        // navigate("/login");
      });
  }, [navigate]);


// to fetch the user posts
  useEffect(()=> {
    if(isValid){
      fetchUserPosts(user?._id).then((response) => {
        dispatch(setUserPosts(response));
      }).catch((error) => {
        console.log("error is", error);
      })
    }
  },[navigate, isValid, user, dispatch])

  return (
    <>
        <div className="md:ml-auto">
          <PostContainer>
            {
              posts?.map((post) => {
                return (
                  <SinglePost
                    key={post._id}
                    postData={post}
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
          </SuggestionContainer>
        </div>
    </>
  );
}

export default Home;
