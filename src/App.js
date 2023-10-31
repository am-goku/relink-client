import React, { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
} from "react-router-dom";

//pages
import NavBar from "./components/layout/NavBar";
import Header from "./components/layout/Header";
import NavBarSm from "./components/layout/NavBar-Sm";
import { useDispatch } from "react-redux";
import { userAuthenticator } from "./utils/reducers/userReducer";
import { ToastContainer, toast } from "react-toastify";
import { initFlowbite } from "flowbite";

import messaging, { backgroundNotify } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";



function App() {
  const location = useLocation();
  const [path, setPath] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setPath(location.pathname);
    dispatch(userAuthenticator());
      initFlowbite();
  }, [location, path, dispatch]);

  const [notification, setNotification] = useState()

  
//token section
  useEffect(()=> {
    Notification.requestPermission().then((res)=> {
      if(res === "granted"){
        getToken(
          messaging,
          {
            vapidKey:
              "BKLxKk_8WAxE4NZ3xL2OJ1hrwo4DMlXkd1uDhMxAfaORlz5dhNBmGKFe9X6vIsbX3Y1uFiV-mGKA5MUex16DHUM",
          }
        ).then((token)=> {
          console.log(token);
          onMessage(messaging, (payload) => {
            console.log("Message received. ", payload);
          });
        })
      }
    })
  })


 

  return (
    <>
    <ToastContainer />
      <div className="md:hidden sticky top-0 z-50">
        <Header />
      </div>
      <div className="flex overflow-hidden mb-16 md:mb-0">
        <div className="hidden md:block">
          <NavBar path={path} />
        </div>
          <Outlet />
      </div>
      <div className="md:hidden sticky bottom-0 z-50">
        <NavBarSm />
      </div>
    </>
  );
}

export default App;
