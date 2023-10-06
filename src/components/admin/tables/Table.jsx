import React from "react";

const Table = () => {
  return (
    <div className="flex flex-col self-center justify-center ">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                  <td className="whitespace-nowrap px-6 py-4">Mark</td>
                  <td className="whitespace-nowrap px-6 py-4">Otto</td>
                  <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                  <td className="whitespace-nowrap px-6 py-4">12 june 2023</td>
                  <td className="whitespace-nowrap px-6 py-4">Active</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <button className="bg-red-500 w-24 h-8 rounded-lg">
                      Block
                    </button>
                    <button className="bg-teal-800 text-white w-28 h-8 rounded-lg ml-6">
                      View Profile
                    </button>
                  </td>
                </tr>
                <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                  <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                  <td className="whitespace-nowrap px-6 py-4">Thornto</td>
                  <td className="whitespace-nowrap px-6 py-4">@fat</td>
                  <td className="whitespace-nowrap px-6 py-4">12 june 2023</td>
                  <td className="whitespace-nowrap px-6 py-4">Active</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <button className="bg-red-500 w-24 h-8 rounded-lg">
                      Block
                    </button>
                    <button className="bg-teal-800 text-white w-28 h-8 rounded-lg ml-6">
                      View Profile
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table
