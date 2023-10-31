import React, { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

function Test() {


  const [text, setText] = useState('');

  const textRef = useRef()
  

  const emoji = (e) => {
    setText((prev)=> prev+e.emoji);
    textRef.current.value += e.emoji
    
    console.log(e);
  }

  
const send=() => {
  alert(text);
}


  return (
    <>
      <div className="flex gap-5" >
        <input type="text" onChange={(e)=>setText(e.target.value)} ref={textRef} />

        <span>



          <EmojiPicker emojiStyle="telegram" onEmojiClick={emoji}/>

        </span>


        <button onClick={send}> send</button>
        
      </div>
    </>
  );
}

export default Test;
