import React, { useEffect, useState } from "react";

import "./SinglePost.css";


import Dropdown from "../options/Dropdown";
import CaptionWithShowMore from "../options/Caption";
import { getUser } from "../../services/apiMethods";




function SinglePost({post}) {
  const [isRed, setIsRed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [postUser, setPostUser] = useState(null);

  useEffect(()=>{
    getUser(post.userId).then((response)=>{
      if(response.status === 200) {
        setPostUser(response.users[0]);
      } else {
        console.log(response);
      }
    }).catch((error)=>{
      console.log(error);
    })
  },[post])
  

  const likeOrUnlike = () => {
    setIsRed(!isRed);
  };

  const saveOrUnsave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <>
      <div className="p-4 mt-5 w-fit">
        {/* Parent div with padding */}
        <div className="p-2 rounded-md relative w-fit bg-black bg-opacity-75">
          <div className="w-full h-16 flex p-2 gap-3 self-center">
            <div className="bg-white ml-1 w-11 h-11 rounded-full self-center">
              <img src={postUser?.profilePic} alt="" className="rounded-full" />
            </div>
            <div className="text-white font-semibold text-lg self-center">
              {postUser?.name}
            </div>
            <button className="text-white font-thin text-xs font-mono self-center bg-slate-400 rounded-lg w-16 h-5">
              Follow
            </button>

            <div className="self-center ml-auto cursor-pointer">
              <Dropdown />
            </div>
          </div>

          {/* Larger square div for image */}
          <div
            className="max-w-xl mt-2 aspect-square bg-gray-300 rounded-lg overflow-hidden"
            onDoubleClick={likeOrUnlike}
          >
            {/* You can add your image here */}
            <img
              src={post.image}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          {/* show more funtion */}
          <div className="m-2">
            <CaptionWithShowMore text={post.description} />
          </div>
          <div className="mt-1">
            <span className="pl-2 text-white text-sm font-light select-none">{`You and ${2483} others liked this post`}</span>

            <div className="p-2 text-xl flex gap-5 mt-5 font-bold">
              <svg
                className="cursor-pointer ml-1"
                onClick={likeOrUnlike}
                width={34}
                height={36}
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

              <svg
                className="mt-1 cursor-pointer ml-2"
                width={33}
                height={31}
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                // xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#fafafa"
                  strokeWidth="1.536"
                >
                  {" "}
                  <title>comment 2</title>{" "}
                  <desc>Created with Sketch Beta.</desc> <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    sketch="MSPage"
                  >
                    {" "}
                    <g
                      id="Icon-Set-Filled"
                      sketch="MSLayerGroup"
                      transform="translate(-154.000000, -257.000000)"
                      fill="#000000"
                    >
                      {" "}
                      <path
                        d="M177,270 L163,270 C162.448,270 162,269.553 162,269 C162,268.448 162.448,268 163,268 L177,268 C177.552,268 178,268.448 178,269 C178,269.553 177.552,270 177,270 L177,270 Z M175,276 L165,276 C164.448,276 164,275.553 164,275 C164,274.447 164.448,274 165,274 L175,274 C175.552,274 176,274.447 176,275 C176,275.553 175.552,276 175,276 L175,276 Z M170,257 C161.164,257 154,263.269 154,271 C154,275.419 156.345,279.354 160,281.919 L160,289 L167.009,284.747 C167.979,284.907 168.977,285 170,285 C178.836,285 186,278.732 186,271 C186,263.269 178.836,257 170,257 L170,257 Z"
                        id="comment-2"
                        sketch="MSShapeGroup"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>comment 2</title>{" "}
                  <desc>Created with Sketch Beta.</desc> <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    sketch="MSPage"
                  >
                    {" "}
                    <g
                      id="Icon-Set-Filled"
                      sketch="MSLayerGroup"
                      transform="translate(-154.000000, -257.000000)"
                      fill="#d4d4d8"
                    >
                      {" "}
                      <path
                        d="M177,270 L163,270 C162.448,270 162,269.553 162,269 C162,268.448 162.448,268 163,268 L177,268 C177.552,268 178,268.448 178,269 C178,269.553 177.552,270 177,270 L177,270 Z M175,276 L165,276 C164.448,276 164,275.553 164,275 C164,274.447 164.448,274 165,274 L175,274 C175.552,274 176,274.447 176,275 C176,275.553 175.552,276 175,276 L175,276 Z M170,257 C161.164,257 154,263.269 154,271 C154,275.419 156.345,279.354 160,281.919 L160,289 L167.009,284.747 C167.979,284.907 168.977,285 170,285 C178.836,285 186,278.732 186,271 C186,263.269 178.836,257 170,257 L170,257 Z"
                        id="comment-2"
                        sketch="MSShapeGroup"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>

              <svg
                onClick={saveOrUnsave}
                className="cursor-pointer ml-auto mr-2"
                width={36}
                height={37}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePost;
