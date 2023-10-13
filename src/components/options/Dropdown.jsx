import React, { useEffect, useRef, useState } from 'react'

function Dropdown({owner}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div className="self-center" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="" type="button">
        <svg
          width={33}
          height={34}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#CCCCCC"
            strokeWidth="0.24000000000000005"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm0-6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm0 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"
              fill="#fafafa"
            ></path>
          </g>
        </svg>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-28 mr-2 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <button className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                View profile
              </button>
            </li>
            {owner ? (
              <>
                <li>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Edit post
                  </button>
                </li>

                <li>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Delete post
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Report
                  </button>
                </li>

                <li>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Block
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown