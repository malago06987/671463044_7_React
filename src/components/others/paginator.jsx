export default function Paginator({ currentPage, itemsPerPage, totalItems, setCurrentPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  return (
    <div className="d-flex gap-2 flex-wrap mb-3">
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        const active = page === currentPage;
        return (
          <button
            key={page}
            className={`btn btn-sm ${active ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}