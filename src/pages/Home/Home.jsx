import React, { useCallback, useEffect, useRef, useState } from "react";
import SinglePost from "../../components/singlePost/SinglePost";
// import PostContainer from "../../components/containers/PostContainer";
import SuggestionContainer from "../../components/containers/SuggestionContainer";
import Suggestion from "../../components/profiles/Suggestion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNotifications, fetchUserPosts, getAllPosts, } from "../../services/apiMethods";
import { setUserPosts } from "../../utils/reducers/postReducer";

import "./Home.css"
import { removeReduxUser } from "../../utils/reducers/userReducer";
import { setReduxNotifications } from "../../utils/reducers/notificationReducer";
import EditPost from "../../components/modal/EditPost";

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
              if(error?.response?.status === 401){
                dispatch(removeReduxUser())
              }
            }).finally(()=> {
              setLoading(false)
            })
        }, 2000)
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPosts();
  }, [page, navigate, dispatch]);


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
        setError(error)
      })
    }
  },[isValid, user, dispatch])


  useEffect(()=> {
    fetchNotifications(user?._id).then((response) => {
      dispatch(setReduxNotifications({notifications:response}))
    }).catch((error) => {
      setError(error)
    })
  })



  const openEditor = useRef();
  const closeEditor = useRef();
  const [selectedPost, setSelectedPost] = useState();

  return (
    <>
      <div className="md:ml-auto">
        {/* <PostContainer> */}
        <div
          id="post-container"
          className="w-fit h-screen md:mr-auto bg-stone-900 md:bg-transparent bg-opacity-50 overflow-scroll no-scrollbar"
        >
          {posts?.map((post) => {
            return <SinglePost setSelectedPost={setSelectedPost}  key={post._id} postData={post} openEditor={openEditor} />;
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





      <button ref={openEditor} data-modal-target="default-modal" data-modal-toggle="default-modal" class="hidden" type="button" />
        <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <EditPost closeEditor={closeEditor} post={selectedPost} setPost={setSelectedPost} />
        </div>
      <button ref={closeEditor} type="button" class="hidden" data-modal-hide="default-modal" />



    </>
  );
}

export default Home;
