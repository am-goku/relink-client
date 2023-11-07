import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import ChatUser from './ChatUser';
import { getConnections, getRoomWithUserID } from '../../services/apiMethods';
import { initFlowbite } from 'flowbite';
import { useNavigate } from 'react-router-dom';

function ChatList({setReciever}) {

    const navigate = useNavigate()
    const user = useSelector((state) => state?.user?.userData)
    const [following, setFollowing] = useState([])
    const [error, setError] = useState('')
    const modalDiv = useRef();

    const [list, setList] = useState([])

    useEffect(()=> {
      if(!user){
        navigate('/login')
      }
    })

    
    

    useEffect(()=> {
      try {
        getRoomWithUserID(user?._id).then((rooms) => {
          const newList = rooms
            .reduce((acc, curr) => {
              const users = curr.users;
              const otherUser = users.filter((id) => id !== user?._id);
              return acc.concat(otherUser);
            }, [])

          setList(newList);
          console.log(newList);
        }).catch((err) => {
          console.log(err);
        })
      } catch (error) {
        console.log(error);
      }
    },[user])

  


    useEffect(()=> {
      initFlowbite()
      try {
        if(user){
          getConnections(user?._id)
            .then((response) => {
              setFollowing(response?.following);
            })
            .catch((error) => {
              setError(error.message);
            });
        }
      } catch (error) {
        setError(error.message);
      }
    }, [user]);



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
            data-modal-target="followers"
            data-modal-toggle="followers"
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
        id="followers"
        tabindex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-[#C6C1C1] rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white font-poppins">
                People you follow
              </h3>
              <button
                ref={modalDiv}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="followers"
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
            <div className="p-6 space-y-6">
              {following ? (
                following.map((userId, index) => {
                  return (
                    <div onClick={closeModal}>
                      <ChatUser
                        doFunction={setReciever}
                        userId={userId}
                        key={index}
                      />
                    </div>
                  );
                })
              ) : (
                <span>You not following anyone</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatList