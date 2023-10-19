import React from 'react'

function SenderText({text}) {
  return (
    <>
      <div className="bg-white w-fit p-3 grid grid-cols-1 max-w-lg rounded-b-lg rounded-r-lg pr-10">
        <span className=''>
          {text}
        </span>
      </div>
    </>
  );
}

export default SenderText