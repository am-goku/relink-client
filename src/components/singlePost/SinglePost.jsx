import React, { useState } from "react";

import "./SinglePost.css";

import heartSvg from "../../assets/icon_assets/heart-svgrepo-com-filled.svg";




function SinglePost() {

const [isRed, setIsRed] = useState(false);
const [isSaved, setIsSaved] = useState(false);

const likeOrUnlike = () => {
  setIsRed(!isRed);
}


const saveOrUnsave = () => {
  setIsSaved(!isSaved);
}









  return (
    <>
      <div className="p-4 w-fit">
        {/* Parent div with padding */}
        <div className="p-2 rounded-md relative bg-red-300 w-fit">
          {/* Larger square div for image */}
          <div
            className="max-w-xl aspect-square bg-gray-300 rounded-lg overflow-hidden"
            onDoubleClick={likeOrUnlike}
          >
            {/* You can add your image here */}
            <img
              src="https://res.cloudinary.com/di9yf5j0d/image/upload/v1695795823/om0qyogv6dejgjseakej.png"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>

          <div className="mt-1">
            <span className="pl-2 font-medium select-none">{`You and ${2483} others liked this post`}</span>

            <div className="p-2 text-xl flex gap-5 mt-5 font-bold">
              <svg
                className="cursor-pointer"
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
                    fill={!isRed ? "#e5e1e1" : "#d62929"}
                  ></path>{" "}
                </g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                    fill={!isRed ? "#e5e1e1" : "#d62929"}
                  ></path>{" "}
                </g>
              </svg>

              <svg
                onClick={saveOrUnsave}
                className="cursor-pointer"
                width={36}
                height={37}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#050505"
                  stroke-width="1.056"
                >
                  <path
                    fill={"#efebeb"}
                    fill-rule="evenodd"
                    d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v15.138a1.5 1.5 0 0 1-2.244 1.303l-5.26-3.006a1 1 0 0 0-.992 0l-5.26 3.006A1.5 1.5 0 0 1 4 20.138V5zm11 4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h6z"
                    clip-rule="evenodd"
                  ></path>
                </g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill={!isSaved ? "#efebeb" : "#080707"}
                    fill-rule="evenodd"
                    d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v15.138a1.5 1.5 0 0 1-2.244 1.303l-5.26-3.006a1 1 0 0 0-.992 0l-5.26 3.006A1.5 1.5 0 0 1 4 20.138V5zm11 4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h6z"
                    clip-rule="evenodd"
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
