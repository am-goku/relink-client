import React, { useCallback, useEffect, useState } from 'react'

function TableRow({ user, index, key }) {

  const [date, setDate] = useState('');
  const [status, setStatus] = useState(false);

  const changeDate = useCallback(() => {
    const timestamp = user?.createdAt;
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    setDate(formattedDate)

  }, [user?.createdAt])

  useEffect(() => {
    changeDate(user?.createdAt, setDate);
    if (user?.blocked) {
      setStatus(false)
    } else {
      setStatus(true);
    }
  }, [user, changeDate]);

  return (
    <>
      <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
        <td className="whitespace-nowrap px-6 py-4">{user?.username}</td>
        <td className="whitespace-nowrap px-6 py-4">{user?.name}</td>
        <td className="whitespace-nowrap px-6 py-4">{user?.email}</td>
        <td className="whitespace-nowrap px-6 py-4">{date}</td>
        <td className="whitespace-nowrap px-6 py-4">{status ? 'Active' : 'Blocked'}</td>
        <td className="whitespace-nowrap px-6 py-4">
          {
            status ?
              <button className="bg-red-500 w-24 h-8 rounded-lg">
                Block
              </button>
              : <button className="bg-red-500 w-24 h-8 rounded-lg">
                Unblock
              </button>
          }
          <button className="bg-teal-800 text-white w-28 h-8 rounded-lg ml-6">
            View Profile
          </button>
        </td>
      </tr>
    </>
  )
}

export default TableRow