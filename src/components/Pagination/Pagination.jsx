import "./Pagination.css";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        ←
      </button>

      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={
              currentPage === index + 1 ? "page-btn active" : "page-btn"
            }
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        →
      </button>
    </div>
  );
}

export default Pagination;
