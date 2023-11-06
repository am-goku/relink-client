import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { likePost, unlikePost } from '../../services/apiMethods';

function Heart({size, color, post, setPost}) {

    const [isRed, setIsRed] = useState(false);

    const user = useSelector((state)=> state?.user?.userData)

    useEffect(()=>{
        if(post?.likes?.includes(user?._id)){
            setIsRed(true);
        } else {
            setIsRed(false);
        }
    }, [user, post]);


    const likeOrUnlike = () => {
        if(isRed){
            unlikePost(user?._id, post?._id).then((response)=> {
                setPost(response)
            }).catch((error)=> {
                console.log(error);
            })
        } else {
            likePost(user?._id, post?._id).then((response)=> {
                setPost(response);
            }).catch((error)=> {
                console.log(error);
            })
        }
    }

    return (
        <>

            <svg
                className="cursor-pointer ml-1"
                onClick={likeOrUnlike}
                width={size?.width}
                height={size?.height}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#030303"
                    strokeWidth="2.592"
                >
                    {" "}
                    <path
                        d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                        fill={!isRed ? "#d4d4d8" : "#d62929"}
                    ></path>{" "}
                </g>
                <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                        d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                        fill={!isRed ? "#d4d4d8" : "#d62929"}
                    ></path>{" "}
                </g>
            </svg>

        </>
    )
}

export default Heart
