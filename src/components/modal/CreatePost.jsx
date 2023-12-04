import React, { useEffect, useState } from "react";

import bgIcon from "../../assets/icon_assets/pngwing.com.png";
import CropImage from "../options/CropImg";
import uploadCloudinary from "../../hooks/cloudinary";
import { useDispatch, useSelector } from "react-redux";
import { postCreatePost } from "../../services/apiMethods";
import { useNavigate } from "react-router-dom";
import {FaSpinner} from "react-icons/fa";

import "./CreatePost.css"
import { addCreatedPost, updateUserPosts } from "../../utils/reducers/postReducer";

function CreatePost({ setClose }) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState(""); // state for setting error occurs
  const [selectedImg, setSelectedImg] = useState(false); //state to set the image selected by client
  const [bg, setBg] = useState(bgIcon);
  const [description, setDescription] = useState(""); // state to set the caption of the post

  const [croppedImg, setCroppedImg] = useState();
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false); // state to set the loading

  const userData = useSelector((state)=>state?.user?.userData);


  useEffect(() => {
    setBg(croppedImg || bgIcon);
  }, [croppedImg]);

  const handleImage = (e) => {
    const img = e.target.files[0];
    try {
      setError("");
      setImage(URL.createObjectURL(img));
      setSelectedImg(true);
    } catch (error) {
      setError(error);
    }
  };


  const clearComponent = () => {
    setError("");
    setSelectedImg(false);
    setDescription("");
    setCroppedImg(null);
    setImage(null);
  }

  const handleSubmit = async () => {

    setLoading(true);

    if (!croppedImg) {
      setError("Please select an image");
      setLoading(false);
      return;
    }

    const data1 = await uploadCloudinary(croppedImg, setError);

    if (data1) {
      const postData = {
        userId: userData._id,
        image: data1.secure_url,
        description: description,
      };

      postCreatePost(postData).then((response) => {
        setLoading(false);
        if (response.status === 200) {

          dispatch(updateUserPosts(response));
          dispatch(addCreatedPost(response.post));
          setClose(true);
        } else if(response.status === 401) {
          navigate("/login");
        } else {
          setError(response.message);
        };
      }).finally(()=> {
        clearComponent()
      })
    }

  };

  return (
    <>
      <div className="h-screen place-items-center grid">
        {selectedImg ? (
          <CropImage
            imgUrl={image}
            aspectInit={{ value: 1 / 1 }}
            setCroppedImg={setCroppedImg}
            setimgSelected={setSelectedImg}
            setErr={setError}
          />
        ) : null}

        <div className="md:flex grid md:gap-5 gap-10 w-fit h-fit bg-slate-700 p-14 m-auto rounded-lg">
          <div className="bg-neutral-500 w-72 h-72 flex-1 relative rounded-md flex justify-center">
            <img src={bg} alt="" className="w-64 h-64 self-center " />

            <input
              type="file"
              accept="image/jpeg, image/png, image/webp, image/jpg"
              name="image"
              id="image"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImage}
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="forForm w-96 md:h-56 h-40  bg-slate-500 overflow-scroll no-scrollbar relative rounded-md">
              <textarea
                type="text"
                name="caption"
                id="caption"
                placeholder="Write a caption ...."
                className="w-full h-full bg-transparent placeholder-slate-300 absolute top-0 left-0"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>

            {error ? (
              <h3 className="error-msg ml-2 text-red-800">{`! ${error}`}</h3>
            ) : null}

            <div className="ml-auto text-white text-lg font-normal font-['Inika']">
              <button
                className="flex-1 w-28 h-8 bg-red-900 bg-opacity-80 rounded-lg mr-5"
                onClick={() => {
                  setClose(true);
                  setSelectedImg(false);
                  setDescription("");
                  setImage("");
                  setCroppedImg("");
                  setError("");
                }}
              >
                Cancel
              </button>
              {
                !loading?
                <button
                className="flex-1 w-28 h-8 bg-sky-700 bg-opacity-80 rounded-lg"
                onClick={handleSubmit}
              >
                Post
              </button>
              : <button
                className=" flex-1 w-28 h-8 bg-sky-700 bg-opacity-80 rounded-lg items-center justify-center"
              > <FaSpinner size={16} icon="spinner" spin={true} className="ml-auto mr-auto rotating-spinner"  />
              </button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
