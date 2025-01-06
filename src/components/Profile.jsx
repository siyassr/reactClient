
// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { EmployeeContext } from "./context";
// import Form from "./Pages/Form";
// import Img2 from "../assets/images/Elipse 5.png";
// import Img3 from "../assets/images/Background Image.png";
// import Footer from "./Footer";
// import DeleteForm from "./Pages/DeleteForm";

// function Profile() {
//   const navigate = useNavigate()
//   const { id } = useParams();  
//   const [employee, setEmployee] = useState(null);
//   const [formData, setFormData] = useState({});
//   const {
//     open,
//     setOpen,
//     handleEdit,
//     handleDeleteEmployee,
//     handleSubmit,
//     handleConfirmDelete,
//     handleCancelDelete,
//     handleClose,
//     handleImageUpload,
//     errors,
//     setErrors,
//     deleteOpen,
//   } = useContext(EmployeeContext);

  
//   useEffect(() => {
//     const fetchEmployee = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/Employees/${id}`);
//         const data = await response.json();
//         setEmployee(data);  
//         setFormData(data);  
//       } catch (error) {
//         console.error("Error fetching employee details:", error);
//       }
//     };

//     if (id) {
//       fetchEmployee(); 
//     }
//   }, [id]);


//   const calculateAge = (dob) => {
//     if (!dob) return "N/A";
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     if (
//       today.getMonth() < birthDate.getMonth() ||
//       (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };

//   const handleClickEdit = () => {
//     handleEdit(employee);
//     setOpen(true); 
//   };

//   const handleSubmitEdit = async (event) => {
   
//     try {
//       const response = await fetch(`http://localhost:5000/Employees/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const updatedEmployee = await response.json();
//       setEmployee(updatedEmployee);

//       setOpen(false);  
//       // navigate('/Employees')
//     } catch (error) {
//       console.error("Error updating employee:", error);
//     }
//   };

//   if (!employee) return <p>Loading...</p>;  

//   return (
//     <>
//       <div className="users flex">
//         <div className="head_sctn flex justify-between items-center">
//           <div className="heading">
//             <h5>Dashboard / Employees / Employee Details</h5>
//             <h3>Employee Details</h3>
//           </div>
//           <div className="search_bar">
//             <div className="search flex items-center">
//               <i className="fa-solid fa-magnifying-glass"></i>
//               <input className="search_icon" type="search" placeholder="Search" />
//             </div>
//             <div className="search_sub flex items-center">
//               <i className="fa-regular fa-bell"></i>
//               <div className="profile">
//                 <img src={Img2} alt="Profile" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="userProfile h-[76vh] overflow-scroll">
//           <div className="card" style={{ width: "768px" }}>
//             <img src={Img3} className="card-img-top" alt="Background" />
//             <div className="viewer">
//               <div className="viewer_photo">
//                 <img
//                   id="img"
//                   src={employee.avatar || "default-avatar.png"}
//                   alt={`${employee.firstName}'s Avatar`}
//                 />
//               </div>
//               <h4>{`${employee.firstName} ${employee.lastName}`}</h4>
//               <h5 id="email">{employee.email}</h5>
//             </div>
//             <div className="card-body">
//               <div className="row gap-3">
//                 <div className="col">
//                   <h4>Gender</h4>
//                   <h5>{employee.gender}</h5>
//                 </div>
//                 <div className="col">
//                   <h4>Age</h4>
//                   <h5>{calculateAge(employee.dob)}</h5>
//                 </div>
//                 <div className="col">
//                   <h4>Date of Birth</h4>
//                   <h5>{employee.dob || "N/A"}</h5>
//                 </div>
//               </div>
//               <div className="row gap-3">
//                 <div className="col">
//                   <h4>Mobile Number</h4>
//                   <h5>{employee.phone}</h5>
//                 </div>
//                 <div className="col">
//                   <h4>Qualifications</h4>
//                   <h5>{employee.qualifications}</h5>
//                 </div>
//               </div>
//               <div className="row gap-3">
//                 <div className="col">
//                   <h4>Address</h4>
//                   <h5>{employee.address}</h5>
//                 </div>
//                 <div className="col">
//                   <h4>Username</h4>
//                   <h5>{employee.username}</h5>
//                 </div>
//               </div>
//               <div className="button pt-2">
//                 <button className="cancelbtn" onClick={() => handleDeleteEmployee(employee._id)}>
//                   Delete
//                 </button>
//                 <button className="editbtn" onClick={handleClickEdit}>
//                   Edit Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>

//       <Form
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={handleSubmitEdit} 
//         isEditing={true}
//         open={open}
//         handleClose={handleClose}
//         handleImageUpload={handleImageUpload}
//         errors={errors}
//         setErrors={setErrors}
//       />

//       <DeleteForm open={deleteOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
//     </>
//   );
// }

// export default Profile;


// import React, { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import Form from "./Pages/Form";
// import Footer from "./Footer";
// import { EmployeeContext } from "./context";

// function Profile() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { employees, updateEmployee } = useContext(EmployeeContext);
//   const [employee, setEmployee] = useState(null);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     const fetchEmployee = () => {
//       const emp = employees.find((emp) => emp._id === id); // Find employee by ID
//       if (emp) {
//         setEmployee(emp);
//         setFormData(emp);
//       }
//     };

//     if (id) {
//       fetchEmployee(); // Fetch employee from global state on mount
//     }
//   }, [id, employees]);

//   const handleSubmitEdit = async (event) => {
//     try {
//       const response = await fetch(`http://localhost:5000/Employees/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const updatedEmployee = await response.json();
//       setEmployee(updatedEmployee);  // Update local state
//       updateEmployee(updatedEmployee);  // Update global employee list

//       navigate("/employees"); // Navigate to the employees list
//     } catch (error) {
//       console.error("Error updating employee:", error);
//     }
//   };

//   if (!employee) return <p>Loading...</p>;

//   return (
//     <div>
//       <h3>Employee Details</h3>
//       <div>
//         <h4>{`${employee.firstName} ${employee.lastName}`}</h4>
//         <p>Email: {employee.email}</p>
//         <p>Phone: {employee.phone}</p>
//         <button onClick={handleSubmitEdit}>Save Changes</button>
//       </div>
//       <Form formData={formData} setFormData={setFormData} />
//       <Footer />
//     </div>
//   );
// }

// export default Profile;



// import React, { useContext, useEffect } from "react";
// import { EmployeeContext } from "./context";
// import CustomHooks from "../Hooks/CustomHooks";
// import Form from "./Pages/Form";
// import Img2 from "../assets/images/Elipse 5.png";
// import Img3 from "../assets/images/Background Image.png";
// import Footer from "./Footer";
// import DeleteForm from "./Pages/DeleteForm";
// import { useLocation, useNavigate } from "react-router-dom";

// function Profile({ employeeId }) {
//   const {updateEmployee } = CustomHooks();
//   const location = useLocation()
//   const employee = location.state.employee  

//   const navigate = useNavigate()

//   const {
//     open,
//     setOpen,
//     handleEdit,
//     handleDeleteEmployee,
//     formData,
//     setFormData,
//     handleSubmit,
//     handleConfirmDelete,
//     handleCancelDelete,
//     handleClose,
//     handleImageUpload,
//     errors,
//     setErrors,
//     deleteOpen,
//   } = useContext(EmployeeContext);

//   const calculateAge = (dob) => {
//     if (!dob) return "N/A";
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     if (
//       today.getMonth() < birthDate.getMonth() ||
//       (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };

//   const handleClickEdit = () => {
//     handleEdit(employee); 
//     setOpen(true);
 
//   };


//   return (
//     <>
//       <div className="users flex">
//         <div className="head_sctn flex justify-between items-center">
//           <div className="heading">
//             <h5>Dashboard / Employees / Employee Details</h5>
//             <h3>Employee Details</h3>
//           </div>
//           <div className="search_bar">
//             <div className="search flex items-center">
//               <i className="fa-solid fa-magnifying-glass"></i>
//               <input className="search_icon" type="search" placeholder="Search" />
//             </div>
//             <div className="search_sub flex items-center">
//               <i className="fa-regular fa-bell"></i>
//               <div className="profile">
//                 <img src={Img2} alt="Profile" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="userProfile h-[76vh] overflow-scroll">
//           <div className="card" style={{ width: "768px" }}>
//             <img src={Img3} className="card-img-top" alt="Background" />
//             <div className="viewer">
//               <div className="viewer_photo">
//                 <img
//                   id="img"
//                   src={employee.avatar || "default-avatar.png"}
//                   alt={`${employee.firstName}'s Avatar`}
//                 />
//               </div>
//               <h4>{`${employee.firstName} ${employee.lastName}`}</h4>
//               <h5 id="email">{employee.email}</h5>
//             </div>
//             <div className="card-body">
//               <div className="row gap-3">
//                 <div className="col">
//                   <h4>Gender</h4>
//                   <h5>{employee.gender}</h5>
//                 </div>
//                 <div className="col">
//                   <h4>Age</h4>
//                   <h5>{calculateAge(employee.dob)}</h5>
//                 </div>
//                 <div className="col">
//                   <h4>Date of Birth</h4>
//                   <h5>{employee.dob || "N/A"}</h5>
//                 </div>
//               </div>
//               <div className="row gap-3">
//                 <div className="col">
//                   <h4>Mobile Number</h4>
//                   <h5>{employee.phone}</h5>
//                 </div>
//                 <div className="col">
//                   <h4>Qualifications</h4>
//                   <h5>{employee.qualifications}</h5>
//                 </div>
//               </div>
//               <div className="row gap-3">
//                 <div className="col">
//                   <h4>Address</h4>
//                   <h5>{employee.address}</h5>
//                 </div>
//                 <div className="col">
//                   <h4>Username</h4>
//                   <h5>{employee.username}</h5>
//                 </div>
//               </div>
//               <div className="button pt-2">
//                 <button className="cancelbtn" onClick={() => handleDeleteEmployee(employee._id)}>
//                   Delete
//                 </button>
//                 <button
//                   className="editbtn"
//                  onClick={handleClickEdit}
//                 >
//                   Edit Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>

      
//     </>
//   );
// }

// export default Profile;







import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "./context";
import CustomHooks from "../Hooks/CustomHooks";
import Form from "./Pages/Form";
import Img2 from "../assets/images/Elipse 5.png";
import Img3 from "../assets/images/Background Image.png";
import Footer from "./Footer";
import DeleteForm from "./Pages/DeleteForm";
import Header from "./Header"
import img4 from '../assets/images/1053244.png'

function Profile({ employeeId }) {
  const { getEmployee, loading, error, employees } = CustomHooks();
  
  const {
    open,
    setOpen,
    handleEdit,
    handleDeleteEmployee,
    formData,
    setFormData,
    handleSubmit,
    handleConfirmDelete,
    handleCancelDelete,
    handleClose,
    handleImageUpload,
    errors,
    setErrors,
    deleteOpen,
  } = useContext(EmployeeContext);


  useEffect(() => {
    if (employeeId) {
      getEmployee(employeeId); 
    }
  }, [employeeId,open]);




  


  const employee = Array.isArray(employees) ? employees[0] : employees; 

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  if (!employee) return <p>No employee found</p>;

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };



  const handleClickEdit = () => {
    handleEdit(employee);
    setOpen(true);
  };

 
  

  return (
    <>
      <div className="users flex">
      
<Header/>
        <div className="userProfile h-[76vh] overflow-scroll">
          <div className="card" style={{ width: "768px" }}>
            <img src={Img3} className="card-img-top" alt="Background" />
            <div className="viewer">
              <div className="viewer_photo">
                <img
                  id="img"
                  src={employee.avatar || img4}
                 
                />
              </div>
              <h4>{employee.firstName} {employee.lastName}</h4>
              <h5 id="email">{employee.email}</h5>
            </div>
            <div className="card-body">
              <div className="row gap-3">
                <div className="col">
                  <h4>Gender</h4>
                  <h5>{employee.gender}</h5>
                </div>
                <div className="col">
                  <h4>Age</h4>
                  <h5>{calculateAge(employee.dob)}</h5>
                </div>
                <div className="col">
                  <h4>Date of Birth</h4>
                  <h5>{employee.dob || "N/A"}</h5>
                </div>
              </div>
              <div className="row gap-3">
                <div className="col">
                  <h4>Mobile Number</h4>
                  <h5>{employee.phone}</h5>
                </div>
                <div className="col">
                  <h4>Qualifications</h4>
                  <h5>{employee.qualifications}</h5>
                </div>
              </div>
              <div className="row gap-3">
                <div className="col">
                  <h4>Address</h4>
                  <h5>{employee.address}</h5>
                </div>
                <div className="col">
                  <h4>Username</h4>
                  <h5>{employee.username}</h5>
                </div>
              </div>
              <div className="button pt-2">
                <button className="cancelbtn" onClick={() => handleDeleteEmployee(employee._id)}>
                  Delete
                </button>
                <button
                  className="editbtn"
                 onClick={handleClickEdit}
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <Form
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEditing={true}
        open={open}
        handleClose={handleClose}
        handleImageUpload={handleImageUpload}
        errors={errors}
        setErrors={setErrors}
      />

      <DeleteForm open={deleteOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
    </>
  );
}

export default Profile;