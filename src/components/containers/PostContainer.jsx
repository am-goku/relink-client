import React from 'react'

function PostContainer({children}) {
  return (
    <>
      <div className="w-fit h-screen md:mr-auto bg-stone-900 bg-opacity-75 overflow-scroll no-scrollbar">
        {children}
      </div>
    </>
  );
}

export default PostContainer