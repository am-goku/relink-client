import React from 'react'

function UserPosts({post}) {
  return (
    <>
    
        <div className='aspect-square rounded border-y-2 border-x-2 w-64 bg-slate-600'>
            <img src={post?.image} alt="" className='aspect-square w-full h-full rounded' />
        </div>
    
    </>
  )
}

export default UserPosts