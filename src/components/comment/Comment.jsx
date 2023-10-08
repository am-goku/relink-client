import React from 'react'

function Comment() {
  return (
    <>
        <div className='w-fit h-fit bg-slate-400 flex gap-2 items-center'>
            <div className='aspect-square w-8 rounded-full bg-black self-start' />
            <div className='col-span-1'>
                <span className='font-semibold text-base '>Joel V Jose</span>
                <div className='mt-2 font-poppins text-sm'>
                <span className='flex-row'>This is a comment to the post</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Comment
