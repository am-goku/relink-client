import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { removeSavedPost, savePost } from '../../services/apiMethods';

function SaveIcn({size, post, setPost, setError}) {

    const user = useSelector((state)=> state?.user?.userData);

    const [isSaved, setIsSaved] = useState(false)

    useEffect(()=> {
      if(user?.savedPosts?.includes(post?._id)){
        setIsSaved(true)
      }
    }, [user, post])

    const saveOrUnsave = () => {
        if(isSaved){
          removeSavedPost(user?._id, post?._id).then((response)=> {
            setPost(response?.post);
            setIsSaved(false)
          }).catch((error) => {
            setError("Something went wrong, Try after some time.");
          })
        } else {
          savePost(user?._id, post?._id)
            .then((response) => {
              setPost(response?.post);
              setIsSaved(true);
            })
            .catch((error) => {
              setError("Unable to save post.")
            });
        }
    }


  return (
    <>
      <svg
                onClick={saveOrUnsave}
                className="cursor-pointer ml-auto mr-2"
                width={size?.width}
                height={size?.height}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#050505"
                  strokeWidth="1.056"
                >
                  <path
                    fill={"#efebeb"}
                    fillRule="evenodd"
                    d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v15.138a1.5 1.5 0 0 1-2.244 1.303l-5.26-3.006a1 1 0 0 0-.992 0l-5.26 3.006A1.5 1.5 0 0 1 4 20.138V5zm11 4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h6z"
                    clipRule="evenodd"
                  ></path>
                </g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill={!isSaved ? "#efebeb" : "#3F5D75"}
                    fillRule="evenodd"
                    d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v15.138a1.5 1.5 0 0 1-2.244 1.303l-5.26-3.006a1 1 0 0 0-.992 0l-5.26 3.006A1.5 1.5 0 0 1 4 20.138V5zm11 4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h6z"
                    clipRule="evenodd"
                  ></path>
                </g>
              </svg>
    </>
  )
}

export default SaveIcn
