import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

//pages
import NavBar from "./components/layout/NavBar";
import Header from "./components/layout/Header";
import NavBarSm from "./components/layout/NavBar-Sm";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { initFlowbite } from "flowbite";

import messaging from "./firebase";
import { getToken, isSupported } from "firebase/messaging";
import { fcmToken } from "./const/localStorage";
import { registerFcmToken } from "./services/apiMethods";
import ErrorBoundary from "./components/error/ErrorBoundary";
import Protect from "./components/Protect/Protect";
import { userAuthenticator } from "./utils/reducers/userReducer";
import { io } from "socket.io-client";
import { BASE_URL } from "./const/url";

function App() {
  const user = useSelector((state) => state?.user?.userData);
  const isValid = useSelector((state) => state?.user?.validUser);
  const location = useLocation();
  const [path, setPath] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  //authenticator
  useEffect(() => {
    if (!user || !isValid) {
      navigate("/login");
    }
  },[user, isValid, navigate]);


  useEffect(() => {
    setPath(location.pathname);
    dispatch(userAuthenticator());
    initFlowbite();
  }, [location, path, dispatch]);

  //token section
  useEffect(() => {
    if (user && isValid) {
      Notification.requestPermission().then((res) => {
        if (res === "granted") {
          if (isSupported()) {
            getToken(messaging, {
              vapidKey:
                "BKLxKk_8WAxE4NZ3xL2OJ1hrwo4DMlXkd1uDhMxAfaORlz5dhNBmGKFe9X6vIsbX3Y1uFiV-mGKA5MUex16DHUM",
            })
              .then((token) => {
                localStorage.setItem(fcmToken, token);
                registerFcmToken(user?._id, token);
              })
              .catch((error) => {
                console.error("Error getting FCM token:", error);
              });
          }
        }
      });
    }
  }, [user, isValid]);



 




  
  return (
    <>
      <ErrorBoundary>
        <Protect>
          <ToastContainer />
          <div className="md:hidden sticky top-0 z-50">
            <Header />
          </div>
          <div className="flex overflow-hidden mb-16 md:mb-0 select-none">
            <div className="hidden md:block">
              <NavBar path={path} />
            </div>
            <Outlet />
          </div>
          <div className="md:hidden sticky bottom-0 z-50">
            <NavBarSm />
          </div>
        </Protect>
      </ErrorBoundary>
    </>
  );
}

export default App;
