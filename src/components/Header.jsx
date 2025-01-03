import React, { useContext } from 'react'
import { CiSearch } from "react-icons/ci";
import Img2 from "../assets/images/Elipse 5.png"
import { useLocation } from 'react-router-dom';
import { EmployeeContext } from './context';
function Header() {

  const location = useLocation();
    const  {searchQuery,setSearchQuery,} = useContext(EmployeeContext)
       
  return (
    <div className="head_sctn flex justify-between items-center">
                     <div className="heading">
                        <h5>Dashboard / Employees</h5>
                        <h3>Employees</h3>
                    </div>
                    {location.pathname === '/Employees' && ( 
        <div className="search_bar">
          <div className="search flex items-center ">
            <CiSearch />
            <input
              className="search_icon"
              type="search"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="search_sub flex items-center">
            <i className="fa-regular fa-bell"></i>
            <div className="profile">
              <img src={Img2} alt="" />
            </div>
          </div>
        </div>
      )}
                </div>
  )
}

export default Header