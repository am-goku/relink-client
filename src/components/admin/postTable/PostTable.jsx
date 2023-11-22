import React, { useEffect, useState } from 'react'
import UserFilter from '../tables/UserFilter';
import SearchBar from '../tables/SearchBar';
import { PostTableHead } from '../tables/TableHead';
import PostRow from './PostRow';
import { fetchPosts } from '../../../services/admin/apiMethods';

function PostTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState('')
    const perPage = 7;

    const [posts, setPosts] = useState([]);


    useEffect(()=> {
        fetchPosts(currentPage, perPage, searchTerm).then((response)=> {
            setPosts(response);
        }).catch((error)=> {
            setError(error);
        })
    }, [currentPage, searchTerm])


    const handlePageChange = (newpage) => {
    //   const nextPage = searchTerm ? 1 : newpage;
      setCurrentPage(newpage);
    };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[40rem] bg-white no-scrollbar">
        <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 p-4">
          <UserFilter />
          <SearchBar setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <PostTableHead />
          <tbody>
            {posts?.map((post, index) => {
              return <PostRow post={post} key={index} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="gap-3 flex justify-center p-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </button>
        <span className="font-semibold">Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={posts?.length < perPage}
          className="flex items-center justify-center px-3 h-8 ml- text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PostTable