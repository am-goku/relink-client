import React, { useEffect, useState } from 'react'
import { fetchAPost, getUser } from '../../../services/apiMethods'
import { blockPost, blockUnblockUser } from '../../../services/admin/apiMethods'
import { convertDate } from '../../../hooks/timeAgo'
import { initFlowbite } from 'flowbite'

function ReportRow({report, target}) {

    const [data, setData] = useState()
    const [post, setPost] = useState()
    const [user, setUser] = useState()
    const [reporter, setReporter] = useState()
    const [error, setError] = useState()

    const [reason, setReason] = useState()

    const [date, setDate] = useState('')

    useEffect(()=> {
        setReason(report?.datails);
        initFlowbite()
        setDate(convertDate(report?.createdAt))
    }, [report])

    useEffect(()=> {
        if(target === "POST") {
            console.log(report);
            fetchAPost(report?.targetId).then((response)=> {
                setPost(response)
                console.log(response);
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
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
            </div>
            {user && (
              <div className="font-normal text-gray-500">
                {"@" + user?.username || ""}
              </div>
            )}
          </div>
        </th>
        <td className="px-6 py-4">@{report?.reporterUsername}</td>
        <td className="px-6 py-4">{date}</td>
        <td className="px-6 py-4 truncate max-w-sm">
          <span
            data-popover-target="popover-left"
            data-popover-placement="left"
            id='reasonSpan'
          >
            {report?.details}
          </span>
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