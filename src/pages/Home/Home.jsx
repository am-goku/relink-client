import React, { useEffect, useState } from "react";
import SinglePost from "../../components/singlePost/SinglePost";
// import PostContainer from "../../components/containers/PostContainer";
import SuggestionContainer from "../../components/containers/SuggestionContainer";
import Suggestion from "../../components/profiles/Suggestion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserPosts, getAllPosts, } from "../../services/apiMethods";
import { setUserPosts } from "../../utils/reducers/postReducer";

import "./Home.css"

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])

  // const user = useSelector((state)=> state?.user.userData);
  const isValid = useSelector((state)=> state?.user?.validUser);
  const user = useSelector((state)=> state?.user?.userData);

  //error management
  const [error, setError] = useState('');

  //pagination related
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [postMessage, setPostMessage] = useState('')


  //auth check
  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
  })



  useEffect(() => {
    const fetchPosts = () => {
      try {
        setLoading(true);
        setTimeout(()=> {
          getAllPosts(page)
            .then((response) => {
              const newPosts = response.posts;
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            })
            .catch((error) => {
              setError(error.message);
            }).finally(()=> {
              setLoading(false)
            })
        }, 2000)
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPosts();
  }, [page]);


  useEffect(()=> {
    const postContainer = document.getElementById("post-container");
    postContainer.addEventListener("scroll", () => {
       if (postContainer) {
         const { scrollTop, scrollHeight, clientHeight } = postContainer;
          if (scrollTop + clientHeight >= scrollHeight && !loading) {
            setLoading(true);
              setPage(page+1);
          }
       }
    })
  })





// to fetch the user posts
  useEffect(()=> {
    if(isValid){
      fetchUserPosts(user?._id).then((response) => {
        dispatch(setUserPosts(response));
      }).catch((error) => {
        console.log("error is", error);
      }).finally(()=> {

      })
    }
  },[navigate, isValid, user, dispatch])

  return (
    <>
      <div className="md:ml-auto">
        {/* <PostContainer> */}
        <div
          id="post-container"
          className="w-fit h-screen md:mr-auto bg-stone-900 md:bg-transparent bg-opacity-50 overflow-scroll no-scrollbar"
        >
          {posts?.map((post) => {
            return <SinglePost key={post._id} postData={post} />;
          })}
          {loading ? (
            <div className="p-4 mt-5 w-full flex justify-center items-center select-none">
              <div className="loader">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </div>
          ) : null}

        </div>
        {/* </PostContainer> */}
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
