import React from 'react'
import Heart from '../components/icons/Heart';
import SaveIcn from '../components/icons/SaveIcn';
import CommentIcn from '../components/icons/CommentIcn';
import Comment from '../components/comment/Comment';


function Test() {

  return (
    <>

      <div className='h-screen justify-center items-center flex'>


      <div className='bg-[#33363F] w-fit h-screen lg:h-fit lg:flex lg:p-5 gap-2 select-none'>
        <div className=' aspect-square lg:w-96 h-fit rounded p-3 text-white'>
          <img src="https://res.cloudinary.com/di9yf5j0d/image/upload/v1696488937/Relink_posts/o7raapftuniucjw73c9r.jpg" alt="" className='lg:w-96 rounded' />
            <div className='lg:w-96 flex max-h-40'>
              <h4 className='m-1 font-poppins truncate'>
                This is a caption......
              </h4>
            </div>

          <div className='flex mt-2'>
              <Heart size={{width:30, height:30}} />
              <SaveIcn size={{width:30, height:30}} />
          </div>
          <div className='flex m-1 text-sm font-mono'>
              <span>Liked by 2483 people</span>
              <span className='ml-auto'>Saves: 180</span>
          </div>
        </div>
        <div className='bg-[#C6C1C1] aspect-square lg:w-120 rounded'>
            <div className='bg-slate-500 w-full h-fit p-3 flex items-center gap-3 rounded'>
              <div className='rounded-full bg-white w-10 h-10'></div>
              <h4 className='font-poppins font-semibold'>Gokul Krishna</h4>
              <button className='w-20 h-5 bg-stone-500 rounded-lg text-xs font-semibold'>Follow</button>
            </div>
            <div className='mt-3 flex gap-2'>
              <CommentIcn size={{ width: 20, height: 20 }} />
              <span>Comments: 87</span>
            </div>
            <div className='w-full h-32 mt-5'>
                <div className='w-full bg-[#1E1E1E73] h-32'>
                  <Comment />
                </div>
            </div>

        </div>
      </div>




      </div>

    </>
  );
}

export default Test