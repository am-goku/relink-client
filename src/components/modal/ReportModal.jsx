import React, { useEffect, useRef, useState } from 'react'
import { reportPost } from '../../services/apiMethods';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';






function ReportModal({post, setReportModal, setError}) {

const navigate = useNavigate()

const user = useSelector((state)=> state?.user?.userData);

// const [error, setError] = useState('')
const [message, setMessage] = useState('')
const [loader, setLoader] = useState(false)

const [reason, setReason] = useState('');
const reasonRef = useRef()


useEffect(()=> {
    // if(error){
    //     toast.error(error, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //     })
    //     setError("")
    // };

    if(message){
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setMessage("");
    }
},[message])


const handleSubmit = () => {
    try {
        setLoader(true);
        if (!reason) {
          setError("Please enter a reason.");
          return;
        }
        if (!user) {
          navigate("/login");
          return;
        }
        reportPost(user?._id, user?.username, post?._id, reason)
          .then((response) => {
              setMessage("Post has been reported.");
              close();
            setReason("");
            reasonRef.current.value = "";
          })
          .catch((error) => {
            setError("Something went wrong, Please try again.");
          });
    } catch (error) {
        setError(error?.message);
    } finally {
        setLoader(false)
    }
}


const close = () => {
    setReason("");
    reasonRef.current.value = "";
    setReportModal(false);
};


  return (
    <>
      <div
        id="large-modal"
        tabIndex="-1"
        className="fixed top-0 left-0 right-0 z-50 flex bg-[#180f1f52] justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full"
      >
        <div className="relative w-full md:max-w-4xl md:max-h-full max-w-xl">
          <div className="relative bg-[#C6C1C1] rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Report
              </h3>
              <button
                type="button"
                onClick={close}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="large-modal"
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
            </div>
            <div className="p-6 grid md:flex gap-8">
              <div className="grid gap-2 w-80 aspect-square">
                <img
                  src={post?.image}
                  alt=""
                  className="w-full aspect-square rounded"
                />
                <span className="truncate">
                  {post?.descriptions ||
                    "This is a samis a sample descriptionis a sample descriptionis a sample descriptionis a sample descriptionis a sample descriptionis a sample descriptionis a sample descriptionple description"}
                </span>
              </div>

              <div className="w-full grid gap-2 font-poppins">
                <textarea
                  name="reason"
                  ref={reasonRef}
                  onChange={(e) => setReason(e.target.value.trim())}
                  placeholder="Reason to report this post."
                  id="reason"
                  cols="30"
                  rows="10"
                  className="rounded aspect- focus:ring-0 focus:border-black bg-transparent"
                ></textarea>
                {/* {error && (
                  <span className="text-sm text-red-800 font-sans font-semibold">
                    ! This is an error message
                  </span>
                )} */}
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="large-modal"
                type="button"
                disabled={loader? true : false}
                onClick={handleSubmit}
                className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {!loader ? (
                  "Report"
                ) : (
                  <div className='animate-spin'>
                    <FaSpinner />
                  </div>
                )}
              </button>
              <button
                data-modal-hide="large-modal"
                onClick={close}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportModal