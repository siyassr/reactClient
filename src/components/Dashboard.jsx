import React from 'react'
import Sidebar from './Sidebar'
import { useLocation } from 'react-router-dom'
import UserDashboard from './UserDashboard'
import Profile from "./Profile"
import "../App.css"

function Slidebar() {
  const location = useLocation()
  return (
    <div className='containers grid grid-cols-[1fr_5fr] h-screen'>
        <Sidebar/>
        
      <UserDashboard /> 
    </div>
  )
}

export default Slidebar