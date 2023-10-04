import React, { useEffect, useState } from "react";

import "./Login.css";
import { loginValidate } from "../../hooks/loginValidate";
import { postLogin } from "../../services/apiMethods";
import { userAuth } from "../../const/localStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReduxUser } from "../../utils/reducers/userReducer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [nameOrEmail, setNameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state)=> state?.user.validUser);
  
  useEffect(() => {
    console.log("user is:", user);
    if(user){
        navigate("/")
    }
  }, [user, navigate]);

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
        localStorage.setItem(userAuth, response.token);
        dispatch(setReduxUser());
        window.location.reload("/");
      } else {
        setError(response.message);
      }
      console.log("postLoginResponse", response);
    });
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center">
        <div className="formContainer md:w-3/5 w-auto h-screen flex justify-center lg:justify-start md:items-center mt-20 md:mt-0">
          <div className=" max-h-full w-80 flex-col justify-start px-6 py-12 lg:px-8 md:bg-gradient-to-r from-gray-300 to-transparent rounded-lg">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mb-14 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to ReLink
              </h2>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username / Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      // required
                      className="block w-full border-b bg-transparent border-black py-1.5 text-gray-900 placeholder:text-gray-950 focus:outline-none sm:text-sm sm:leading-6"
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
                      className="block text-sm font-medium leading-6 text-gray-900"
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
                      autoComplete="current-password"
                      required
                      className="block w-full border-b bg-transparent border-black py-1.5 text-gray-900 focus:outline-none sm:text-sm sm:leading-6"
                      onInput={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  {error ? (
                    <div className="text-red-600 text-sm font-extralight">
                      ! {error}
                    </div>
                  ) : null}
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#1e1e1ec4] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                  >
                    Sign in
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

export default Login;
