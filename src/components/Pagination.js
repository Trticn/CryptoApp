import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  let startPage = Math.max(1, currentPage - 1);
  let endPage = startPage + 3;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - 3);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-6 gap-1 sm:gap-2 md:gap-3 flex-wrap">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-2 sm:p-2.5 md:p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 transition"
        aria-label="Prva stranica"
      >
        <FiChevronsLeft className="text-base sm:text-lg md:text-xl" />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 sm:p-2.5 md:p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 transition"
        aria-label="Prethodna"
      >
        <FiChevronLeft className="text-base sm:text-lg md:text-xl" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full text-sm sm:text-base md:text-lg font-medium transition ${
            page === currentPage
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 sm:p-2.5 md:p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 transition"
        aria-label="Sledeća"
      >
        <FiChevronRight className="text-base sm:text-lg md:text-xl" />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 sm:p-2.5 md:p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 transition"
        aria-label="Poslednja stranica"
      >
        <FiChevronsRight className="text-base sm:text-lg md:text-xl" />
      </button>
    </div>
  );
}

export default Pagination;
