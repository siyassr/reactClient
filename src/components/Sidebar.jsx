import React from 'react'
import Img1 from "../assets/images/image 1.png"
import apiClient from './Api';
import {logout} from "../Redux/UserSlice"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
     
      await apiClient.logout();
      dispatch(logout());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigate = ()=>{
    navigate("/Employees")
  }
  const handleProfile = ()=>{
    navigate("/Myprofile")
  }

  return (
    <div className="header_menu">
    <div className="side_menu p-4">
           <h3><span>Employee </span>Management</h3>
       </div>
       <ul className="m-0">
        
           <li className="py-3 px-3" onClick={handleNavigate}><a href="#"><i className="fa-solid fa-chart-simple"></i>Employee</a></li>
           <li className="py-3 px-3" onClick={handleProfile}><a href="#"><i className="fa-solid fa-user"></i>My Profile</a></li>
           <li onClick={handleLogout} className="py-3 px-3"><a href="#"><i className="fa-solid fa-lock"></i>Logout</a></li>
       </ul>
       <div className="footer items-center gap-3">
           <h5>Powered by</h5>
           <span><img src={Img1} alt="" /></span>
       </div>
   </div>
  )
}

export default Sidebar