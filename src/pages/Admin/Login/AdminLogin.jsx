import React, { useEffect, useState } from "react";
import { loginValidate } from "../../../hooks/loginValidate";
import { adminPostLogin } from "../../../services/admin/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setReduxAdmin} from "../../../utils/reducers/adminReducer";
import { adminAuth } from "../../../const/localStorage";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isValid = useSelector((state)=>state?.admin?.validAdmin);
  useEffect(()=>{
    if(isValid){
      navigate("/admin");
    }
  }, [isValid, navigate])

  //@dec    Credentials validation
  const setCredentials = () => {
    if (!email) {
      setError("Please enter a username or email");
      return false;
    }
    if (!password) {
      setError("Please enter a password");
      return false;
    }
    const adminData = {
      password: password,
      email: email,
    };
    return adminData;
  };


  //@dec      Admin login
  //@method   post
  const onHandleSubmit = async () => {
    const adminData = setCredentials();

    if (!adminData || !(await loginValidate(adminData, setError))) {
      return;
    }

    const response = await adminPostLogin(adminData);
    if (response.status === 200) {
      localStorage.setItem(adminAuth, response?.adminTokens?.accessToken);
      dispatch(setReduxAdmin({adminData:response.admin, validAdmin:response.valid}))
      window.location.reload();
    } else {
      console.log(response);
      setError(response.message);
    }
    console.log("postAdminLoginResponse", response);
  };

  return (
    <>
      <div className="w-screen h-full flex justify-center bg-gradient-to-r from-cyan-800 via-slate-500 to-neutral-500">
        <div className="formContainer md:w-3/5 w-auto h-screen flex justify-center lg:justify-start md:items-center mt-20 md:mt-0">
          <div className=" max-h-full w-80 flex-col justify-start px-6 py-12 lg:px-8 md:bg-gradient-to-r from-gray-300 to-transparent rounded-lg">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mb-14 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                ReLink Admin
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
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      // required
                      className="block w-full border-b bg-transparent border-black py-1.5 text-gray-900 placeholder:text-gray-950 focus:outline-none sm:text-sm sm:leading-6"
                      onInput={(e) => {
                        setEmail(e.target.value);
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
                    onClick={onHandleSubmit}
                  >
                    Sign in
                  </button>
                </div>
              </div>

              <div className="mt-10 text-center text-sm text-gray-500">
                <div className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"></div>
              </div>
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

export default AdminLogin;
