import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getConnections } from "../../services/apiMethods";
import ProfileField from "../profiles/ProfileField";
import { showError } from "../../hooks/errorManagement";

function ConnectionList({title, setTitle, user}) {

    const currentUser = useSelector((state)=> state?.user?.userData);


    const [error, setError] = useState('')
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [connections, setConnections] = useState([]);
    const [currentUserConnections, setCurrentUserConnections] = useState([]);


    

    useEffect(()=> {
        getConnections(user?._id).then((response)=> {
            setFollowers(response?.followers);
            setFollowing(response?.following);
        }).catch((error)=> {
            setError(error?.message);
        });


        //gettig current user connections
        getConnections(currentUser?._id)
          .then((response) => {
            setCurrentUserConnections(response)
          })
          .catch((error) => {
            setError(error?.message);
          });

    }, [user, currentUser])

    useEffect(() => {
      showError(error, setError);
    }, [error]);

    useEffect(()=> {
        if (title === "followers") {
          setConnections(followers);
        } else if (title === "following") {
          setConnections(following);
        } else {
          alert("something went wrong");
        }
    },[followers, following, title])



  return (
    <>
      <div
        id="crypto-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-[#180f1f52] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
                onClick={()=> setTitle('')}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="crypto-modal"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white capitalize">
                {title}
              </h3>
            </div>
            <div className="p-6 max-h-[40rem] overflow-auto">
              
              <ul className="my-4 space-y-3">

                {
                    connections.length > 0 ?
                        connections.map((item, index)=> {
                        const follow = currentUserConnections?.following?.includes(item);
                        return (
                          <li>
                            <ProfileField userId={item} key={index} follow={follow} setTitle={setTitle} />
                          </li>
                        );
                    }) : <div className="w-full text-center">No followers</div>
                }

              </ul>
              <div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConnectionList;
