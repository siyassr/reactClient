import React, { createContext, useState, useEffect,useRef } from "react";
import axios from "axios";
import CustomHooks from "../Hooks/CustomHooks"
// import { useNavigate } from 'react-router-dom';


export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  //  const navigate = useNavigate();

  const [open, setOpen] = useState(false); 
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    qualifications: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    avatar:"",
  });

  const [uploadedImage, setUploadedImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({}); 
  const [avatar, setAvatar] = useState('');

  const { employees, getEmployees, createEmployee, updateEmployee,deleteEmployee } = CustomHooks();

  useEffect(() => {
    getEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName} ${employee.email} ${employee.phone} ${employee.username}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const currentemployee = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`w-12 h-12 rounded-full text-sm ${
            i === currentPage ? "bg-[#545350] text-white" : "bg-[#545350]"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };




  const handleEdit = (employee) => {
    setIsEditing(true);
    setEditingId(employee._id); 
    setFormData(employee);
    setOpen(true); 
  };


  const handleAddEmployee = () => {
    setIsEditing(false);
    setFormData({
      salutation: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      address: "",
      qualifications: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      avatar:"",
    });
    setOpen(true); 
  };

  const handleSubmit = async () => {
    if (isEditing) {
      await updateEmployee(editingId, formData); 
    } else {
      await createEmployee(formData);
    }
    setOpen(false);
     
  };


  
  

  const handleDeleteEmployee = (id) => {
    setDeleteEmployeeId(id); 
    setDeleteOpen(true);
    
    
  };

  const handleConfirmDelete = async () => {
    if (deleteEmployeeId) {
      await deleteEmployee(deleteEmployeeId); 
      setDeleteOpen(false); 

      const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages); 
    } else if (currentPage === 1 && totalPages === 0) {
      setCurrentPage(1); 
    }
    }
    
  };

  const handleCancelDelete = () => {
    setDeleteOpen(false); 
  };

  const imgRef = useRef(null);
   const handleImageUpload = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const fileType = file.type.split('/')[1];
      
      if (fileType === 'jpeg' || fileType === 'png') {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prevData) => ({ ...prevData, avatar: reader.result }));
          
        
          if (imgRef.current) {
            imgRef.current.src = reader.result; 
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a valid image (JPG or PNG).');
      }
    }
  };


  // const handleImageUpload = async (event) => {
  //   const file = event.target.files[0];
    
  //   if (file) {
    
  //     const allowedTypes = /jpeg|jpg|png/;
  //     const fileType = file.type.split('/')[1];
  
  //     if (allowedTypes.test(fileType)) {
  //       const formData = new FormData();
  //       formData.append('avatar', file);
  
  //       try {
  //         const response = await axios.post('http://localhost:5000/upload-avatar', formData, {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         });
  
 
  //         const { file: uploadedFile } = response.data;
  
   
  //         const imageUrl = `http://localhost:5000/${uploadedFile.path}`;
  
       
  //         setAvatar(imageUrl);
  
  //         if (imgRef.current) {
  //           imgRef.current.src = imageUrl;
  //         }
  //       } catch (error) {
  //         console.error('Error uploading image:', error);
  //         alert('Error uploading image, please try again.');
  //       }
  //     } else {
      
  //       alert('Please upload a valid image (JPG, JPEG, or PNG).');
  //     }
  //   }
  // };
  

  

const handleClose = () =>{
  setOpen(false)
  setErrors('')
}
  
 
  return (
    <EmployeeContext.Provider
      value={{
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
        handleCancelDelete,
        errors,
        setErrors,
        handleImageUpload,
        uploadedImage,
        setUploadedImage,
        handleClose,
        avatar,
        imgRef



      }}
    >
      {children} 
    </EmployeeContext.Provider>
  );
};
