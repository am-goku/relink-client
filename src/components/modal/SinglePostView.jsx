import React, { useEffect, useRef, useState } from 'react'
import SaveIcn from '../icons/SaveIcn';
import Heart from '../icons/Heart';
import SendIcn from '../icons/SendIcn';
import Comment from '../comment/Comment';
import { addComment, fetchAPost, fetchComments, getUser } from '../../services/apiMethods';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SinglePostView({postId}) {


    const [post, setPost] = useState()
    const navigate = useNavigate()
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const txtArea = useRef(null);
    
    const [postOwner, setPostOwner] = useState({});
    const [error, setError] = useState('');

    const user = useSelector((state)=> state?.user?.userData);

    //fetching the details post post with postId
    useEffect(() => {
      fetchAPost(postId)
        .then((response) => {
          setPost(response);
        })
        .catch((error) => {
          setError(error);
          navigate("/NotFound");
        });
    }, [postId, navigate]);

    //fetching the comments for a post with postId
    useEffect(() => {
      fetchComments(postId)
        .then((response) => {
          setComments(response);
        })
        .catch((error) => {
          setError(error?.message);
        });
    }, [post, postId]);

    //fetching the details of the user posted the post with userId inside post
    useEffect(() => {
      if (post) {
        getUser(post?.userId)
          .then((response) => {
            setPostOwner(response[0]);
          })
          .catch((error) => {
            setError(error?.message);
          });
      }
    }, [post]);

    //setting up error messages
    useEffect(()=> {
      if(error){
        toast.warn(error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setError('');
      }
    }, [error])

    //function to add a new comment
    const postComment = () => {
      if(!newComment){
        setError("Please add a comment")
        return;
      }

      //calling api
      addComment(user?._id, postId, newComment).then((response) => {
        setComments([response, ...comments]);
        txtArea.current.value = '';
        setNewComment('');
      }).catch((error) => {
        setError(error?.message)
      })
    }


  return (
    <>
      <div
        className="w-fit hidden lg:block h-fit absolute top-28 left-96 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          width="3rem"
          viewBox="0 0 512 512"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
        </svg>
      </div>
      <div className="bg-[#C6C1C1] w-full lg:w-fit lg:h-fit h-full ml-auto mr-auto p-5 lg:flex gap-10 select-none">
        <div className="postImage border-black bg-[#b4b2b2] lg:border-r-2 p-2 grid gap-3 lg:w-fit w-full">
          <div className="userInfo flex items-center gap-3">
            <div
              className="profilePic rounded-full aspect-square w-10"
              onClick={() => navigate(`/profile/${postOwner?.username}`)}
            >
              <img
                src={postOwner?.profilePic}
                alt=""
                className="rounded-full"
              />
            </div>
            <span
              className="font-medium text-lg"
              onClick={() => navigate(`/profile/${postOwner?.username}`)}
            >
              {postOwner?.name || postOwner?.username}
            </span>
          </div>
          <div className="lg:w-[40rem] w-full self-center flex flex-col justify-center gap-2">
            <img
              src={post?.image}
              alt=""
              className="rounded select-none"
              draggable={false}
            />
            {post?.description ? (
            <div className="max-w-xl max-h-40 flex flex-col w-full  overflow-y-auto no-scrollbar">
              <span className="font-poppins">{post?.description}</span>
            </div>
          ) : null}
          </div>
          
          <div className="flex mt-2 ml-2 gap-8 text-center">
            <div className="">
              <Heart
                size={{ width: 32, height: 32 }}
                post={post}
                setPost={setPost}
              />
              <span className="">{post?.likes?.length}</span>
            </div>
            <div className="">
              <SaveIcn
                size={{ width: 32, height: 32 }}
                post={post}
                setPost={setPost}
                setError={setError}
              />
              <span>{post?.saved?.length}</span>
            </div>
          </div>
        </div>
        <div className="lg:w-[30rem] h-fit w-full mt-5 pb-2 relative">
          <span className="font-medium">Comments : {comments.length}</span>
          <div className="bg-stone-400 flex gap-3 w-full h-fit rounded-lg mt-3 p-2">
            <textarea
              ref={txtArea}
              placeholder="Add a comment"
              type="text"
              className="bg-transparent w-full rounded-lg"
              onChange={(e) => setNewComment(e.target.value.trim())}
            />

            <button
              className={`text-center w-fit h-full rounded-md items-center flex justify-center}`}
              onClick={postComment}
            >
              <SendIcn size={{ width: 35, height: 35 }} />
            </button>
          </div>
          <div className="border border-black w-full lg:max-h-[38rem] h-fit max-h-[40rem] overflow-auto no-scrollbar mt-4 relative p-5 flex flex-col gap-3 rounded">
            {comments.map((comment, index) => {
              return <Comment data={comment} key={comment._id} />;
            })}
            {comments?.length === 0 ? <span>No comments</span> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePostView