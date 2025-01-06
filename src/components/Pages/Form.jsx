
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Box, Button, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EmployeeContext } from "../context";
import CustomHooks from "../../Hooks/CustomHooks";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import img4 from "../../assets/images/1053244.png"

function Form({ formData={}, setFormData, onSubmit, isEditing ,open,handleClose,handleImageUpload,errors,setErrors, uploadedImage ,avatar,imgRef,
  setUploadedImage}) {

  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


  return (
    <Modal  open={open} onClose={handleClose}>
       <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 1,
          padding: '20px',
          width:"50%",
          maxHeight: '95vh',
          overflowY: 'auto',
        }}
      >
        <div className="header">
        <h2>{isEditing ? "Edit Employee" : "Add New Employee"}</h2>
          <div className="cross_icon">
           
          </div>
        </div>
      
       
        {isEditing ? (
        <div >
          <div className="flex items-center gap-3">
            <div className="employee_photo align-items-center">
            
            <img
          ref={imgRef}
          src={formData.avatar || img4} 
          alt="Profile Avatar"
        />
          
            </div>
            <label className="change" htmlFor="editUpload">
              Change
            </label>
            <input
              type="file"
              id="editUpload"
              name="photo"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      ) : (
        <>
 {!formData.avatar ? (
      <div className="upload_img_sec" id="uploadImg">
        <label className="upload_sec flex flex-col items-center p-4">
          <FaUpload/>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUpload}
            style={{display:"none"}}

          />
          <h4>Upload Image</h4>
          <h6>PNG, JPG files are allowed</h6>
        </label>
        {/* {errors.avatar && <span className="text-danger">{errors.avatar}</span>} */}
      </div>
    ) : (
      <div className="display">
        <div className="flex items-center gap-3">
          <div className="employee_photo align-items-center">
            <img
              ref={imgRef}
              src={formData.avatar || img4} 
         
            />
          </div>
          <label className="change" htmlFor="editUpload">
            Change
          </label>
          <input
            type="file"
            id="editUpload"
            name="photo"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    )}
       </>
      )}


        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 pt-4">
            <label className="form_labels">Salutation</label>
            <select
              className={`form-select p-2 px-3 ${errors.salutation ? 'border-danger' : ''}`}
              name="salutation"
              value={formData.salutation}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Dr">Dr</option>
            </select>
            {errors.salutation && <span className="text-danger">{errors.salutation}</span>}
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 pt-4">
            <label className="form_labels">First Name</label>
            <input
              placeholder="John"
              type="text"
              className={`form-control p-2 px-3 ${errors.firstName ? 'border-danger' : ''}`}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 pt-4">
            <label className="form_labels">Last Name</label>
            <input
              placeholder="Doe"
              type="text"
              className={`form-control p-2 px-3 ${errors.lastName ? 'border-danger' : ''}`}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 pt-4">
            <label className="form_labels">User Name</label>
            <input
              placeholder="username"
              type="text"
              className={`form-control p-2 px-3 ${errors.username ? 'border-danger' : ''}`}
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span className="text-danger">{errors.username}</span>}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 pt-4">
            <label className="form_labels">Password</label>
            <input
              placeholder="password"
              type="password"
              className={`form-control p-2 px-3 ${errors.password ? 'border-danger' : ''}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 pt-4">
            <label className="form_labels">Email Address</label>
            <input
              placeholder="mail@example.com"
              type="email"
              className={`form-control p-2 px-3 ${errors.email ? 'border-danger' : ''}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 pt-4">
            <label className="form_labels">Mobile Number</label>
            <input
              placeholder="enter mobile number"
              type="number"
              className={`form-control p-2 px-3 ${errors.phone ? 'border-danger' : ''}`}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="text-danger">{errors.phone}</span>}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 pt-4">
            <label className="form_labels">Date of Birth</label>
            <input
              type="date"
              className={`form-control p-2 px-3 ${errors.dob ? 'border-danger' : ''}`}
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <span className="text-danger">{errors.dob}</span>}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 pt-4">
            <label className="form_labels">Gender</label>
            <div className="d-flex column-gap-2">
              <div className="form-check flex items-center mt-2 column-gap-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                />
                <label className="form-check-label">Male</label>
              </div>

              <div className="form-check flex items-center mt-2 column-gap-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>
            {/* {errors.gender && <span className="text-danger">{errors.gender}</span>} */}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 pt-4">
            <label className="form_labels">Qualifications</label>
            <input
              placeholder="enter qualifications"
              type="text"
              className={`form-control p-2 px-3 ${errors.qualifications ? 'border-danger' : ''}`}
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
            />
            {errors.qualifications && <span className="text-danger">{errors.qualifications}</span>}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 pt-4">
            <label className="form_labels">Address</label>
            <input
              placeholder="enter address"
              type="text"
              className={`form-control p-2 px-3 ${errors.address ? 'border-danger' : ''}`}
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <span className="text-danger">{errors.address}</span>}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 pt-4">
            <label className="form_labels">Country</label>
            <select
              className={`form-control p-2 px-3 ${errors.country ? 'border-danger' : ''}`}
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="India">India</option>
              <option value="Germany">Germany</option>
              <option value="Pakistan">Pakistan</option>
              <option value="England">England</option>
            </select>
            {errors.country && <span className="text-danger">{errors.country}</span>}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 pt-4">
            <label className="form_labels">State</label>
            <select
              className={`form-control p-2 px-3 ${errors.state ? 'border-danger' : ''}`}
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Kerala">Kerala</option>
              <option value="Tamilnadu">Tamilnadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="UttarPradesh">Uttar Pradesh</option>
            </select>
            {errors.state && <span className="text-danger">{errors.state}</span>}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 pt-4">
            <label className="form_labels">City</label>
            <input
              placeholder="enter city"
              type="text"
              className={`form-control p-2 px-3 ${errors.city ? 'border-danger' : ''}`}
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <span className="text-danger">{errors.city}</span>}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 pt-4">
            <label className="form_labels">Pin/Zip</label>
            <input
              placeholder="enter zip/pin"
              type="text"
              className={`form-control p-2 px-3 ${errors.pincode ? 'border-danger' : ''}`}
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
            {errors.pincode && <span className="text-danger">{errors.pincode}</span>}
          </div>
        </div>

        <div className="row">
          <div className="bottom col-lg-12 col-md-12 bg-white p-4">
            <div className="button flex gap-2">
              
                
            <button className='filled_btn'type="button" onClick={onSubmit}>
            {isEditing ? "Update Employee" : "Add Employee"}
            </button>

                <button className="filled_btn" id="saveBtn" onClick={handleClose}>cancel</button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default Form;

