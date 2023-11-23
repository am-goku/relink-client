import React, { useEffect, useState } from 'react'
import { ReportTableHead } from '../tables/TableHead';
import { getPostReports, getUserReports } from '../../../services/admin/apiMethods';
import ReportRow from './ReportRow';
import RepoFilter from './RepoFilter';
import { showError } from '../../../hooks/errorManagement';

function ReportTable() {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const perPage = 7;
    const [error, setError] = useState("");
    const [reports, setReports] = useState([]);

    const [target, setTarget] = useState("POST");

    useEffect(()=> {
      setSearchTerm("")
    }, [])

useEffect(()=> {
    if(target === "POST"){
        getPostReports(perPage, searchTerm, currentPage).then((response) => {
            setReports(response)
        }).catch((error) => {
            setError(error?.message)
        })
    }

    if(target === "USER"){
        getUserReports(perPage, searchTerm, currentPage).then((results) => {
            setReports(results)
        }).catch((error) => {
            setError(error?.message)
        })
    }
},[target, currentPage, searchTerm, perPage])



useEffect(() => {
  showError(error, setError);
}, [error]);


const handlePageChange = (pg) => {
  setCurrentPage(pg);
}

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full max-h-screen bg-white no-scrollbar">
        <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 p-4">
          <RepoFilter setTarget={setTarget} />
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <ReportTableHead />
          {reports?.length > 0 && (
            <>
              <tbody>
                {reports?.map((report, index) => {
                  return (
                    <ReportRow report={report} key={index} target={target} />
                  );
                })}
              </tbody>
            </>
          )}
        </table>
      </div>
      {reports?.length === 0 && (
        <div className="w-full flex justify-center mt-5">
          <span className="flex self-center text-lg">No reports to show</span>
        </div>
      )}

      <div className="gap-3 flex justify-center p-6">
        <div className="w-fit h-fit bg-[#19576B] gap-3 flex  fixed bottom-[10px] left-[40%] translate-x-[50%] p-2 rounded-full">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Prev
          </button>
          <span className="font-semibold text-white">Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={reports?.length < perPage}
            className="flex items-center justify-center px-3 h-8 ml- text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default ReportTable