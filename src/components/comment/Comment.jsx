import React from "react";

function Comment() {
  return (
    <>
      <div className="w-fit h-fit bg-slate-400 flex gap-2 items-center rounded-lg p-5">
        <div className="aspect-square w-8 rounded-full bg-black self-start" />
        <div className="col-span-1">
          <span className="font-medium text-base ">Joel V Jose</span>
          <div className="mt-2 font-poppins text-sm flex flex-col">
            <span className=" max-w-lg">
              This is a comment to the post uciweciwebiwe qibxiqwns qwbsqwonqw
              eibdendoedb
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
