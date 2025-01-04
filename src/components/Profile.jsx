
import React, { useContext, useEffect } from "react";
import { EmployeeContext } from "./context";
import CustomHooks from "../Hooks/CustomHooks";
import Form from "./Pages/Form";
import Img2 from "../assets/images/Elipse 5.png";
import Img3 from "../assets/images/Background Image.png";
import Footer from "./Footer";
import DeleteForm from "./Pages/DeleteForm";

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
  }, [employeeId]);

  const employee = Array.isArray(employees) ? employees[0] : employees; 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
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
        <div className="head_sctn flex justify-between items-center">
          <div className="heading">
            <h5>Dashboard / Employees / Employee Details</h5>
            <h3>Employee Details</h3>
          </div>
          <div className="search_bar">
            <div className="search flex items-center">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input className="search_icon" type="search" placeholder="Search" />
            </div>
            <div className="search_sub flex items-center">
              <i className="fa-regular fa-bell"></i>
              <div className="profile">
                <img src={Img2} alt="Profile" />
              </div>
            </div>
          </div>
        </div>

        <div className="userProfile h-[76vh] overflow-scroll">
          <div className="card" style={{ width: "768px" }}>
            <img src={Img3} className="card-img-top" alt="Background" />
            <div className="viewer">
              <div className="viewer_photo">
                <img
                  id="img"
                  src={employee.avatar || "default-avatar.png"}
                  alt={`${employee.firstName}'s Avatar`}
                />
              </div>
              <h4>{`${employee.firstName} ${employee.lastName}`}</h4>
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



