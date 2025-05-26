import { useState, useMemo } from 'react';

function usePagination(data = [], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginationData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [currentPage, data, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    paginationData,
    totalPages,
    totalItems,
  };
}

export default usePagination;
