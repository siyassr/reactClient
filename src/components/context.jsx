import React, { createContext, useState, useEffect,useRef } from "react";
import axios from "axios";
import CustomHooks from "../Hooks/CustomHooks"
import { useNavigate } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';


export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {


  const [open, setOpen] = useState(false); 
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({}); 
  const [avatar, setAvatar] = useState('');



  const {employees, getEmployees, createEmployee, updateEmployee,deleteEmployee,setEmployees } = CustomHooks();
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


 
  

 

  useEffect(() => {
    getEmployees()
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

  
  const validateForm = () => {
    const newErrors = {};

    if (!formData.salutation) newErrors.salutation = 'Salutation is required';
    if (!(formData.firstName || '').trim()) newErrors.firstName = 'First name is required';
    if (!(formData.lastName || '').trim()) newErrors.lastName = 'Last name is required';
    if (!(formData.username || '').trim()) newErrors.username = 'User name is required';
    if (!(formData.password || '').trim()) newErrors.password = 'Password is required';
    if (!(formData.email || '').trim()) newErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!(formData.phone || '').trim()) newErrors.phone = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid mobile number';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!(formData.qualifications || '').trim()) newErrors.qualifications = 'Qualifications are required';
    if (!(formData.address || '').trim()) newErrors.address = 'Address is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!(formData.city || '').trim()) newErrors.city = 'City is required';
    if (!(formData.pincode || '').trim()) newErrors.pincode = 'Pin/Zip is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
  //   if (formData.avatar) {
  //     const file = formData.avatar;
  //     const validTypes = ['image/jpeg', 'image/jpg'];
  //     if (!validTypes.includes(file.type)) {
  //         newErrors.avatar = 'image must be a JPG or JPEG image';
  //     }
  // } else {
  //     newErrors.avatar = 'image is required';
  // }
  // if (!formData.avatar) newErrors.avatar = 'image is required';

        if (formData.avatar) {
      const file = formData.avatar;
      const validTypes = ['image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
          newErrors.avatar = 'image must be a JPG or JPEG image';
      }
  } else {
      newErrors.avatar = 'image is required';
  }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    const isValid = validateForm();
    console.log(isValid,"isValid");
    if (!isValid) {
        console.error("Form validation failed");
        return;
    }

    try {
        if (isEditing) {
            await updateEmployee(editingId, formData);

            const updatedEmployees = employees.map((emp) =>
                emp._id === editingId ? { ...emp, ...formData } : emp
            );
            setEmployees(updatedEmployees); 

            console.log("Employee updated successfully");
        } else {
            await createEmployee(formData);
            console.log("Employee created successfully");
        }
        setOpen(false); 
    } catch (error) {
        console.error("Error while submitting the form:", error);
    }
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
  //  const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  
  //   if (file) {
  //     const fileType = file.type.split('/')[1];
      
  //     if (fileType === 'jpeg' || fileType === 'png') {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setFormData((prevData) => ({ ...prevData, avatar: reader.result }));
          
        
  //         if (imgRef.current) {
  //           imgRef.current.src = reader.result; 
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       alert('Please upload a valid image (JPG or PNG).');
  //     }
  //   }
  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const maxSize = 2 * 1024 * 1024; 
        const newErrors = {};

       
        if (!validTypes.includes(file.type)) {
            newErrors.avatar = 'Please upload a valid image (JPG or PNG).';
        }

       
        if (file.size > maxSize) {
            newErrors.avatar = 'File size should not exceed 2MB.';
        }

        if (Object.keys(newErrors).length === 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prevData) => ({ ...prevData, avatar: reader.result }));
                if (imgRef.current) {
                    imgRef.current.src = reader.result; 
                }
            };
            reader.readAsDataURL(file);
            setErrors((prevErrors) => ({ ...prevErrors, avatar: undefined })); 
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
        }
    } else {
        setErrors((prevErrors) => ({ ...prevErrors, avatar: 'Image is required.' }));
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
        imgRef,

      



      }}
    >
      {children} 
    </EmployeeContext.Provider>
  );
};
