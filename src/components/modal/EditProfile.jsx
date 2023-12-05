import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CropImage from '../options/CropImg';
import uploadCloudinary from '../../hooks/cloudinary';
import { requestChangePassword, updateUserData } from '../../services/apiMethods';
import SettingsIcn from '../icons/SettingsIcn';
import { updateReduxUser } from '../../utils/reducers/userReducer';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { initFlowbite } from 'flowbite';



function EditProfile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const user = useSelector((state)=> state?.user?.userData);
    const [error, setError] = useState('')

    const [firstName, setFirstName] = useState(user?.name?.split(' ')[0])
    const [lastName, setLastName] = useState(user?.name?.split(" ")[1] || '');
    const [username, setUsername] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [bio, setBio] = useState(user?.bio);

    const [selectedImg, setSelectedImg] = useState(false);
    const [image, setImage] = useState(user?.profilePc);
    const [croppedImg, setCroppedImg] = useState();


    useEffect(()=> {
      initFlowbite()
      setUsername(user?.username);
    }, [user])

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
          setLoading(true);

            let data1;
            if(croppedImg){
                data1 = await uploadCloudinary(croppedImg, setError);
            }

            const name = firstName + " " + lastName;

            const data = {
                name: name,
                profilePic: data1?.secure_url || user?.profilePic,
                phone: phone || '',
                bio: bio || '',
            }

            
            updateUserData(user?.username, data).then((response)=> {
                dispatch(updateReduxUser(response));
                navigate(`/profile/${response?.username}`);
                setLoading(false);
            }).catch((err)=> {
                setError(err.message);
                alertError();
                setLoading(false);
            })

            
        } catch (error) {
            setError(error?.message);
            alertError();
            setLoading(false);
        }
    }



/// password section
const [passError, setPasError] = useState();
const [passSuccuss, setPassSuccuss] = useState();
const [password, setPassword] = useState();
const [cPassword, setCPassword] = useState();
const [pLoading, setPLoading] = useState(false);


const changePassword = () => {
  try {
    setPLoading(true);
    const whitespaceRegExp = /^$|\s+/;
    
    if(password?.length < 5 || !password){
      setPasError("Password must be at least 5 characters.");
      return false;
    }

    if(whitespaceRegExp.test(password)){
      setPasError("Password should not contain whitespaces.");
      return false;
    }

    if(password !== cPassword){
      setPasError("Password is not matching.");
      return false;
    }


    requestChangePassword(user?._id, password).then((response)=> {
      setPassSuccuss("Verification mail has been sent successfully, Please verify your email to confirm password change.");
      return;
    }).catch((err)=> {
      setError(err);
      alertError()
    })

  } catch (error) {
    setError(error);
    alertError()
  } finally {
    setTimeout(()=> {
      setPasError('')
    }, 5000)
    setPLoading(false);
  }
}




  return (
    <>
      {passSuccuss && (
        <div
          id="alert-additional-content-3"
          className="p-4 mb-4 text-green-800 border absolute z-10 border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">Verification has been sent.</h3>
          </div>
          <div className="mt-2 mb-4 text-sm">{passSuccuss}</div>
          <div className="flex">
            <button
              type="button"
              className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
              data-dismiss-target="#alert-additional-content-3"
              aria-label="Close"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="w-full lg:h-screen h-screen flex flex-col justify-center items-center overflow-scroll no-scrollbar p-1 bg-black bg-opacity-75 md:bg-opacity-0">
        {selectedImg ? (
          <CropImage
            imgUrl={image}
            aspectInit={{ value: 1 / 1 }}
            setCroppedImg={setCroppedImg}
            setimgSelected={setSelectedImg}
            setErr={setError}
          />
        ) : (
          <div className="w- md:w-fit h-full overflow-auto no-scrollbar gap-5 flex flex-col py-7 select-none ">
            <div className="EditCard md:w-full w-fit h-fit md:bg-black md:bg-opacity-75 text-white p-5 flex md:flex-col items-center gap-5 rounded-md relative">
              <div
                className="w-fit hidden lg:block h-fit absolute top-5 left-2 cursor-pointer bg-white rounded-full"
                onClick={() => navigate(-1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  width="3rem"
                  color=""
                  viewBox="0 0 512 512"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                </svg>
              </div>
              <div className="aspect-square w-40 rounded-full border-2 border-gray relative">
                <img
                  src={croppedImg || user?.profilePic}
                  alt=""
                  className="rounded-full w-full h-full"
                />
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/webp, image/jpg"
                  name="image"
                  id="image"
                  className="absolute inset-0 w-full h-full rounded-full opacity-0 cursor-pointer"
                  onChange={handleImage}
                />
                <div className="lg:w-9 lg:h-9 hidden lg:block rounded-full absolute bottom-0 right-0 cursor-pointer">
                  <SettingsIcn size={{ width: 36, height: 36 }} />
                </div>
              </div>

              <div className="h-fit w-full grid gap-1 justify-center">
                <span className="text-2xl font-medium">{user?.name}</span>
                <span className="text-sm font-medium">@{username}</span>
              </div>
            </div>

            <div className="EditCard md:w-[60rem] w-fit h-fit md:bg-black md:bg-opacity-75 text-white py-5 md:pr-10 flex flex-col items-center gap-10 rounded-md">
              <div className="w-full h-fit gap-3 md:grid grid-flow-row md:grid-cols-2 md:px-5 px-4">
                <div className="mr-auto w-full flex items-center md:gap-4">
                  <label htmlFor="firstName" className="font-poppins">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    defaultValue={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-x-0 border-t-0 ml-auto md:ml-0 focus:ring-0 bg-transparent"
                  />
                </div>
                <div className="ml-auto w-full flex items-center md:gap-4">
                  <label htmlFor="lastName" className="font-poppins">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-x-0 border-t-0 ml-auto md:ml-0 focus:ring-0 bg-transparent"
                  />
                </div>
                <div className="mr-auto w-full flex items-center md:gap-14">
                  <label htmlFor="email" className="font-poppins">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    disabled
                    className="border-x-0 border-t-0 ml-auto md:ml-0 focus:ring-0 bg-transparent"
                  />
                </div>
                <div className="ml-auto w-full flex items-center gap-3 text-start">
                  <label htmlFor="phone" className="font-poppins mr-9">
                    Phone
                  </label>
                  <input
                    maxLength={10}
                    type="text"
                    name="phone"
                    id="phone"
                    defaultValue={phone || ""}
                    onChange={(e) => setPhone(e.target.value.trim())}
                    className="border-x-0 border-t-0 ml-auto md:ml-0 focus:ring-0 bg-transparent"
                  />
                </div>
                <div className=" ml-auto w-full flex items-center gap-16 text-start mt-5">
                  <label htmlFor="bio" className="font-poppins">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows="5"
                    maxLength={150}
                    defaultValue={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="border-stone-500 focus:ring-0 pr-10 focus:border-black rounded  bg-black"
                  />
                </div>
              </div>
              <div className="bg-slate-700 rounded w-32 h-9 ml-auto flex items-center hover:bg-slate-400">
                {!loading ? (
                  <button
                    className="w-full h-full text-center text-white font-poppins"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="w-full h-full text-center text-white font-poppins flex items-center justify-center"
                    disabled
                  >
                    <FaSpinner
                      size={16}
                      icon="spinner"
                      spin={true}
                      className="ml-auto mr-auto rotating-spinner"
                    />
                  </button>
                )}
              </div>
            </div>

            {/* //////////////////////////////// password change section ////////////////////////////////////////////////////////////////// */}
            <div className="EditCard md:w-[60rem] w-fit h-fit md:bg-black md:bg-opacity-75 text-white p-5 flex flex-col gap-10 rounded-md">
              <span className="text-xl font-semibold">Change Password</span>
              {/* //new password */}
              <div className="w-full h-fit md:gap-3 flex flex- items-center">
                <div className="label md:w-40">
                  <span>New password</span>
                </div>
                <div className="flex gap-12 justify-center items-center">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value.trim())}
                    className="bg-transparent focus:border-black focus:ring-0 border-x-0 border-t-0"
                  />
                </div>
              </div>

              {/* confirm password */}
              <div className="w-full h-fit md:gap-3 flex items-center">
                <div className="label md:w-40">
                  <span>Confirm password</span>
                </div>
                <div className="flex gap-12 justify-center items-center">
                  <input
                    type="password"
                    name="CPassword"
                    id="CPassword"
                    onChange={(e) => setCPassword(e.target.value.trim())}
                    className="bg-transparent focus:border-black focus:ring-0 border-x-0 border-t-0"
                  />
                </div>
              </div>
              {passError && (
                <span className="text-sm text-red-700 self-end">
                  ! {passError}
                </span>
              )}
              <div className="bg-slate-700 rounded p-2 h-9 ml-auto flex items-center hover:bg-slate-400">
                <button
                  className="w-full h-full text-center text-white font-poppins"
                  onClick={changePassword}
                  disabled={pLoading}
                >
                  {pLoading ? (
                    <FaSpinner
                      size={16}
                      icon="spinner"
                      spin={true}
                      className="ml-auto mr-auto rotating-spinner"
                    />
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EditProfile