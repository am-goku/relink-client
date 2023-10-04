import React, { useEffect, useState } from "react";

import bgIcon from "../../assets/icon_assets/pngwing.com.png";
import CropImage from "../options/CropImg";
import uploadCloudinary from "../../hooks/cloudinary";
import { postUrl } from "../../const/routes";
import { apiCall } from "../../services/apiCalls";

function CreatePost({ setClose }) {
  // const [isOpen, setIsOpen] = useState(false);

  const [error, setError] = useState(""); // state for setting error occurs
  const [selectedImg, setSelectedImg] = useState(false); //state to set the image selected by client
  const [bg, setBg] = useState(bgIcon);
  const [description, setDescription] = useState(""); // state to set the caption of the post

  const [croppedImg, setCroppedImg] = useState();
  const [image, setImage] = useState("");

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

  const handleSubmit = async () => {
    if (!croppedImg) {
      setError("Please select an image");
      return;
    }

    const data1 = await uploadCloudinary(croppedImg, setError);

    if (data1) {
      const postData = {
        userId: "",
        image: data1.secure_url,
        description: description,
      };

      apiCall("post", postUrl.create, postData).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
        } else {
          console.log(response);
          setError(response.message);
        }
      });
    }

    console.log("data1: ", data1);
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
              <button
                className="flex-1 w-28 h-8 bg-sky-700 bg-opacity-80 rounded-lg"
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
