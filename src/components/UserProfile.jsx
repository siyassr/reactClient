import React, { useContext } from 'react'
import Sidebar from './Sidebar'
import Profile from './Profile'
import { Navigate, useParams } from 'react-router-dom'
import { EmployeeContext } from './context';
import Form from "./Pages/Form"
import DeleteForm from "./Pages/DeleteForm"

function UserProfile() {
  const { id } = useParams();

  const {
      open,
      setOpen,
      handleEdit,
      formData,
      handleClose,
      errors,
      setErrors,
      setFormData,
      handleSubmit,
      handleDeleteEmployee,  
      setDeleteOpen,
      deleteOpen,
      setDeleteEmployeeId,
      handleConfirmDelete,
      handleImageUpload,
      uploadedImage,
      isEditing,
      handleCancelDelete,
      
    } = useContext(EmployeeContext); 
   

    const isValidId = /^[a-f\d]{24}$/i.test(id);
    console.log(isValidId,"isValidId");

  if (!id || !isValidId) {
    return <Navigate to="/not-found" />;
  }

  
  
  return (
    <>
    <div className='containers grid grid-cols-[1fr_5fr] h-screen'>
        <Sidebar/>
        
        <Profile employeeId={id} open={open} setOpen={setOpen} handleEdit={handleEdit} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleDeleteEmployee={handleDeleteEmployee} setDeleteOpen={setDeleteOpen} deleteOpen={deleteOpen}  setDeleteEmployeeId={setDeleteEmployeeId} handleConfirmDelete={handleConfirmDelete} handleImageUpload={handleImageUpload} uploadedImage={uploadedImage} isEditing={isEditing} handleCancelDelete={handleCancelDelete}/>
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
    
  )
}

export default UserProfile