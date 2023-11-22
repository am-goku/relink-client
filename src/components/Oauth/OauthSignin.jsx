import React, { useEffect, useRef, useState } from 'react'
import googleIcn from "../../images/Google_Icn.png";


import {signInWithPopup} from "firebase/auth"
import { auth, provider } from '../../firebase';
import { OauthLogin, registerOauth } from '../../services/apiMethods';
import { initFlowbite } from 'flowbite';
import { useDispatch } from 'react-redux';
import { refreshToken, userAuth } from '../../const/localStorage';
import { setReduxUser } from '../../utils/reducers/userReducer';
import NotifyHeader from '../error/NotifyHeader';



function OauthSignin() {

  useEffect(()=> initFlowbite());

  const [userData, setUserData] = useState(null)
  const modalRef = useRef()
  const dispatch = useDispatch()
  const [username , setUsername] = useState(null)
  const [error, setError] = useState(null)


  useEffect(()=>{
    if(error){
      setTimeout(()=> {
        setError(null)
      }, 5000)
    }
  }, [error])





    const googeSignIn = async (data) => {
      try {
        OauthLogin(data).then((response)=> {
          localStorage.setItem(userAuth, response?.tokens?.accessToken);
          localStorage.setItem(refreshToken, response?.tokens?.refreshToken);
          dispatch(setReduxUser({userData: response?.user, validUser: response?.isValid}));
          window.location.reload();
        }).catch((error) => {
          if(error?.error_code === "USER_NOT_FOUND" && error?.status === 404){
            setUsername('')
            setUserData(data);
            modalRef.current.click();
          }

          if(error?.status === 403){
            setError("Sorry, Your account has been temporarily blocked.");
          }
        })
      } catch (error) {
        setError(error?.message)
      }
    }



    const popup = () => {
        signInWithPopup(auth, provider).then((result)=> {
          const user = result.user;
          const newData = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
          }
          googeSignIn(newData);
        }).catch((error) => {
          setError(error?.message)
        })
    }



    const register = () => {

      try {
        if(!username){
          setError('Username is required.');
          return false;
        }


        registerOauth({...userData, username}).then((response) => {
          localStorage.setItem(userAuth, response?.tokens?.accessToken);
          localStorage.setItem(refreshToken, response?.tokens?.refreshToken);
          dispatch(setReduxUser({userData: response?.user, validUser: response?.isValid}));
          window.location.reload();
        }).catch((error) => {
          setError(error?.message);
        })

      } catch (error) {
        setError(error?.message);
      }
    }


  return (
    <>
      <button
        type="submit"
        className="flex items-center gap-2 w-full justify-center rounded-md bg-[#1e1e1ec4] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={popup}
      >
        <img
          src={googleIcn}
          alt=""
          draggable={false}
          className="w-7 aspect-square"
        />
        Sign in with Google
      </button>

{
  error && <NotifyHeader error={error} />
}


{/* modal area for signup and username */}


<button ref={modalRef} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="hidden" type="button">
  Toggle modal
</button>

<div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    
    
{
  error &&  <div id="sticky-banner" tabIndex="-1" className="fixed top-0 left-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-red-500 opacity-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center mx-auto">
                  <p className="flex items-center text-sm font-normal text-white opacity-100 dark:text-gray-400">
                      <span className="inline-flex p-1 mr-3 bg-gray-200 rounded-full dark:bg-gray-600 w-6 h-6 items-center justify-center">
                          <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                              <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z"/>
                          </svg>
                          <span className="sr-only">Light bulb</span>
                      </span>
                      <span>{error}</span>
                  </p>
              </div>
              <div className="flex items-center">
                  <button data-dismiss-target="#sticky-banner" type="button" className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Close banner</span>
                  </button>
              </div>
            </div>
}

    
    
    
    <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-[#C6C1C1] rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
                {/* <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create new account</h3> */}
                <div className="space-y-6 flex flex-col justify-center">
                  <img src={userData?.image} alt="" draggable={false} className='w-20 aspect-square bg-black rounded-full self-center' />
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="authEmail" value={userData?.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@example.com" required />
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username <span className='text-red-700'>*</span></label>
                        <input type="text" onChange={(e)=> setUsername(e.target.value.trim())} name="username" id="username" placeholder='Enter a username' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                   

                    <div className="flex justify-between" />
                        
                    <button type="button" onClick={register} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup to your account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already registered? <a href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Sign in</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 








    </>
  );
}

export default OauthSignin