


// import React, { useContext, useEffect, useState } from "react";
// import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight, FaEye, FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { CiSearch } from "react-icons/ci";
// import Img2 from "../assets/images/Elipse 5.png";
// import Footer from "./Footer";
// import Table from "./Table";
// import { EmployeeContext } from "./context";
// import CustomHooks from "../Hooks/CustomHooks";
// import axios from "axios";

// function UserDashboard() {
//   const { ModalOpen } = useContext(EmployeeContext);
//   const { employees, setEmployees } = CustomHooks();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [itemsPerPage, setItemsPerPage] = useState(6);
//   const [currentPage, setCurrentPage] = useState(1);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/Dashboard", {
//         withCredentials: true,
//       });
//       setEmployees(response.data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const filteredEmployees = employees.filter((employee) =>
//     `${employee.firstName} ${employee.lastName} ${employee.email} ${employee.phone} ${employee.username}`
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

//   const currentemployee = filteredEmployees.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleItemsPerPageChange = (event) => {
//     setItemsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     const maxPagesToShow = 5;
//     const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
//     const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           className={`w-12 h-12 rounded-full text-sm ${
//             i === currentPage ? "bg-[#545350] text-white" : "bg-[#545350]"
//           }`}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </button>
//       );
//     }

//     return pageNumbers;
//   };

//   const handleFirstPage = () => {
//     setCurrentPage(1);
//   };

//   const handleLastPage = () => {
//     setCurrentPage(totalPages);
//   };

//   return (
//     <>
//       <div className="users flex">
//         <div className="head_sctn flex justify-between items-center">
//           <div className="heading">
//             <h5>Dashboard / Employees</h5>
//             <h3>Employees</h3>
//           </div>
//           <div className="search_bar">
//             <div className="search flex items-center">
//               <CiSearch />
//               <input
//                 className="search_icon"
//                 type="search"
//                 placeholder="Search by name"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <div className="search_sub flex items-center">
//               <i className="fa-regular fa-bell"></i>
//               <div className="profile">
//                 <img src={Img2} alt="" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="employee_list">
//           <div className="employee_button_sctn flex justify-between">
//             <div className="employees flex items-center gap-3">
//               <h5>Employee List</h5>
//               <select
//                 className="form-select p-2 px-3"
//                 aria-label="Select items per page"
//                 value={itemsPerPage}
//                 onChange={handleItemsPerPageChange}
//               >
//                 {[4, 5, 6, 7, 8, 9, 10].map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//               <p>of {employees.length}</p>
//             </div>
//             <button className="filled_btn" onClick={ModalOpen}>
//               Add Employee
//             </button>
//           </div>
//           <Table currentemployee={currentemployee} getEmployees={fetchEmployees} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
//         </div>
//         <div className="button_sctn">
//           <button
//             className="pagnation"
//             id="startBtn"
//             onClick={handleFirstPage}
//             disabled={currentPage === 1}
//           >
//             <FaAngleDoubleLeft />
//           </button>
//           <button
//             className="pagnation"
//             id="preveNext"
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//           >
//             <FaAngleLeft />
//           </button>
//           <div className="pagnation_btn">{renderPageNumbers()}</div>
//           <button
//             className="pagnation"
//             id="preveNext"
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//           >
//             <FaAngleRight />
//           </button>
//           <button
//             className="pagnation"
//             id="endBtn"
//             onClick={handleLastPage}
//             disabled={currentPage === totalPages}
//           >
//             <FaAngleDoubleRight />
//           </button>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export default UserDashboard;




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

function UserDashboard() {

  const {
    open,
    setOpen,
    deleteOpen,
    setDeleteOpen,
    deleteEmployeeId,
    setDeleteEmployeeId,
    formData,
    setFormData,
    isEditing,
    setIsEditing,
    editingId,
    setEditingId,
    searchQuery,
    setSearchQuery,
    itemsPerPage,
     setItemsPerPage,
    currentPage,
     setCurrentPage,
    filteredEmployees,
    totalPages,
    currentemployee,
    handlePageChange,
    handleItemsPerPageChange,
    handlePrevPage,
    handleNextPage,
    renderPageNumbers,
    handleFirstPage,
    handleLastPage,
    handleEdit,
    handleAddEmployee,
    handleSubmit,
    handleDeleteEmployee,
    handleConfirmDelete,
    handleCancelDelete


  } = useContext(EmployeeContext)
  // const [open, setOpen] = useState(false); 
  // const [deleteOpen, setDeleteOpen] = useState(false); 
  // const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  // const [formData, setFormData] = useState({
  //   salutation: "",
  //   firstName: "",
  //   lastName: "",
  //   username: "",
  //   password: "",
  //   email: "",
  //   phone: "",
  //   dob: "",
  //   gender: "",
  //   address: "",
  //   qualifications: "",
  //   country: "",
  //   state: "",
  //   city: "",
  //   pincode: "",
  // });

  // const [isEditing, setIsEditing] = useState(false);
  // const [editingId, setEditingId] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [itemsPerPage, setItemsPerPage] = useState(6);
  // const [currentPage, setCurrentPage] = useState(1);

  // const { employees, getEmployees, createEmployee, updateEmployee,deleteEmployee } = CustomHooks();

  // useEffect(() => {
  //   getEmployees();
  // }, []);

  // const filteredEmployees = employees.filter((employee) =>
  //   `${employee.firstName} ${employee.lastName} ${employee.email} ${employee.phone} ${employee.username}`
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase())
  // );
  // const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // const currentemployee = filteredEmployees.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  // const handleItemsPerPageChange = (event) => {
  //   setItemsPerPage(parseInt(event.target.value, 10));
  //   setCurrentPage(1);
  // };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const renderPageNumbers = () => {
  //   const pageNumbers = [];
  //   const maxPagesToShow = 5;
  //   const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  //   const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  //   for (let i = startPage; i <= endPage; i++) {
  //     pageNumbers.push(
  //       <button
  //         key={i}
  //         className={`w-12 h-12 rounded-full text-sm ${
  //           i === currentPage ? "bg-[#545350] text-white" : "bg-[#545350]"
  //         }`}
  //         onClick={() => handlePageChange(i)}
  //       >
  //         {i}
  //       </button>
  //     );
  //   }

  //   return pageNumbers;
  // };

  // const handleFirstPage = () => {
  //   setCurrentPage(1);
  // };

  // const handleLastPage = () => {
  //   setCurrentPage(totalPages);
  // };




  // const handleEdit = (employee) => {
  //   setIsEditing(true);
  //   setEditingId(employee._id); // Set the ID of the employee to edit
  //   setFormData(employee); // Set form data with the selected employee's data
  //   setOpen(true); // Open the modal for editing
  // };

  // const handleAddEmployee = () => {
  //   setIsEditing(false);
  //   setFormData({
  //     salutation: "",
  //     firstName: "",
  //     lastName: "",
  //     username: "",
  //     password: "",
  //     email: "",
  //     phone: "",
  //     dob: "",
  //     gender: "",
  //     address: "",
  //     qualifications: "",
  //     country: "",
  //     state: "",
  //     city: "",
  //     pincode: "",
  //   });
  //   setOpen(true); 
  // };

  // const handleSubmit = async () => {
  //   if (isEditing) {
  //     await updateEmployee(editingId, formData); 
  //   } else {
  //     await createEmployee(formData);
  //   }
  //   setOpen(false); 
  // };

  // const handleDeleteEmployee = (id) => {
  //   setDeleteEmployeeId(id); 
  //   setDeleteOpen(true); 
  // };

  // const handleConfirmDelete = async () => {
  //   if (deleteEmployeeId) {
  //     await deleteEmployee(deleteEmployeeId); 
  //     setDeleteOpen(false); 
  //   }
  // };

  // const handleCancelDelete = () => {
  //   setDeleteOpen(false); 
  // };


  return (
    <>
      <div className="users flex">
        <div className="head_sctn flex justify-between items-center">
          <div className="heading">
            <h5>Dashboard / Employees</h5>
            <h3>Employees</h3>
          </div>
          <div className="search_bar">
            <div className="search flex items-center">
              <CiSearch />
              <input
                className="search_icon"
                type="search"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="search_sub flex items-center">
              <i className="fa-regular fa-bell"></i>
              <div className="profile">
                <img src={Img2} alt="" />
              </div>
            </div>
          </div>
        </div>
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
          <Form
           formData={formData}
           setFormData={setFormData}
           onSubmit={handleSubmit}
           isEditing={isEditing}
           open={open}
           handleClose={() => setOpen(false)}
          />

          <DeleteForm
          open={deleteOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
        </div>
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
        <Footer />
      </div>
    </>
  );
}

export default UserDashboard;



