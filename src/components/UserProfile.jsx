import React from 'react'
import Sidebar from './Sidebar'
import Profile from './Profile'
import { useParams } from 'react-router-dom'

function UserProfile() {
  const { id } = useParams();
  return (
    <div className='containers grid grid-cols-[1fr_5fr] h-screen'>
        <Sidebar/>
        
        <Profile employeeId={id} />
    </div>
  )
}

export default UserProfile