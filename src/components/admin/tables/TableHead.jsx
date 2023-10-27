import React from 'react'

function TableHead() {
  return (
    <>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            email
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
    </>
  );
}


export const PostTableHead = () => {
  return (
    <>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            POST
          </th>
          <th scope="col" className="px-6 py-3">
            likes
          </th>
          <th scope="col" className="px-6 py-3">
            date
          </th>
          <th scope="col" className="px-6 py-3">
            user status
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
    </>
  );
};

export default TableHead