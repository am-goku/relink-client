import React, { useEffect, useState } from 'react'
import {fetchComments} from "../../services/apiMethods"
import { updatePost } from '../../services/admin/apiMethods';

function EditPost({post, setPost, closeEditor}) {

    const [comments, setComments] = useState()

    const [error, setError] = useState('')

    const [caption, setCaption] = useState(post?.description);

    const [sameCap, setSameCap] = useState(true);

    useEffect(()=> {
      setError('')
      fetchComments(post?._id).then((comment)=> {
        setComments(comment);
      }).catch((error)=> {
        setError(error?.message);
      })
    }, [post])


    const manageCaption = (e) => {
      setCaption(e.target.value.trim());

      if(caption === post?.description){
        setSameCap(true);
      } else {
        setSameCap(false);
      }
    }


    const handleSubmit = () => {
        if(!sameCap){
          updatePost(post?._id, caption).then((response)=> {
            setPost(response)
            closeEditor.current.click();
          }).catch((error)=> {
            setError(error?.message)
          })
        }
    }


  return (
    <>
      <div className="bg-[#C6C1C1] h-fit w-fit self-center grid md:flex gap-10 items-start justify-center p-10 rounded">
        <div className="flex md:grid gap-3">
          <div className="bg-red-400 max-w-96 h-52 md:h-96 aspect-square rounded">
            <img
              src={post?.image}
              alt=""
              className="w-full h-full rounded"
            />
          </div>
          <div className=" w-full rounded-none flex flex-col gap-5 justify-end">
            {post?.likes && <span className="font-poppins">Likes : {post?.likes?.length}</span>}
            {post?.saves && <span className="font-poppins">Saves : {post.saves?.length}</span>}
            {comments?.length>0 && <span className="font-poppins">Comments : {comments?.length}</span>}
          </div>
        </div>

        <div className="w-96  md:h-96 h-64 rounded relative flex flex-col">
          <div className="w-full h-40">
            <textarea
              defaultValue={post?.description}
              placeholder="Add a caption"
              name="caption"
              id="caption"
              cols="34"
              rows="6"
              maxLength={99}
              className="h-fit w-fit rounded bg-[#3f3d3d33] focus:ring-0 focus:border-black"
              onChange={manageCaption}
            ></textarea>
            {error && <span className='text-red-500 text-sm'>! {error}</span>}
          </div>

          <div className="w-full h-10 absolute bottom-0 gap-3 flex">
            <button onClick={()=>closeEditor.current.click()} className="bg-red-600 px-8 rounded ml-auto text-white hover:bg-red-800">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={sameCap} className={`bg-blue-800 px-8 rounded text-white hover:bg-blue-700`}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPost