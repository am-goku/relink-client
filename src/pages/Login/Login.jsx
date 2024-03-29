import React, { useEffect, useState } from "react";

import "./Login.css";
import { loginValidate } from "../../hooks/loginValidate";
import { postLogin } from "../../services/apiMethods";
import { refreshToken, userAuth } from "../../const/localStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReduxUser } from "../../utils/reducers/userReducer";

import OauthSignin from "../../components/Oauth/OauthSignin";
import ErrorBoundary from "../../components/error/ErrorBoundary";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [nameOrEmail, setNameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state)=> state?.user?.validUser);
  const userData = useSelector((state)=> state?.user?.userData)
  
  useEffect(() => {
    if(user && userData){
        navigate("/")
    }
  });

  const setCredentials = () => {
    if (!nameOrEmail) {
      setError("Please enter a username or email");
      return false;
    }
    if (!password) {
      setError("Please enter a password");
      return false;
    }
    const userData = {
      password: password,
    };
    if (nameOrEmail.includes("@")) {
      userData.email = nameOrEmail;
    } else {
      userData.username = nameOrEmail;
    }
    return userData;
  };

  const handleSubmit = async () => {
    const userData = setCredentials();
    if (!userData || !(await loginValidate(userData, setError))) {
      return false;
    }
    postLogin(userData).then((response) => {
      if (response.status === 200) {
        localStorage.setItem(userAuth, response.tokens.accessToken);
        localStorage.setItem(refreshToken, response.tokens.refreshToken);
        dispatch(setReduxUser({userData:response.user, validUser: true}));
        navigate("/")
      } else {
        setError(response.message);
      }
    }).catch((error)=> {
      setError(error?.response?.message || error?.message);
    })
  };

  return (
    <ErrorBoundary>
      <>
        <div className="w-screen h-screen flex justify-center overflow-hidden">
          <div className="formContainer md:w-3/5 w-auto h-screen flex justify-center lg:justify-start md:items-center mt-20 md:mt-0">
            <div className=" max-h-full w-80 flex-col justify-start px-6 py-12 lg:px-8 bulgeBox2 rounded-lg">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mb-14 text-center text-2xl font-bold leading-9 tracking-tight text-white ">
                  Login to ReLink
                </h2>
              </div>

              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Username / Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        // autoComplete="email"
                        placeholder="Email address"
                        // required
                        className="block focus:custom-box rounded-lg focus:border-[#212121] w-full border-b bg-transparent border-gray-300 md:border-black py-1.5 text-gray-900 placeholder:text-gray-300 md:placeholder:text-transparent focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
                        onInput={(e) => {
                          setNameOrEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Password
                      </label>
                      <div className="text-sm">
                        <a
                          href="/forgot-password"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        // autoComplete="current-password"
                        placeholder="Password"
                        required
                        className="block focus:custom-box rounded-lg focus:border-[#212121] w-full border-b bg-transparent border-gray-300 md:border-black py-1.5 text-gray-900 placeholder:text-gray-300 md:placeholder:text-transparent focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
                        onInput={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    {error ? (
                      <div className="text-red-600 text-sm font-extralight py-2">
                        ! {error}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#1e1e1ec4] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleSubmit}
                    >
                      Sign in
                    </button>

                    <OauthSignin />

                    <span className="flex flex-col justify-center items-center text-white mt-1">
                      <span className="text-gray-400">Demo User</span>
                      <div className="flex flex-col">
                        <p>
                          <span className="text-sm text-gray-400">
                            Username:
                          </span>{" "}
                          sample_user
                        </p>
                        <p>
                          <span className="text-sm text-gray-400">
                            Password:
                          </span>{" "}
                          123456789
                        </p>
                      </div>
                    </span>
                  </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member?{" "}
                  <a
                    href="/register"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Register
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
    </ErrorBoundary>
  );
}

export default Login;
