import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import ProtectedRoute from './ProtectRoute';
import Dashboard from "../components/Dashboard" 
import UserProfile from '../components/UserProfile';


function OutputRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accesstoken"))
      ?.split("=")[1];
    console.log("Initial accessToken:", token);
    return Boolean(token);
  });

  const handleLoginSuccess = (token) => {
    document.cookie = `accesstoken=${token}; path=/;;` 
    console.log("Login successful, token set:", token);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login handleLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default OutputRoutes;
