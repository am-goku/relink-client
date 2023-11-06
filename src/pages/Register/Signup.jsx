import React, { useEffect, useState } from 'react'
import {passwordValidate, regValidate} from '../../hooks/regValidation';
import StrengthMeter from '../../components/options/PasswordStregth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postRegister } from '../../services/apiMethods';
import OauthSignup from '../../components/Oauth/OauthSignup';

function Signup() {

  const navigate = useNavigate();
  const user = useSelector((state)=>state?.user?.validUser);

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  }, [navigate, user])


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [error, setError] = useState(''); //statue to manage ERROR occurs in this page
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [poorPassword, setPoorPassword] = useState(false);
    const [weakPassword, setWeakPassword] = useState(false);
    const [strongPassword, setStrongPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const passCheck = (pass) => {
        passwordValidate(
          pass,
          setPasswordError,
          setPoorPassword,
          setWeakPassword,
          setStrongPassword
        );
    }






    const handleSubmit = async () => {
        try {
            const userData = {
                username: username,
                email: email,
                password: password,
                password2: password2
            };
            
            if(await regValidate({...userData, setErr: setError})) {
                postRegister(userData).then((response) => {
                  if(response.status === 200) {
                    alert(response.message)
                    navigate('/login');
                  } else {
                    setError(response.message);
                  }
                }).catch((error) => {
                  setError(error.message)
                })
            }
        } catch (error) {
            setError("Something went wrong, Try after some time")
        }
    };
    



  return (
    <>
      <div className="w-screen h-screen flex justify-center">
        <div className="formContainer md:w-3/5 w-auto h-screen flex justify-center lg:justify-start md:items-center mt-20 md:mt-0">
          <div className=" max-h-full w-80 flex-col justify-start px-6 py-12 lg:px-8 md:bg-gradient-to-r from-gray-300 to-transparent rounded-lg">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mb-14 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Register to ReLink
              </h2>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                      onChange={(e) => setEmail(e.target.value.trim())}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                      onChange={(e) => setUsername(e.target.value.trim())}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
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
                      onChange={(e) => {
                        setPassword(e.target.value.trim());
                        passCheck(e.target.value);
                      }}
                    />
                  </div>
                  {password ? (
                    <div className="mt-2">
                      <StrengthMeter
                        poorPassword={poorPassword}
                        weakPassword={weakPassword}
                        strongPassword={strongPassword}
                        passwordError={passwordError}
                      />
                    </div>
                  ) : null}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password2"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
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
                      onChange={(e) => setPassword2(e.target.value.trim())}
                    />
                  </div>
                </div>

                {error ? (
                  <div className="text-red-700">{`! ${error}`}</div>
                ) : null}

                <div className='flex flex-col gap-2'>
                  <button
                    className="flex w-full justify-center rounded-md bg-[#1e1e1ec4] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                  >
                    Register
                  </button>

                  <OauthSignup />
                </div>
              </div>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already a member?{" "}
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

export default Signup
