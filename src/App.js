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
import firebase, { onMessageListener, requestPermission, unsubscribe } from "./firebase"
import {getToken} from "firebase/messaging"


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

  useEffect(()=> {
    requestPermission();
    onMessageListener().then((payload)=> {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body
      })
      console.log("notification:", payload);
    }).catch((error)=> {
      console.log("error getting notification:", error);
    })

    return ()=> {
      unsubscribe()
    }
  });

  useEffect(() => {
    if (notification) {
      new Notification(notification.title, {
        body: notification.body,
      });
    }
  }, [notification, notification?.title, notification?.body]);


 

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
