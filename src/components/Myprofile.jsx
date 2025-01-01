import React from 'react'
import Sidebar from './Sidebar'
import ViewProfile from "../components/ViewProfile"


function Myprofile() {
    return (
        <div className='containers grid grid-cols-[1fr_5fr] h-screen'>
            <Sidebar/>
            
            <ViewProfile  />
        </div>
    )
}

export default Myprofile