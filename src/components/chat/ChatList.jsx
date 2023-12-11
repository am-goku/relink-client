import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChatUser from './ChatUser';
import { getConnections, getRoomWithUserID } from '../../services/apiMethods';
import { initFlowbite } from 'flowbite';
import { useNavigate } from 'react-router-dom';
import { setReduxChatRoom } from '../../utils/reducers/userReducer';
import { showError } from '../../hooks/errorManagement';

function ChatList({setReciever}) {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.user?.userData)
    const reduxChatRoom = useSelector((state) => state?.user?.chatRooms)
    const [following, setFollowing] = useState([])
    const [error, setError] = useState('')
    const modalDiv = useRef();

    const [list, setList] = useState([])

    useEffect(()=> {
      initFlowbite()
    })


  useEffect(() => {
    showError(error, setError);
  }, [error]);


    //for validation purposes
    useEffect(()=> {
      if(!user){
        navigate('/login')
      }
    })



    
    //fetching rooms and setting it in redux state chat rooms
    useEffect(()=> {
      try {
        getRoomWithUserID(user?._id).then((rooms) => {
          const newList = rooms
            .reduce((acc, curr) => {
              const users = curr.users;
              const otherUser = users.filter((id) => id !== user?._id);
              return acc.concat(otherUser);
            }, [])

          // setList(newList);
          dispatch(setReduxChatRoom(newList))
        }).catch((err) => {
          setError(err)
        })
      } catch (error) {
        setError(error)
      }
    },[user, dispatch])


    // setting up the chat room in redux state(only user ids are )
    useEffect(()=> {
      if(reduxChatRoom){
        setList(reduxChatRoom)
      }
    }, [reduxChatRoom])


  

    //getting connections to show the people user following
    useEffect(()=> {
      initFlowbite()
      try {
        if(user){
          getConnections(user?._id)
            .then((response) => {
              setFollowing(response?.following);
            })
            .catch((error) => {
              setError(error?.message);
            });
        }
      } catch (error) {
        setError(error?.message);
      }
    }, [user]);


    // to close a modal
    const closeModal = () => {
      modalDiv.current.click();
    }

  return (
    <>
      <div className="w-96 md:h-fit bg-slate-500 p-5 flex flex-col gap-5 rounded-lg">
        <div className="w-full h-14 flex justify-center items-center">
          <span className="font-poppins text-xl font-medium">Messages</span>
          <button
            type="button"
            className="text-3xl font-semibold ml-auto"
            data-modal-target="medium-modal"
            data-modal-toggle="medium-modal"
          >
            +
          </button>
        </div>
        {list?.length > 0
          ? list.map((userId, index) => {
              return (
                <ChatUser
                  doFunction={setReciever}
                  userId={userId}
                  key={index}
                />
              );
            })
          : null}
      </div>

      <div
        id="medium-modal"
        tabIndex="-1"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-lg max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Default modal
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="medium-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="medium-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="medium-modal"
                type="button"
                className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>

{/*       
          {following ? (
            following.map((userId, index) => {
              return (
                <ul>
                  <ChatUser
                    doFunction={setReciever}
                    userId={userId}
                    key={index}
                  />
                </ul>
              );
            })
          ) : (
            <span>You not following anyone</span>
          )} */}
        
    </>
  );
}

export default ChatList