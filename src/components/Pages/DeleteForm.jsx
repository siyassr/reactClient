import React, { useContext } from 'react'
import { Modal, Box } from '@mui/material';
import { EmployeeContext } from '../context';
import { useNavigate } from 'react-router-dom';


function DeleteForm({open, onConfirm, onCancel}) {
  const navigate = useNavigate()
 const {handleConfirmDelete} = useContext(EmployeeContext)

 const navidateion = async()=>{
  await handleConfirmDelete(); 
  navigate('/Employees'); 
 }
  
  return (
    <Modal open={open} onClose={onCancel}>

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
            width:"40%"
          }}
        >
            <div className="delete_details" >
    <div className="delete_form flex justify-between">
        <h5>Delete Employee</h5>
        
    </div>
    <h6>Are you sure you want to delete this employee?</h6>
    <div className="bottom flex">
        <div className="button flex">
        <button className="unfilled" onClick={onCancel}>Cancel</button>
        <button className="filled_btn" onClick={navidateion}>Delete</button>
        </div>
    </div>
</div>

        </Box>
    </Modal>
  )
}

export default DeleteForm