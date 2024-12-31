import React from 'react'
import { CiSearch } from "react-icons/ci";
import Img2 from "../assets/images/Elipse 5.png"
function Header() {
  return (
    <div className="head_sctn flex justify-between items-center">
                     <div className="heading">
                        <h5>Dashboard / Employees</h5>
                        <h3>Employees</h3>
                    </div>
                    <div className="search_bar">
                        <div className="search flex items-center ">
                             <CiSearch/>
                           
                            <input className="search_icon" type="search" placeholder="search"    />
                        </div>
                        <div className="search_sub flex items-center">
                            <i className="fa-regular fa-bell"></i>
                            <div className="profile">
                              
                                <img src={Img2} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default Header