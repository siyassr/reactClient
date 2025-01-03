
import React, { useContext, useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight, FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Img2 from "../assets/images/Elipse 5.png";
import Footer from "./Footer";
import Table from "./Table";
import { EmployeeContext } from "./context";
import CustomHooks from "../Hooks/CustomHooks";
import axios from "axios";
import  Form  from "./Pages/Form";
import DeleteForm from "./Pages/DeleteForm";
import Header from "./Header";
import Pagination from "./Pagination";
import Profile from "./Profile";


function UserDashboard() {

  const {
    open,
    avatar,
    errors,
    setOpen,
    imgRef,
    setErrors,
    formData,
    isEditing,
    handleEdit,
    totalPages,
    deleteOpen,
    handleClose,
    currentPage,
    setFormData,
    handleSubmit,
    itemsPerPage,
    uploadedImage,
    handlePrevPage,
    handleLastPage,
    handleNextPage,
    currentemployee,
    handleFirstPage,
    handleImageUpload,
    handleAddEmployee,
    renderPageNumbers,
    handleCancelDelete,
    handleConfirmDelete,
    handleDeleteEmployee,
    handleItemsPerPageChange,


  } = useContext(EmployeeContext)
  

  return (
    <>
       <div className="users flex">
        <Header/>
        <div className="employee_list">
          <div className="employee_button_sctn flex justify-between">
            <div className="employees flex items-center gap-3">
              <h5>Employee List</h5>
              <select
                className="form-select p-2 px-3"
                aria-label="Select items per page"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                {[4, 5, 6, 7, 8, 9, 10].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {/* <p>of {employees.length}</p> */}
            </div>
            <button className="filled_btn" onClick={handleAddEmployee}>
              Add Employee
            </button>
          </div>



          <Table  onEdit={handleEdit} currentemployee={currentemployee} isEditing={isEditing} onDelete={handleDeleteEmployee} />

          <Form formData={formData} setFormData={setFormData} onSubmit={handleSubmit} isEditing={isEditing} open={open} handleClose={handleClose}  handleImageUpload={handleImageUpload} uploadedImage={uploadedImage} errors={errors} setErrors={setErrors} avatar={avatar} imgRef={imgRef}/>

          <DeleteForm open={deleteOpen} onConfirm={handleConfirmDelete}  onCancel={handleCancelDelete} />
       
        </div>
        <Pagination/>
        <Footer />
      </div>
    </>
  );
}

export default UserDashboard;



