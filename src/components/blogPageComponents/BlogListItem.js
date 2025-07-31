import { formatRelativeDays } from "../../helpers";
import { useRemoveUserBlogMutation } from "../../store";

import { useState,useRef,useEffect } from "react";

import { FiMoreHorizontal, FiTrash, FiEdit } from "react-icons/fi";

function BlogListItem({ blog,scrollContainerRef }) {
  const [removeBlogPost, results] = useRemoveUserBlogMutation();
  const [showBlogOptions, setShowBlogOptions] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState("down");
  const iconRef = useRef(null);
  const dropdownRef = useRef(null)


  
  const handleRemoveTransaction = () => {
    removeBlogPost(blog);
  };

  const handleToggleBlogOptions = () =>{
    setShowBlogOptions(!showBlogOptions)
  }

  useEffect(() => {
if (showBlogOptions && iconRef.current && dropdownRef.current && scrollContainerRef?.current) {
      const iconRect = iconRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const containerRect = scrollContainerRef.current.getBoundingClientRect();
     
      // prostor ispod ikone unutar scroll kontejnera
      const spaceBelow = containerRect.bottom - iconRect.bottom;
      // prostor iznad ikone unutar scroll kontejnera
      const spaceAbove = iconRect.top - containerRect.top;

      if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
        setDropdownDirection("up");
      } else {
        setDropdownDirection("down");
      }
    }
  }, [showBlogOptions,scrollContainerRef]);
  
  return (
    <div className="bg-gray-50 w-full dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 ">
      {showBlogOptions && (
        // Overlay that covers the whole inset area, closes dropdown on click outside
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowBlogOptions(false)}
          aria-hidden="true"
        />
      )}
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-gray-400">
          {formatRelativeDays(blog.createdAt)}
        </div>
        <div ref={iconRef} className="text-gray-400 cursor-pointer text-md font-semibold relative">
          <FiMoreHorizontal  onClick={handleToggleBlogOptions} className="w-5 h-5" />
          {/* Dropdown menu absolutely positioned within the main card, does not shift layout */}
          {showBlogOptions && (
            <div
            ref={dropdownRef}
              className={`absolute right-0 ${dropdownDirection === "up" ? "bottom-5" : "top-5"} bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 `}
            >
              <button
                className="flex items-center gap-2 w-full rounded-xl text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  // TODO: implement edit logic
                  setShowBlogOptions(false);
                }}
              >
                <FiEdit />
                Izmeni
              </button>
              <button
                className="flex items-center w-full gap-2 rounded-xl text-left px-4 py-2  text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  handleRemoveTransaction();
                  setShowBlogOptions(false);
                }}
                disabled={results.isLoading}
              >
                <FiTrash />{results.isLoading ? "Brisanje..." : "Obriši"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className="text-gray-700 dark:text-gray-200 break-words"
  
      >
        {blog.description}
      </div>
    </div>
  );
}

export default BlogListItem