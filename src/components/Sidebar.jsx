import React from 'react'
import Img1 from "../assets/images/image 1.png"
import apiClient from './Api';
import {logout} from "../Redux/UserSlice"
import { useDispatch } from 'react-redux';

function Sidebar() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
     
      await apiClient.logout();
      dispatch(logout());
      
     

      // localStorage.removeItem('userData');
      // window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="header_menu">
    <div className="side_menu p-4">
           <h3><span>Employee </span>Management</h3>
       </div>
       <ul className="m-0">
           <li className="py-3 px-3 "><a href="#"><i className="fa-solid fa-house"></i>Dashboard</a></li>
           <li className="py-3 px-3"><a href="#"><i className="fa-solid fa-chart-simple"></i>Employees</a></li>
           <li className="py-3 px-3"><a href="#"><i className="fa-solid fa-user"></i>My Profile</a></li>
           <li   onClick={handleLogout}  className="py-3 px-3"><a href="#"><i className="fa-solid fa-lock"></i>Logout</a></li>
       </ul>
       <div className="footer items-center gap-3">
           <h5>Powered by</h5>
           <span><img src={Img1} alt="" /></span>
       </div>
   </div>
  )
}

export default Sidebar