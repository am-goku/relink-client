import React from 'react'
import SendIcn from '../icons/SendIcn'

function TypeBox({setText, sendText}) {
  return (
    <>
      <div className="w-11 h-11 aspect-square bg-white flex justify-center items-center rounded-lg relative">
        <input
          type="file"
          name="image"
          id="image"
          accept="image/jpeg, image/png, image/webp, image/jpg"
          className="inset-0 w-full h-full absolute opacity-0"
        />
        <svg
            width={56}
            height={25}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M5.12012 17.8508L15.9999 8L20.9999 12.5M3 13.2L6.63259 10L10.4737 13M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </div>

      <div className="w-[65rem] bg-white h-12 rounded-full ml-auto">
        <input
          type="text"
          placeholder="Type something ..."
          className="border-none w-full h-full rounded-lg"
          onChange={(e)=> setText(e.target.value)}
        />
      </div>

      <div className="w-14 h-10 aspect-square bg-white flex items-center justify-center rounded-lg ml-auto" onClick={sendText}>
        <SendIcn size={{ width: 36, height: 32 }} />
      </div>
    </>
  );
}

export default TypeBox