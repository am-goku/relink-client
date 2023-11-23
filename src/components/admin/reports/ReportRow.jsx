import React, { useEffect, useState } from 'react'
import { getUser } from '../../../services/apiMethods'
import { blockPost, blockUnblockUser, fetchSinglePost } from '../../../services/admin/apiMethods'
import { convertDate } from '../../../hooks/timeAgo'
import { initFlowbite } from 'flowbite'
import { showError } from '../../../hooks/errorManagement'

function ReportRow({report, target}) {

    const [post, setPost] = useState()
    const [postUser, setPostUser] = useState(null)
    const [user, setUser] = useState()
    const [error, setError] = useState()


    const [date, setDate] = useState('')

    useEffect(()=> {
        initFlowbite()
        setDate(convertDate(report?.createdAt))
    }, [report])

    useEffect(() => {
      showError(error, setError);
    }, [error]);

    useEffect(()=> {
        if(target === "POST") {
            fetchSinglePost(report?.targetId).then((response)=> {
                setPost(response)
                getUser(response?.userId).then((res) => {
                  setPostUser(res[0]);
                });
            })
        }


        if(target === "USER") {
            getUser(report?.targetId).then((response)=> {
                setUser(response[0])
            })
        }
    },[report, target])



    const blockTarget = () => {
        if(report?.reportType === 'UserReport'){
            blockUnblockUser(report?.targetId, true).then((res)=> {
                
            }).catch((err)=> {
                setError(err.message)
            })
        }

        if(report?.reportType === 'PostReport'){
            blockPost(report?.targetId).then(()=> {
                
            }).catch((err)=> {
                setError(err.message)
            })
        }
    }



  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-24">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={user?.profilePic || post?.image}
            alt=""
          />
          <div className="pl-3">
            <div className="text-base font-semibold">
              {user?.name || post?.description}
              {post && !post?.description ? (
                <span className="font-normal text-[#686767e1]">
                  (no description)
                </span>
              ) : null}
            </div>

            <div className="font-normal text-gray-500">
              {"@" + (user?.username || postUser?.username)}
            </div>
          </div>
        </th>
        <td className="px-6 py-4">@{report?.reporterUsername}</td>
        <td className="px-6 py-4">{date}</td>
        <td className="px-6 py-4 truncate max-w-sm">
          <span>{report?.details}</span>
        </td>
        <td className="px-6 py-4">
          <div
            onClick={blockTarget}
            className="flex items-center w-20 h-8 bg-red-700 text-center justify-center rounded text-white cursor-pointer"
          >
            Block
          </div>
        </td>
      </tr>
    </>
  );
}

export default ReportRow