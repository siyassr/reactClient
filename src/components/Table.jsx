
import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import CustomHooks from "../Hooks/CustomHooks";
import { EmployeeContext } from "./context";
import Form from "./Pages/Form";
import { Link } from "react-router-dom";

function Table({currentemployee,itemsPerPage,currentPage ,employees, onEdit,onDelete }) {


  return (
    <>
      <div className="employee_id">
        <table className="table" id="table">
          <thead id="table_head">
            <tr>
              <th>Sl.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody class="table_body" id="table_body">
            {currentemployee && currentemployee.length > 0 ? (
              currentemployee.map((employee, index) => (
                <tr key={employee._id}>
                  <td>{ index + 1}</td>
                  <td>
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.country}</td>
                  <td className="flex gap-3 items-center">
                    <Link to={`/profile/${employee._id}`}>
                      <button>
                        <FaEye size={20} />
                      </button>
                    </Link>

                    <button onClick={() =>onEdit(employee)}>
                      <FaEdit size={20} />
                    </button>
                    <button  onClick={() => onDelete(employee._id)}>
                      <MdDelete size={20}  />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
    </>
  );
}

export default Table;

