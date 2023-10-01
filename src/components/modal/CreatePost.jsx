import React, { useState } from 'react'

function CreatePost() {

    const [img, setImg] = useState('')

    const abc =  ()=> {
        setImg('../../images/relink.png')
    }


  return (
    <>
      <div className="h-screen place-items-center grid">
        <form action="">
          <div className="bg-white w-60 h-60">

          </div>

          <div className="forForm">
            <label htmlFor="caption">Caption: </label>
            <textarea type="text" name='caption' id='caption' />
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePost