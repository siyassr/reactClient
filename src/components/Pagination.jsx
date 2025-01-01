import React, { useContext } from 'react'
import { EmployeeContext } from './context'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight, FaEye, FaEdit } from "react-icons/fa";

function Pagination() {
     const {
        totalPages,
        currentPage,
        handlePrevPage,
        handleLastPage,
        handleNextPage,
        handleFirstPage,
        renderPageNumbers,
      } = useContext(EmployeeContext)
  return (
         <div className="button_sctn">
                  <button
                    className="pagnation"
                    id="startBtn"
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                  >
                    <FaAngleDoubleLeft />
                  </button>
                  <button
                    className="pagnation"
                    id="preveNext"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <FaAngleLeft />
                  </button>
                  <div className="pagnation_btn">{renderPageNumbers()}</div>
                  <button
                    className="pagnation"
                    id="preveNext"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <FaAngleRight />
                  </button>
                  <button
                    className="pagnation"
                    id="endBtn"
                    onClick={handleLastPage}
                    disabled={currentPage === totalPages}
                  >
                    <FaAngleDoubleRight />
                  </button>
                </div>
  )
}

export default Pagination