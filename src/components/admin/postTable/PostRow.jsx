import React, { useEffect, useState } from 'react'
import { convertDate, getTimeDifference } from '../../../hooks/timeAgo'

function PostRow({post}) {

const [user, setUser] = useState()


  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img className="w-10 h-10 rounded" src={post?.image} alt="" />
        <div className="pl-3">
          <div className="text-base font-semibold truncate">
            {post?.description}
          </div>
          <div className="font-normal text-gray-500">
            @{post?.user[0]?.username}
          </div>
        </div>
      </th>
      <td className="px-6 py-4">{post?.likes?.length}</td>
      <td className="px-6 py-4">{convertDate(post?.date)}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div
            className={`h-2.5 w-2.5 rounded-full bg-${
              post?.user[0]?.blocked ? "red-500" : "green-500"
            } mr-2`}
          ></div>{" "}
          {post?.user[0]?.blocked ? "Blocked" : "Online"}
        </div>
      </td>
      <td className="py-4">
        <button className="font-medium text-[#273B4A] dark:text-blue-500 hover:underline ml-5">
          See more
        </button>
        <button className="font-medium text-[#292c57] dark:text-blue-500 hover:underline ml-5">
          View profile
        </button>
      </td>
    </tr>
  );
}

export default PostRow