import React from "react";
import { useNavigate } from "react-router-dom";

function SearchResult({ users }) {
    const navigate = useNavigate();


  return (
    <>
      <div className="bg-opacity-75 text-white w-full h- rounded grid gap-2 overflow-auto no-scrollbar">
        {users.map((user, index) => {
          return (
            <div
                key={user._id}
                onClick={()=> navigate(`/profile/${user.username}`)}
              className="flex p-5 items-center gap-3 cursor-pointer hover:bg-slate-300 hover:opacity-70"
              style={{
                transform: "translateY(10px)",
                transition: "opacity 0.3s, transform 0.3s",
                animation: "fadeIn 0.3s ease-in-out",
                animationFillMode: "forwards",
              }}
            >
              <div className="w-10 h-10 bg-black rounded-full">
                <img src={user?.profilePic} alt="" className="w-full h-full rounded-lg" />
              </div>
              <div className="text-start grid">
                <span>{user?.name}</span>
                <span className="text-xs">@{user?.username}</span>
              </div>
            </div>
          );
        })}
      </div>










    </>
  );
}

export default SearchResult;
