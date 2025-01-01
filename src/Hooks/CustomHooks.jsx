


import { useState } from "react";
import axios from "axios";

const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    console.log(employees,"employees");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:5000/Employees");
            setEmployees(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch employees");
        } finally {
            setLoading(false);
        }
    };

 
    const createEmployee = async (employeeData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:5000/Employees", employeeData);
            setEmployees((prev) => [...prev, response.data["Added employess"]]);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create employee");
        } finally {
            setLoading(false);
        }
    };


    const updateEmployee = async (id, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`http://localhost:5000/Employees/${id}`, updatedData);
            setEmployees((prev) =>
                prev.map((emp) => (emp._id === id ? response.data : emp))
            );
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update employee");
        } finally {
            setLoading(false);
        }
    };
    const deleteEmployee = async (id) => {
      setLoading(true);
      setError(null);
      try {
          await axios.delete(`http://localhost:5000/Employees/${id}`);
          setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      } catch (err) {
          setError(err.response?.data?.message || "Failed to delete employee");
      } finally {
          setLoading(false);
      }
  };
  const getEmployee = async (id) => {
    setLoading(true);
    setError(null);
    try {
        const response = await axios.get(`http://localhost:5000/profile/${id}`);
        setEmployees(response.data);  
    } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch employee");
    } finally {
        setLoading(false);
    }
};

  return {
      employees,
      loading,
      error,
      getEmployees,
      createEmployee,
      updateEmployee,
      deleteEmployee, 
      getEmployee
  };
};

export default useEmployees;
