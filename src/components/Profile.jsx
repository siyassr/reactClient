

import React, { useContext, useEffect } from "react";
import { EmployeeContext } from "./context";
import CustomHooks from "../Hooks/CustomHooks";
import Form from "./Pages/Form";
import Img2 from "../assets/images/Elipse 5.png";
import Img3 from "../assets/images/Background Image.png";
import Footer from "./Footer";
import DeleteForm from "./Pages/DeleteForm";

function Profile({ employeeId }) {
  const { employees, getEmployee, loading, error } = CustomHooks();
  const {
    open,
    setOpen,
    handleEdit,
    formData,
    setFormData,
    handleSubmit,
    handleDeleteEmployee,
    setDeleteOpen,
    deleteOpen,
    setDeleteEmployeeId,
    handleConfirmDelete,
    isEditing,
    handleCancelDelete,
    handleClose,
    handleImageUpload,
    setErrors,
    errors,
    uploadedImage,
  } = useContext(EmployeeContext);

  const calculateAge = (dob) => {
    if (!dob) return "N/A";

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    if (employeeId) {
      getEmployee(employeeId);
    }
  }, [employeeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!employees) return <p>Employee not found</p>; 

  const handleEditClick = () => {
    handleEdit(employees);
  };

  const handleDeleteClick = () => {
    handleDeleteEmployee(employees._id);
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
            <div className="search flex items-center ">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input className="search_icon" type="search" placeholder="search" />
            </div>
            <div className="search_sub flex items-center">
              <i className="fa-regular fa-bell"></i>
              <div className="profile">
                <img src={Img2} alt="" />
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
                  src={employees?.avatar || "default-avatar.png"}
                  alt={`${employees?.firstName || "Employee"}'s avatar`}
                />
              </div>
              <h4>{employees?.firstName} {employees?.lastName}</h4>
              <h5 id="email">{employees?.email}</h5>
            </div>
            <div className="card-body">
              <div className="row gap-3">
                <div className="col">
                  <h4>Gender</h4>
                  <h5>{employees?.gender}</h5>
                </div>
                <div className="col">
                  <h4>Age</h4>
                  <h5>{calculateAge(employees?.dob)}</h5>
                </div>
                <div className="col">
                  <h4>Date of Birth</h4>
                  <h5>{employees?.dob}</h5>
                </div>
              </div>
              <div className="row gap-3">
                <div className="col">
                  <h4>Mobile Number</h4>
                  <h5 id="Phone">{employees?.phone}</h5>
                </div>
                <div className="col">
                  <h4>Qualifications</h4>
                  <h5 id="qualification">{employees?.qualifications}</h5>
                </div>
              </div>
              <div className="row gap-3">
                <div className="col">
                  <h4>Address</h4>
                  <h5 id="address">{employees?.address}</h5>
                </div>
                <div className="col">
                  <h4>Username</h4>
                  <h5 id="userName">{employees?.username}</h5>
                </div>
              </div>
              <div className="button pt-2">
                <button className="cancelbtn" onClick={handleDeleteClick}>Delete</button>
                <button className="editbtn" onClick={handleEditClick}>Edit Details</button>
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
        isEditing={isEditing}
        open={open}
        handleClose={handleClose}
        handleImageUpload={handleImageUpload}
        uploadedImage={uploadedImage}
        errors={errors}
        setErrors={setErrors}
      />
      <DeleteForm
        open={deleteOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}

export default Profile;


