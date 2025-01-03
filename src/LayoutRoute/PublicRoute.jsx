import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function getCookie(name) {
  const value = document.cookie;
  const parts = value.split(`${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const accesstoken = getCookie("accesstoken");

  useEffect(() => {
    const verifyToken = async () => {
      if (accesstoken) {
        try {
          const response = await fetch("http://localhost:5000/verify-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: accesstoken }),
          });

          if (response.ok) {
            const data = await response.json();
            setIsAuthenticated(data.valid);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [accesstoken]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  if (isAuthenticated) {
    return <Navigate to="/Employees" />;
  }

  return children;
};

export default PublicRoute;
