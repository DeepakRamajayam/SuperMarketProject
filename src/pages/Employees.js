import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import './Employees.css';
import axios from 'axios';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ name: '', email: '', address: '', position: '' });
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get auth state

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/employees/');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleAddEmployee = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/employees/', newEmployee, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 201) { // 201 Created indicates successful addition
                fetchEmployees(); // Refresh employee list
                setNewEmployee({ name: '', email: '', address: '', position: '' }); // Reset form
                setShowForm(false); // Hide form after adding employee
            } else {
                console.error('Error adding employee');
            }
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };
    

    const handleRemoveEmployee = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/employees/${id}/`);

            if (response.status === 204) { // 204 No Content indicates successful deletion
                fetchEmployees(); // Refresh employee list
            } else {
                console.error('Error removing employee');
            }
        } catch (error) {
            console.error('Error removing employee:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const getSalary = (position) => {
        switch (position) {
            case 'Manager':
                return '$80,000';
            case 'Assit. Store Manager':
                return '$70,000';
            case 'Customer Service Represent.':
                return '$60,000';
            case 'CASHIER':
                return '$50,000';
            default:
                return '$0';
        }
    };

    return (
        <div className="employees-page">
            <div className="employee-list">
                <h2>Employees Info</h2>
                {isAuthenticated && (
                    <>
                        <button className="toggle-form-button" onClick={toggleFormVisibility}>
                            {showForm ? 'Cancel' : 'Add Employee'}
                        </button>
                        {showForm && (
                            <div className="add-employee">
                                <h3>Add Employee</h3>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={newEmployee.name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={newEmployee.email}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={newEmployee.address}
                                    onChange={handleInputChange}
                                />
                                <select
                                    name="position"
                                    value={newEmployee.position}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Position</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Designer">Designer</option>
                                    <option value="QA">QA</option>
                                </select>
                                <button onClick={handleAddEmployee}>Add Employee</button>
                            </div>
                        )}
                    </>
                )}
                <ul className="employee-list-items">
                    {employees.map((employee) => (
                        <li key={employee.id}>
                            <div className="employee-details">
                                <p><strong>Name: </strong>{employee.name}</p>
                                <p><strong>Email: </strong>{employee.email}</p>
                                <p><strong>Address: </strong>{employee.address}</p>
                                <p><strong>Position: </strong>{employee.position}</p>
                                <p><strong>Salary: </strong>{getSalary(employee.position)}</p>
                            </div>
                            <button
                                className="remove-button"
                                onClick={() => handleRemoveEmployee(employee.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Employees;
