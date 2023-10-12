import React, { useEffect, useState } from 'react'

import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sentOtp, verifyOtp } from '../../services/apiMethods';
import { userAuth } from '../../const/localStorage';
import { setReduxUser } from '../../utils/reducers/userReducer';
import { FaSpinner } from 'react-icons/fa';

function Varifyemail() {

    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const isValid = useSelector((state)=> state?.user?.validUser)

    useEffect(()=> {
        if(isValid){
            navigate("/")
        }
    })


    const handleSubmit = () => {
        setLoading(true);
        if(!otp){
            sentOtp(email).then((response) => {
                console.log(response);
                setOpen(true);
            }).catch((error) => {
                setError(error.message);
            }).finally(() => {
                setLoading(false);
            })
        } else {
            verifyOtp(email, otp).then((response) => {
                console.log(response);
                localStorage.setItem(userAuth, response.token);
                dispatch(setReduxUser({userData:response.user, validUser: response.valid}));
                window.location.reload();
            }).catch((error) => {
                setError(error.message);
            }).finally(() => {
                setLoading(false);
            })
        }
    }


  return (
    <>
      <div className="w-screen h-screen flex justify-center">
        <div className="formContainer md:w-3/5 w-auto h-screen flex justify-center lg:justify-start md:items-center mt-20 md:mt-0">
          <div className=" max-h-full w-80 flex-col justify-start px-6 py-12 lg:px-8 md:bg-gradient-to-r from-gray-300 to-transparent rounded-lg">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mb-14 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Verify email
              </h2>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      //   type="email"
                      autoComplete="email"
                      // required
                      className="block w-full border-b bg-transparent border-black py-1.5 text-gray-900 placeholder:text-gray-950 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>
                  <br />

                  {open ? (
                    <div className="mt-2">
                      <input
                        onChange={(e) => setOtp(e.target.value)}
                        id="otpToken"
                        name="otpToken"
                        placeholder="Verification code"
                        required
                        className="block w-full border-b bg-transparent border-black py-1.5 text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm sm:leading-6"
                      />
                    </div>
                  ) : null}

                  {error ? (
                    <span className="text-red-600 text-sm">! {error}</span>
                  ) : null}
                </div>

                <div>
                  <button
                    onClick={handleSubmit}
                    disabled={loading ? true : false}
                    className="flex w-full justify-center rounded-md bg-[#1e1e1ec4] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {loading ? (
                      <FaSpinner
                        size={16}
                        icon="spinner"
                        spin={true}
                        className="ml-auto mr-auto rotating-spinner"
                      />
                    ) : !open ? (
                      "Sent varification link"
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
              </div>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <a
                  href="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Register
                </a>{" "}
                or{" "}
                <a
                  href="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
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
  );
}

export default Varifyemail
