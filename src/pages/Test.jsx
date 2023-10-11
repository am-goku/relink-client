import React from "react";
import Heart from "../components/icons/Heart";
import SaveIcn from "../components/icons/SaveIcn";
import Comment from "../components/comment/Comment";
import SendIcn from "../components/icons/SendIcn";

function Test() {
  return (
    <>
      <div className="bg-[#C6C1C1] w-fit h-fit ml-auto mr-auto p-5">
        <div className="postImage border-black border-y-2 border-x-2 p-2 grid gap-3">
          <div className="userInfo flex items-center gap-3">
            <div className="profilePic rounded-full bg-black aspect-square w-10"></div>
            <span className="font-medium text-lg">Gokul Krishna</span>
          </div>
          <img
            src="https://res.cloudinary.com/di9yf5j0d/image/upload/v1696498267/Relink_posts/eixoucrinfm3jfypc2qc.jpg"
            alt=""
          />
          <div className="max-w-xl max-h-40 flex flex-col overflow-y-auto no-scrollbar">
            <span className="font-poppins">
              This is a caption knxowijxowdieowx sxoixoenxox xoiqnxoqo xnqeoxnq
              xewox nwedxnon ydbcisdcjhdbcsdwbcw dcwb nciwbciwbecw wecowecwenc
              wceneoc nwoecnwon xewox nwedxnon ydbcisdcjhdbcsdwbcw dcwb
              nciwbciwbecw wecowecwenc wceneoc nwoecnwonxewox
            </span>
          </div>
        </div>
        <div className="flex mt-5 ml-2 gap-8 text-center">
          <div className="">
            <Heart size={{ width: 32, height: 32 }} />
            <span className="">106</span>
          </div>
          <div className="">
            <SaveIcn size={{ width: 32, height: 32 }} />
            <span className="">72</span>
          </div>
        </div>
        <div className="w-full h-fit mt-5 relative">
          <span className="font-medium">Comments : 36</span>
          <div className="bg-stone-400 flex gap-3 w-full h-fit rounded-lg mt-3 p-2">
            <textarea
              placeholder="Add a comment"
              type="text"
              className="bg-transparent w-full rounded-lg"
            />

            <button className="text-center w-fit h-full rounded-md items-center flex justify-center">
              <SendIcn size={{ width: 35, height: 35 }} />
            </button>
          </div>
          <div className="bg-slate-500 w-full h-[40rem] overflow-auto no-scrollbar mt-4 relative p-5 flex flex-col gap-3 rounded">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;
