import axios from 'axios'
import React, { useState } from 'react'

function Signup() {

    const [username, setUsername] = useState(false)
    const [email, setEmail] = useState(false);

    const checkusername = (e) =>{
        axios.get('http://localhost:4000/username').then((response)=>{
            const username = response.data
            username.includes(e)? setUsername(true): setUsername(false);
        }).catch((error)=>{
            console.log(error);
        })
    }
    const checkEmail = (e) =>{
        axios.get('http://localhost:4000/user-email').then((response)=>{
            const email = response.data;
            email.includes(e)? setEmail(true): setEmail(false);
        }).catch((error)=>{
            console.log(error);
        })
    }



  return (
    <>
      <div className='w-screen h-screen flex justify-center'>
                <div className='formContainer md:w-3/5 w-auto h-screen flex justify-center lg:justify-start md:items-center mt-20 md:mt-0'>
                    <div className=" max-h-full w-80 flex-col justify-start px-6 py-12 lg:px-8 md:bg-gradient-to-r from-gray-300 to-transparent">

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mb-14 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Register to ReLink
                            </h2>
                        </div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" action="#" method="POST">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-0">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            // required
                                            className="block w-full border-b bg-transparent border-black py-1.5 text-gray-900 placeholder:text-gray-950 focus:outline-none sm:text-sm sm:leading-6" 
                                            onBlur={(e)=>{checkEmail(e.target.value)}}
                                        />
                                    </div>
                                    {email? <p className='text-xs mt-1 text-white md:text-red-600'>Email already in use</p>: ''}
                                </div>

                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        Username
                                    </label>
                                    <div className="mt-0">
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            autoComplete="username"
                                            // required
                                            className="block w-full border-b bg-transparent border-black py-1.5 text-gray-900 placeholder:text-gray-950 focus:outline-none sm:text-sm sm:leading-6" 
                                            onBlur={(e)=>{checkusername(e.target.value)}}
                                        />
                                    </div>
                                    {username? <p className='text-xs mt-1 text-white md:text-red-600'>Username is already taken</p>: ''}

                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-0">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            className="block w-full border-b bg-transparent border-black py-1.5 text-gray-900 placeholder:text-gray-950 focus:outline-none sm:text-sm sm:leading-6" 
                                            
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password2" className="block text-sm font-medium leading-6 text-gray-900">
                                            Confirm password
                                        </label>
                                    </div>
                                    <div className="mt-0">
                                        <input
                                            id="password2"
                                            name="password2"
                                            type="password"
                                            required
                                            className="block w-full border-b bg-transparent border-black py-1.5 text-gray-900 placeholder:text-gray-950 focus:outline-none sm:text-sm sm:leading-6" 
                                            
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-[#1e1e1ec4] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                                        
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Already a member?{' '}
                                <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Login
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:flex ml-auto max-h-full w-80 flex-col justify-center items-center px-6 py-12 lg:px-8">
                        <div className="outerLogo w-80 h-96 flex justify-center items-center">
                            <div className="innerLogo hidden sm:block w-80 h-60">
                                {/* Content of the inner div */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Signup
