import React, { useEffect, useRef, useState } from 'react'

//imported react icons
import { FaBell, FaPlus } from 'react-icons/fa';

//imported styles
import "./style.css"
import CreatePost from '../modal/CreatePost';
import { initFlowbite } from 'flowbite';
import Notes from '../notification/Notes';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotifications } from '../../services/apiMethods';
import { clearReduxNotifications } from '../../utils/reducers/notificationReducer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Header() {

  useEffect(()=> {
    initFlowbite()
  })
  const navigate = useNavigate()

  const user = useSelector((state)=> state?.user?.userData)
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const notificationToggle = useRef()

  const [isClosed, setIsClosed] = useState(true)
  const handleClose = (e) => {
    if (e.target.id === "defaultModal" && e.target.id !== "crtPost") {
      setIsClosed(true);
    }
  };


  
  useEffect(()=> {
    const alertError = () => {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setError("");
    };
    
    if(error){
      alertError()
    }
  }, [error])



  const notifications = useSelector(
    (state) => state?.notification?.notifications
  );

  const clearNotifications = () => {
    deleteNotifications(user?._id)
      .then((response) => {
        dispatch(clearReduxNotifications());
      })
      .catch((error) => {
        setError(error?.message);
      });
  };


  useEffect(()=> {
    notificationToggle.current.click();
  }, [navigate])



  

  return (
    <>
      <div className={`sticky top-0 left-0 z-10 no-scrollbar`}>
        <div className="bg-black w-screen h-16 flex justify-center px-5 overflow-hidden">
          <div className="w-56 h-32 self-center -ml-16 cursor-pointer headerLogo" />

          <div className="ml-auto w-fit h-12 flex self-center justify-center items-center gap-10">
            <button
              type="button"
              data-drawer-target="drawer-navigation"
              data-drawer-show="drawer-navigation"
              aria-controls="drawer-navigation"
            >
              <FaBell className="w-5 h-7 fill-slate-300" />
            </button>
            <FaPlus
              className="w-5 h-7 fill-slate-300"
              onClick={() => setIsClosed(false)}
            />
          </div>
        </div>
      </div>

      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 justify-center flex ${
          isClosed ? "hidden" : "modal-open"
        }  overflow-x-hidden overflow-y-auto md:inset-0 h-screen`}
        onClick={handleClose}
      >
        <div className="h-fit w-fit" id="crtPost">
          <CreatePost setClose={setIsClosed} />
        </div>
      </div>

      {/* notification section  */}

      <div
        id="drawer-navigation"
        class="fixed top-0 left-0 z-40 w-full h-screen p-4 pb-20 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
        tabindex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Notifications
        </h5>
        <button
          type="button"
          ref={notificationToggle}
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
        <div class="py-4 overflow-y-auto">
          {notifications?.length > 0 ? (
            <>
              {/* NOTIFICATIONS  */}
              <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[43rem] overflow-auto">
                {notifications.map((notification) => {
                  return (
                    <Notes
                      key={notification?._id}
                      notification={notification}
                    />
                  );
                })}
              </ul>

              {/* CLEAR BUTTONS AND MARK AS READ   */}
              <div className="w-full h-4 mb-auto flex mt-5">
                <button className="text-xs font-medium text-gray-600 hover:text-gray-800">
                  Mark as read
                </button>
                <button
                  onClick={clearNotifications}
                  className="ml-auto text-xs font-medium text-gray-600 hover:text-gray-800"
                >
                  Clear notifications
                </button>
              </div>
            </>
          ) : (
            <div className="w-full text-center mt-10 text-gray-500">
              <span>No new Notifications</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header