import React, { useEffect, useRef, useState } from "react";
import SinglePost from "../../components/singlePost/SinglePost";
// import PostContainer from "../../components/containers/PostContainer";
import SuggestionContainer from "../../components/containers/SuggestionContainer";
import Suggestion from "../../components/profiles/Suggestion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNotifications, fetchUserPosts, getAllPosts, getSuggesions, } from "../../services/apiMethods";
import { clearLoadedPosts, setLoadedPosts, setUserPosts } from "../../utils/reducers/postReducer";

import "./Home.css"
import { setReduxNotifications } from "../../utils/reducers/notificationReducer";
import EditPost from "../../components/modal/EditPost";
import UserList from "../../components/modal/UserList";
import { showError } from "../../hooks/errorManagement";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //fetching redux user
  const isValid = useSelector((state) => state?.user?.validUser);
  const user = useSelector((state) => state?.user?.userData);

  //auth check
  useEffect(() => {
    if (!user || !isValid) {
      navigate("/login");
    }
  }, [user, isValid, navigate]);


  const lastPost = useSelector((state) => state?.userPosts?.lastPost)

  //error management
  const [error, setError] = useState("");

  //pagination related
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //fetching common posts from redux store
  const loadedPosts = useSelector((state) => state?.userPosts?.loadedPosts);


  //error message
  useEffect(() => {
    showError(error, setError);
  }, [error]);

  //fetching common posts and setting it to redux store
  useEffect(() => {
      if(!lastPost){
        try {
          setLoading(true);
          setTimeout(() => {
            getAllPosts(page)
              .then((response) => {
                const newPosts = response.posts;
                dispatch(setLoadedPosts(newPosts));
              })
              .catch((error) => {
                setError(error?.message);
              })
              .finally(() => {
                setLoading(false);
              });
          }, 2000);
        } catch (error) {
          setError(error?.message);
        }
      }
  }, [page, dispatch, lastPost]);


  useEffect(() => {
    if(!lastPost){
      const postContainer = document.getElementById("post-container");
      postContainer.addEventListener("scroll", () => {
        if (postContainer) {
          const { scrollTop, scrollHeight, clientHeight } = postContainer;
          if (scrollTop + clientHeight >= scrollHeight && !loading) {
            setLoading(true);
            setPage(page + 1);
          }
        }
      });
    }
  });

  // to fetch the user posts
  useEffect(() => {
    if (isValid) {
      fetchUserPosts(user?._id)
        .then((response) => {
          dispatch(setUserPosts(response));
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [isValid, user, dispatch]);

  useEffect(() => {
    fetchNotifications(user?._id)
      .then((response) => {
        dispatch(setReduxNotifications({ notifications: response }));
      })
      .catch((error) => {
        setError(error);
      });
  });

  const openEditor = useRef();
  const closeEditor = useRef();
  const [selectedPost, setSelectedPost] = useState();

  //likes
  const likesModal = useRef();
  const closeLikeModal = useRef();
  const [likePost, setLikePost] = useState();


  const [suggestions, setSuggestions] = useState([]);
  useEffect(()=> {
    getSuggesions(user?._id).then((response)=> {
      setSuggestions(response);
    }).catch((error)=> {
      setError(error);
    })
  },[user])




  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      dispatch(clearLoadedPosts());
    });
  });

  return (
    <>
      <div className="md:ml-auto">
        {/* <PostContainer> */}
        <div
          id="post-container"
          className="md:w-fit w-screen h-screen md:mr-auto bg-stone-900 md:bg-transparent bg-opacity-50 overflow-scroll no-scrollbar"
        >
          {loadedPosts?.map((post, index) => {
            return (
              <SinglePost
                likeModal={likesModal}
                setLikePost={setLikePost}
                setSelectedPost={setSelectedPost}
                key={index}
                postData={post}
                openEditor={openEditor}
              />
            );
          })}
          {loading && (
            <div className="p-10 w-full h-fit flex self-center justify-center items-center select-none">
              <div className="loader">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </div>
          )}
          {lastPost && (
            <div className="w-full h-fit p-10 flex self-center justify-center items-center select-none">
              <span className="font-poppins font-medium">
                --- No more Posts to show ---
              </span>
            </div>
          )}
        </div>
        {/* </PostContainer> */}
      </div>

      <div className="hidden lg:block md:hidden mr-auto ml-auto">
      {suggestions?.length && (
          <SuggestionContainer>
            {suggestions.map((suggestedUser, index) => {
              return <Suggestion user={suggestedUser} key={index} />;
            })}
          </SuggestionContainer>
      )}
      </div>

      <button
        ref={openEditor}
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="hidden"
        type="button"
      />
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <EditPost
          closeEditor={closeEditor}
          post={selectedPost}
          setPost={setSelectedPost}
        />
      </div>
      <button
        ref={closeEditor}
        type="button"
        className="hidden"
        data-modal-hide="default-modal"
      />

      <button
        ref={likesModal}
        type="button"
        data-modal-target="crypto-modal"
        data-modal-toggle="crypto-modal"
        className="hidden"
      />
      <div
        id="crypto-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              ref={closeLikeModal}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="crypto-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Likes
              </h3>
            </div>
            <UserList closeModal={closeLikeModal} userIds={likePost?.likes} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
