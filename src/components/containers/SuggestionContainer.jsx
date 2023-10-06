import React from 'react'

function SuggestionContainer({children}) {
  
  return (
    <>
      <div className="w-fit mt-10 rounded-lg p-5 bg-stone-900 bg-opacity-75 overflow-scroll no-scrollbar m-5">
        <div className="text-white font-semibold text-xl">
          Suggested profiles
        </div>
        <div className='mt-8'>{children}</div>
      </div>
    </>
  );
}

export default SuggestionContainer