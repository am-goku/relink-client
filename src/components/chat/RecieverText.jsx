import React from 'react'

function RecieverText({text}) {
  return (
    <>
      <div className="bg-purple-400 w-fit p-3 grid grid-cols-1 max-w-lg rounded-b-lg ml-auto rounded-l-lg pr-10">
        <span className="">{text}</span>
      </div>
    </>
  );
}

export default RecieverText