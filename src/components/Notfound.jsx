import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate()

  const handleReturn = ()=>{
    navigate("/Employees")
  }
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={handleReturn}>go back</button>
    </div>
  );
};

export default NotFound;
