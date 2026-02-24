import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginator = ({ currentPage, itemsPerPage, totalItems, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return <Pagination className="mb-3">{pageNumbers}</Pagination>;
};

export default Paginator;