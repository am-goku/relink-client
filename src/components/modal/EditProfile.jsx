import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CropImage from '../options/CropImg';
import uploadCloudinary from '../../hooks/cloudinary';
import { updateUserData } from '../../services/apiMethods';



function EditProfile({setIsEdit}) {

    const navigate = useNavigate()
    const user = useSelector((state)=> state?.user?.userData);
    const [error, setError] = useState('')

    const [firstName, setFirstName] = useState(user?.name?.split(' ')[0])
    const [lastName, setLastName] = useState(user?.name?.split(" ")[1]);
    const [username, setUsername] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [bio, setBio] = useState(user?.bio);

    const [selectedImg, setSelectedImg] = useState(false);
    const [image, setImage] = useState(null);
    const [croppedImg, setCroppedImg] = useState();
    const [profilePic, setProfilePic] = useState(user?.profilePic)

    const alertError = () => {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setError('');
    };

    const handleImage = (e) => {
        const img = e.target.files[0]
        try {
            setImage(URL.createObjectURL(img));
            setSelectedImg(true);
        } catch (error) {
            setError(error)
            alertError();
        }
    }

    


    const handleUpdate = async () => {
        try {

            let data1;
            if(croppedImg){
                data1 = await uploadCloudinary(croppedImg, setError);
                setProfilePic(data1.secure_url);
            }

            const name = firstName + " " + lastName;

            const data = {
                name: name,
                profilePic: profilePic,
                phone: phone || '',
                bio: bio || ''
            }

            
            updateUserData(user?.username, data).then((response)=> {
                console.log('updated response', response);
            }).catch((err)=> {
                console.log('update error', err);
            })

            
        } catch (error) {
            setError(error.message);
            console.log(error);
            alertError();
        }
    }

  return (
    <>

      {selectedImg?
      
      
      (
        <CropImage imgUrl={image}
            aspectInit={{ value: 1 / 1 }}
            setCroppedImg={setCroppedImg}
            setimgSelected={setSelectedImg}
            setErr={setError} />
      )
      
      
      
      
      :(<div className="w-fit h-full overflow-auto no-scrollbar gap-5 flex flex-col py-7 select-none">
        <div className="EditCard w-[60rem] h-fit bg-[#C6C1C1] p-5 flex flex-col items-center gap-5 rounded-md relative">
          <div
            className="w-fit hidden lg:block h-fit absolute top-5 left-2 cursor-pointer"
            onClick={() => setIsEdit(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              width="3rem"
              viewBox="0 0 512 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
            </svg>
          </div>
          <div className="aspect-square w-40 rounded-full bg-black border-2 border-black relative">
            <img src={profilePic} alt="" className="rounded-full" />
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp, image/jpg"
              name="image"
              id="image"
              className="absolute inset-0 w-full h-full rounded-full opacity-0 cursor-pointer"
              onChange={handleImage}
            />
          </div>

          <div className="h-fit w-full grid gap-1 justify-center">
            <span className="text-2xl font-medium">Gokul Krishna</span>
            <span className="text-sm font-medium">@{username}</span>
          </div>
        </div>

        <div className="EditCard w-[60rem] h-fit bg-[#C6C1C1] p-5 flex flex-col items-center gap-10 rounded-md">
          <div className="w-full h-fit gap-3 grid grid-flow-row grid-cols-2 px-5">
            <div className="mr-auto flex items-center gap-4">
              <label htmlFor="firstName" className="font-poppins">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                defaultValue={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border-x-0 border-t-0 focus:ring-0 bg-transparent"
              />
            </div>
            <div className="ml-auto flex items-center gap-4">
              <label htmlFor="lastName" className="font-poppins">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border-x-0 border-t-0 focus:ring-0 bg-transparent"
              />
            </div>
            <div className="mr-auto flex items-center gap-14">
              <label htmlFor="email" className="font-poppins">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
                className="border-x-0 border-t-0 focus:ring-0 bg-transparent"
              />
            </div>
            <div className="ml-auto flex items-center gap-3 text-start">
              <label htmlFor="phone" className="font-poppins mr-9">
                Phone
              </label>
              <input
                maxLength={10}
                type="text"
                name="phone"
                id="phone"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-x-0 border-t-0 focus:ring-0 bg-transparent"
              />
            </div>
            <div className=" ml-auto flex items-center gap-16 text-start mt-5">
              <label htmlFor="bio" className="font-poppins">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                cols="60"
                rows="5"
                maxLength={150}
                onChange={(e) => setBio(e.target.value)}
                className="border-stone-500 focus:ring-0 focus:border-black rounded bg-[#d6d3d3]"
              />
            </div>
          </div>
          <div className="bg-slate-700 rounded w-32 h-9 ml-auto flex items-center hover:bg-slate-400">
            <button
              className="w-full h-full text-center text-white font-poppins"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>

        <div className="EditCard w-[60rem] h-fit bg-[#C6C1C1] p-5 flex flex-col items-center gap-10 rounded-md">
          <span className="text-2xl">Change Password</span>
          <div className="w-full h-fit gap-3 flex flex-col">
            <div className="flex gap-12 justify-center items-center">
              <input type="password" name="" id="" />
            </div>
          </div>
        </div>
      </div>)}
    </>
  );
}

export default EditProfile